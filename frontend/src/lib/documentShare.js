// Sharing a generated document itself (not just a link to the tool).
// wa.me links carry the text in the URL, so long contracts are cut down and
// point back to the generator; phones that support the Web Share API get the
// full document as a .txt file instead.

export const WHATSAPP_TEXT_LIMIT = 3000;

export function slugifyFilename(title) {
  const base = String(title || "contract")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "contract"}.txt`;
}

export function documentWhatsappText(title, body, link, limit = WHATSAPP_TEXT_LIMIT) {
  const header = `*${title}*\n\n`;
  const footer = link ? `\n\nMade free with DoAide Contracts: ${link}` : "";
  const room = limit - header.length - footer.length;
  const text = String(body || "").trim();
  if (text.length <= room) return `${header}${text}${footer}`;
  const note = "\n\n… (shortened for WhatsApp — ask me for the full file)";
  const cut = text.slice(0, Math.max(0, room - note.length)).replace(/\s+\S*$/, "");
  return `${header}${cut}${note}${footer}`;
}

export function documentWhatsappUrl(title, body, link) {
  return `https://wa.me/?text=${encodeURIComponent(documentWhatsappText(title, body, link))}`;
}

export function canShareFile(nav = typeof navigator !== "undefined" ? navigator : undefined) {
  if (!nav?.share || !nav?.canShare || typeof File === "undefined") return false;
  try {
    return nav.canShare({ files: [new File(["x"], "x.txt", { type: "text/plain" })] });
  } catch {
    return false;
  }
}

// Returns "shared", "cancelled" or "unsupported".
export async function shareDocumentFile(title, body, nav = typeof navigator !== "undefined" ? navigator : undefined) {
  if (!canShareFile(nav)) return "unsupported";
  const file = new File([body], slugifyFilename(title), { type: "text/plain" });
  try {
    await nav.share({ files: [file], title, text: title });
    return "shared";
  } catch (err) {
    return err?.name === "AbortError" ? "cancelled" : "unsupported";
  }
}

export function downloadDocument(title, body) {
  const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = slugifyFilename(title);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
