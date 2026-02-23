import { render, screen } from "@testing-library/react";
import React from "react";

/**
 * Example unit test demonstrating @testing-library/react patterns.
 *
 * Replace this with tests for your actual components.
 * Components in `app/` (Server Components) should be tested in isolation
 * by extracting pure client components to `components/`.
 */

// ── inline component for demonstration ──────────────────────────────────────
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

// ──────────────────────────────────────────────────────────────────────────────
describe("Greeting component", () => {
  it("renders the user name", () => {
    render(<Greeting name="World" />);
    expect(screen.getByRole("heading", { name: /hello, world/i })).toBeInTheDocument();
  });

  it("renders with different names", () => {
    render(<Greeting name="Pedro" />);
    expect(screen.getByText("Hello, Pedro!")).toBeInTheDocument();
  });
});
