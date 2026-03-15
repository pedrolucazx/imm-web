import React from "react";
import { screen } from "@testing-library/react";
import { Input } from "@/components/ui/input";
import { renderWithProviders } from "../../__setup__/render";

describe("Input", () => {
  it("renders the input element", () => {
    renderWithProviders(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders a label when the label prop is provided", () => {
    renderWithProviders(<Input label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders the error message when error prop is provided", () => {
    renderWithProviders(<Input label="Email" error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
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

  it("forwards data-invalid attribute to the input", () => {
    renderWithProviders(<Input data-testid="invalid-input" data-invalid />);
    const input = screen.getByTestId("invalid-input");
    expect(input).toHaveAttribute("data-invalid");
  });
});
