import React from "react";
import { screen } from "@testing-library/react";
import { Input } from "@/components/ui/Input";
import { renderWithProviders } from "../../__setup__/render";

describe("Input", () => {
  it("renders the input element", () => {
    renderWithProviders(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("forwards ref to the underlying input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    renderWithProviders(<Input ref={ref} placeholder="ref-input" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName.toLowerCase()).toBe("input");
  });

  it("passes additional props to the underlying input", () => {
    renderWithProviders(<Input type="password" data-testid="pwd-input" />);
    const input = screen.getByTestId("pwd-input");
    expect(input).toHaveAttribute("type", "password");
  });

  it("applies invalid styles when data-invalid is set", () => {
    renderWithProviders(<Input data-testid="invalid-input" data-invalid />);
    const input = screen.getByTestId("invalid-input");
    expect(input).toHaveAttribute("data-invalid");
  });
});
