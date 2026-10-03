import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import AuthForm from "./AuthForm";

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    login: vi.fn(),
    register: vi.fn(),
  }),
}));

function renderAuth(props = {}) {
  return render(
    <MemoryRouter>
      <AuthForm {...props} />
    </MemoryRouter>,
  );
}

describe("AuthForm", () => {
  it("defaults to register mode", () => {
    renderAuth();
    const create = screen.getByRole("tab", { name: "Create account" });
    expect(create).toHaveAttribute("aria-selected", "true");
  });

  it("can be started in login mode", () => {
    renderAuth({ defaultMode: "login" });
    const signIn = screen.getByRole("tab", { name: "Sign in" });
    expect(signIn).toHaveAttribute("aria-selected", "true");
  });

  it("shows email and password fields", () => {
    renderAuth();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("shows name field only in register mode", async () => {
    renderAuth();
    expect(screen.getByLabelText(/Your name/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("tab", { name: "Sign in" }));
    expect(screen.queryByLabelText(/Your name/)).toBeNull();
  });

  it("shows validation errors for empty fields", async () => {
    renderAuth({ defaultMode: "login" });
    await userEvent.click(screen.getByText("Sign in", { selector: "button[type='submit']" }));
    expect(screen.getByText("Enter your email.")).toBeInTheDocument();
    expect(screen.getByText("Enter your password.")).toBeInTheDocument();
  });

  it("shows password length hint in register mode", () => {
    renderAuth();
    expect(screen.getByText("At least 8 characters.")).toBeInTheDocument();
  });
});
