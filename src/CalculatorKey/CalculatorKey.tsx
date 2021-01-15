import * as React from "react";
import "./CalculatorKey.css";
import { CalculatorKeyProps } from "./types";

export const CalculatorKey: React.FC<CalculatorKeyProps> = ({
  onPress,
  className,
  children,
}) => (
  <button className={`calculator-key ${className}`} onClick={onPress}>
    {children}
  </button>
);
