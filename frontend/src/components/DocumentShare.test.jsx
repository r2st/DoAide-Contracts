import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DocumentShare from "./DocumentShare";

describe("DocumentShare", () => {
  it("links WhatsApp to the generated contract text", () => {
    render(<DocumentShare title="Rental Agreement" body="Rent is Rs 20,000 per month." />);
    const link = screen.getByText("Send contract on WhatsApp").closest("a");
    const text = decodeURIComponent(link.getAttribute("href").split("text=")[1]);
    expect(text).toContain("Rental Agreement");
    expect(text).toContain("Rent is Rs 20,000 per month.");
  });

  it("offers download and print", () => {
    render(<DocumentShare title="NDA" body="x" />);
    expect(screen.getByText("Download .txt")).toBeInTheDocument();
    expect(screen.getByText("Print / Save as PDF")).toBeInTheDocument();
  });
});
