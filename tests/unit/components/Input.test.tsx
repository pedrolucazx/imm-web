import React from "react";
import { screen } from "@testing-library/react";
import { Input } from "@/components/ui/Input";
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

  it("does not render a label when the prop is omitted", () => {
    renderWithProviders(<Input placeholder="No label" />);
    expect(screen.queryByText("Email")).not.toBeInTheDocument();
  });

  it("renders the error message when error prop is provided", () => {
    renderWithProviders(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("renders helperText when there is no error", () => {
    renderWithProviders(<Input helperText="Enter your email address" />);
    expect(screen.getByText("Enter your email address")).toBeInTheDocument();
  });

  it("does not render helperText when an error is present", () => {
    renderWithProviders(<Input helperText="Some hint" error="Required field" />);
    expect(screen.queryByText("Some hint")).not.toBeInTheDocument();
    expect(screen.getByText("Required field")).toBeInTheDocument();
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
});
