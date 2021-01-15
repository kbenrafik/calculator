import React from "react";
import { render, screen } from "@testing-library/react";
import { CalculatorDisplay } from "./CalculatorDisplay";

describe("CalculatorDisplay", () => {
  test("render value", () => {
    render(<CalculatorDisplay value="90.7" />);
    const displayElement = screen.getByText(/90.7/i);
    expect(displayElement).toBeInTheDocument();
  });
  test("render negative value", () => {
    render(<CalculatorDisplay value="-0.7" />);
    const displayElement = screen.getByText(/-0.7/i);
    expect(displayElement).toBeInTheDocument();
  });
});
