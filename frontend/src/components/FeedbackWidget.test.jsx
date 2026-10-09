import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import FeedbackWidget from "./FeedbackWidget";

describe("FeedbackWidget", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the feedback button", () => {
    render(<FeedbackWidget />);
    expect(screen.getByLabelText("Send feedback")).toBeInTheDocument();
  });

  it("opens modal on click", () => {
    render(<FeedbackWidget />);
    fireEvent.click(screen.getByLabelText("Send feedback"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Send Feedback")).toBeInTheDocument();
  });

  it("closes modal on cancel", () => {
    render(<FeedbackWidget />);
    fireEvent.click(screen.getByLabelText("Send feedback"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("submits feedback successfully", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });

    render(<FeedbackWidget />);
    fireEvent.click(screen.getByLabelText("Send feedback"));
    fireEvent.change(screen.getByPlaceholderText("What's on your mind?"), {
      target: { value: "Great tool!" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => expect(screen.getByText("Sent!")).toBeInTheDocument());
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/feedback",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ message: "Great tool!" }),
      }),
    );
  });

  it("shows error on failed submit", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false });

    render(<FeedbackWidget />);
    fireEvent.click(screen.getByLabelText("Send feedback"));
    fireEvent.change(screen.getByPlaceholderText("What's on your mind?"), {
      target: { value: "Bug report" },
    });
    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() =>
      expect(screen.getByText("Failed to send. Please try again.")).toBeInTheDocument(),
    );
  });
});
