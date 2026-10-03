const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

const TOKEN_KEY = "doaide_contracts_token";

const fallbackStore = new Map();

function readStored(key) {
  if (fallbackStore.has(key)) return fallbackStore.get(key);
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key, value) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
    fallbackStore.delete(key);
  } catch {
    fallbackStore.set(key, value);
  }
}

export function getToken() {
  return readStored(TOKEN_KEY);
}

export function setToken(token) {
  writeStored(TOKEN_KEY, token || null);
}

const unauthorizedListeners = new Set();

export function onUnauthorized(listener) {
  unauthorizedListeners.add(listener);
  return () => unauthorizedListeners.delete(listener);
}

function tokenRejected() {
  setToken(null);
  for (const listener of unauthorizedListeners) {
    try { listener(); } catch { /* subscriber must not break caller */ }
  }
}

async function request(path, { method = "GET", body, form, auth = true, signal } = {}) {
  const headers = {};
  const token = getToken();
  if (auth && token) headers["Authorization"] = `Bearer ${token}`;

  let payload;
  if (form) {
    payload = form;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    payload = JSON.stringify(body);
  }

  const res = await send(`${BASE}${path}`, { method, headers, body: payload, signal });

  if (res.status === 401 && auth && token) tokenRejected();
  if (res.status === 204) return null;

  const text = await res.text();
  const { data, readable } = readBody(text);

  if (!res.ok) {
    throw refusal(readable ? errorMessage(data, statusMessage(res)) : statusMessage(res), res);
  }
  if (!readable) throw new Error(`The server sent a response this app could not read (${res.status}).`);
  return data;
}

function refusal(message, res) {
  const err = new Error(message);
  err.status = res.status;
  return err;
}

function readBody(text) {
  if (!text) return { data: null, readable: true };
  try {
    return { data: JSON.parse(text), readable: true };
  } catch {
    return { data: null, readable: false };
  }
}

function statusMessage(res) {
  if (res.status >= 500) return `The server is having trouble (${res.status}). Please try again in a moment.`;
  if (res.status === 429) return `Too many requests (${res.status}). Please wait a moment and try again.`;
  if (res.status === 401) return `Your session has expired (${res.status}). Please sign in again.`;
  if (res.status === 403) return `You do not have access to this (${res.status}).`;
  if (res.status === 413) return `That file is too large to upload (${res.status}). Try a smaller one.`;
  if (res.status === 404) return `That is not here (${res.status}). It may have been deleted.`;
  return `Request failed (${res.status}).`;
}

async function send(input, init) {
  try {
    return await fetch(input, init);
  } catch (err) {
    if (isAbortError(err)) throw err;
    const offline = typeof navigator !== "undefined" && navigator.onLine === false;
    const failure = new Error(
      offline
        ? "You appear to be offline. Reconnect and try again."
        : "Could not reach the server. Check your connection, or try again in a moment.",
    );
    failure.cause = err;
    throw failure;
  }
}

export function isAbortError(err) {
  return err?.name === "AbortError";
}

export function errorMessage(data, fallback = "Request failed") {
  const detail = data?.detail ?? fallback;
  return flatten(detail).trim() || fallback;
}

function flatten(detail) {
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((d) => d.msg ?? JSON.stringify(d)).join(", ");
  if (detail && typeof detail === "object") return detail.message ?? JSON.stringify(detail);
  return String(detail);
}

function query(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== ""),
  );
  const suffix = search.toString();
  return suffix ? `?${suffix}` : "";
}

export const api = {
  // Auth
  async login(email, password) {
    const data = await request("/auth/login", {
      method: "POST",
      body: { email, password },
      auth: false,
    });
    setToken(data.access_token);
    return data;
  },

  async register(payload) {
    const data = await request("/auth/register", {
      method: "POST",
      body: payload,
      auth: false,
    });
    setToken(data.access_token);
    return data;
  },

  logout() {
    setToken(null);
  },

  me: () => request("/auth/me"),
  forgotPassword: (email) => request("/auth/forgot-password", { method: "POST", body: { email }, auth: false }),

  // Contracts
  uploadContract(file) {
    const form = new FormData();
    form.append("file", file);
    return request("/contracts/upload", { method: "POST", form });
  },

  listContracts: (params = {}, { signal } = {}) =>
    request(`/contracts${query(params)}`, { signal }),

  getContract: (id, { signal } = {}) => request(`/contracts/${id}`, { signal }),

  getContractClauses: (id, { signal } = {}) =>
    request(`/contracts/${id}/clauses`, { signal }),

  downloadReport: (id) => request(`/contracts/${id}/report`),

  deleteContract: (id) => request(`/contracts/${id}`, { method: "DELETE" }),

  // Templates
  listTemplates: (params = {}, { signal } = {}) =>
    request(`/templates${query(params)}`, { signal }),

  getTemplate: (id, { signal } = {}) => request(`/templates/${id}`, { signal }),

  generateContract: (templateId, data) =>
    request("/contracts/generate", { method: "POST", body: { template_id: templateId, data } }),

  downloadContract: (id, format = "pdf") =>
    request(`/contracts/${id}/download${query({ format })}`),

  // Custom templates
  createTemplate: (payload) => request("/templates/custom", { method: "POST", body: payload }),
  updateTemplate: (id, payload) => request(`/templates/custom/${id}`, { method: "PUT", body: payload }),
  deleteTemplate: (id) => request(`/templates/custom/${id}`, { method: "DELETE" }),

  // Versions
  uploadVersion: (contractId, file) => {
    const form = new FormData();
    form.append("file", file);
    return request(`/contracts/${contractId}/versions`, { method: "POST", form });
  },
  listVersions: (contractId) => request(`/contracts/${contractId}/versions`),
  compareVersions: (contractId, v1, v2) =>
    request(`/contracts/${contractId}/compare${query({ v1, v2 })}`),

  // Dashboard
  dashboard: ({ signal } = {}) => request("/dashboard", { signal }),

  // Usage
  usage: ({ signal } = {}) => request("/usage", { signal }),

  // Profile
  updateProfile: (payload) => request("/auth/profile", { method: "PUT", body: payload }),

  // Payments
  listPlans: ({ signal } = {}) => request("/payments/plans", { signal }),
  createSubscription: (plan) => request("/payments/subscribe", { method: "POST", body: { plan } }),
  verifyPayment: (payload) => request("/payments/verify", { method: "POST", body: payload }),
  getSubscription: ({ signal } = {}) => request("/payments/subscription", { signal }),
  cancelSubscription: () => request("/payments/cancel", { method: "POST" }),
};
