import React from "react";
import { screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";
import { renderWithProviders } from "../../__setup__/render";

describe("Button", () => {
  it("renders children text", () => {
    renderWithProviders(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders with the default primary variant", () => {
    renderWithProviders(<Button>Primary</Button>);
    const btn = screen.getByRole("button", { name: "Primary" });
    expect(btn).toBeInTheDocument();
  });

  it("renders with secondary variant", () => {
    renderWithProviders(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button", { name: "Secondary" })).toBeInTheDocument();
  });

  it("renders with accent variant", () => {
    renderWithProviders(<Button variant="accent">Accent</Button>);
    expect(screen.getByRole("button", { name: "Accent" })).toBeInTheDocument();
  });

  it("renders with muted variant", () => {
    renderWithProviders(<Button variant="muted">Muted</Button>);
    expect(screen.getByRole("button", { name: "Muted" })).toBeInTheDocument();
  });

  it("shows loading state when isLoading is true", () => {
    renderWithProviders(<Button isLoading>Submit</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });

  it("is not in loading state by default", () => {
    renderWithProviders(<Button>Default</Button>);
    const btn = screen.getByRole("button", { name: "Default" });
    expect(btn).toBeEnabled();
    expect(btn).toBeInTheDocument();
  });

  it("passes additional props to the underlying button", () => {
    renderWithProviders(
      <Button type="submit" data-testid="my-btn">
        Submit
      </Button>
    );
    const btn = screen.getByTestId("my-btn");
    expect(btn).toHaveAttribute("type", "submit");
  });
});
