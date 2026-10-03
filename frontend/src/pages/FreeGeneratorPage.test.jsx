import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import FreeGeneratorPage from "./FreeGeneratorPage";

vi.mock("../hooks/usePageTitle", () => ({ usePageTitle: () => {} }));
vi.mock("../lib/share", () => ({
  fullUrl: (p) => `http://localhost${p}`,
  whatsappUrl: (t, u) => `https://wa.me/?text=${encodeURIComponent(`${t} ${u}`)}`,
  twitterUrl: (t, u) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}`,
  copyToClipboard: vi.fn(),
}));

function renderPage(search = "") {
  return render(
    <MemoryRouter initialEntries={[`/generator${search}`]}>
      <FreeGeneratorPage />
    </MemoryRouter>,
  );
}

describe("FreeGeneratorPage", () => {
  it("shows page title", () => {
    renderPage();
    expect(screen.getByText("Free Contract Generator")).toBeInTheDocument();
  });

  it("shows template selection when no template chosen", () => {
    renderPage();
    expect(screen.getByText("Choose a template")).toBeInTheDocument();
  });

  it("lists all templates for selection", () => {
    renderPage();
    expect(screen.getByText(/Non-Disclosure Agreement/)).toBeInTheDocument();
    expect(screen.getByText(/Employment Agreement/)).toBeInTheDocument();
    expect(screen.getByText(/Rental/)).toBeInTheDocument();
  });

  it("shows form after selecting a template", async () => {
    renderPage();
    const ndaBtn = screen.getByText(/Non-Disclosure Agreement/).closest("button");
    await userEvent.click(ndaBtn);
    expect(screen.getByText(/Disclosing Party Name/)).toBeInTheDocument();
    expect(screen.getByText(/Receiving Party Name/)).toBeInTheDocument();
  });

  it("pre-selects template from URL param", () => {
    renderPage("?template=nda");
    expect(screen.getByText(/Disclosing Party Name/)).toBeInTheDocument();
  });

  it("shows change template button in form view", () => {
    renderPage("?template=nda");
    expect(screen.getByText("Change template")).toBeInTheDocument();
  });

  it("generates contract on form submit", async () => {
    renderPage("?template=nda");

    const inputs = screen.getAllByRole("textbox");
    for (const input of inputs) {
      await userEvent.type(input, "Test Value");
    }

    const selects = screen.getAllByRole("combobox");
    for (const select of selects) {
      const options = select.querySelectorAll("option");
      if (options.length > 1) {
        await userEvent.selectOptions(select, options[1].value);
      }
    }

    const dateInputs = screen.getAllByDisplayValue("");
    for (const inp of dateInputs) {
      if (inp.type === "date") {
        await userEvent.type(inp, "2026-01-01");
      }
    }

    const generateBtn = screen.getByText("Generate Contract");
    await userEvent.click(generateBtn);

    expect(screen.getByText("Your Contract")).toBeInTheDocument();
  });
});
