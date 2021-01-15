import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Calculator } from "./Calculator";

describe("Calculator", () => {
  test("display negative number", () => {
    const {getByText} = render(<Calculator />);
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('±'));

    const displayElement = screen.getByText(/-9/i);
    expect(displayElement).toBeInTheDocument();
  });
  
  test("multiplication", () => {
    const {getByText} = render(<Calculator />);
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('×'));
    fireEvent.click(getByText('6'));
    fireEvent.click(getByText('='));

    const displayElement = screen.getByText(/54/i);
    expect(displayElement).toBeInTheDocument();
  });
  
  test("addition", () => {
    const {getByText} = render(<Calculator />);
    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('6'));
    fireEvent.click(getByText('='));

    const displayElement = screen.getByText(/15/i);
    expect(displayElement).toBeInTheDocument();
  });
});
