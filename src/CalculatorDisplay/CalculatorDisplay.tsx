import * as React from "react";
import { AutoScalingText } from "../AutoScalingText";
import { CalculatorDisplayProps } from "./types";
import "./CalculatorDisplay.css";

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({
  value,
}) => {
  const [formattedValue, setFormattedValue] = React.useState<string>("0");

  React.useEffect(() => {
    let newFormattedValue = parseFloat(value).toString();

    // Add back missing .0 in e.g. 12.0
    const match = value.match(/\.\d*?(0*)$/);

    if (match) {
      newFormattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];
    }

    setFormattedValue(newFormattedValue);
  }, [value]);

  return (
    <div className="calculator-display">
      <AutoScalingText>{formattedValue}</AutoScalingText>
    </div>
  );
};
