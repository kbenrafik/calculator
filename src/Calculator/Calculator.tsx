import * as React from "react";
import { CalculatorDisplay } from "../CalculatorDisplay";
import { CalculatorKey } from "../CalculatorKey/CalculatorKey";
import { CalculatorOperations, CalculatorProps, Operations } from "./types";
import "./Calculator.css";

export const Calculator: React.FC<CalculatorProps> = () => {
  const [value, setValue] = React.useState<number | null>(null);
  const [displayValue, setDisplayValue] = React.useState<string>("0");
  const [operator, setOperator] = React.useState<Operations | null>(null);
  const [waitingForOperand, setWaitingForOperand] = React.useState<boolean>(
    false
  );

  const clearDisplay = React.useCallback(() => {
    setDisplayValue("0");
  }, []);

  const clearAll = React.useCallback(() => {
    setValue(null);
    setDisplayValue("0");
    setOperator(null);
    setWaitingForOperand(false);
  }, []);

  const clearLastChar = React.useCallback(() => {
    const newDisplayValue =
      displayValue.substring(0, displayValue.length - 1) || "0";
    setDisplayValue(newDisplayValue);
  }, [displayValue]);

  const toggleSign = React.useCallback(() => {
    const newValue = parseFloat(displayValue) * -1;
    setDisplayValue(String(newValue));
  }, [displayValue]);

  const inputPercent = React.useCallback(() => {
    const currentValue = parseFloat(displayValue);

    if (currentValue === 0) return;

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, "");
    const newValue = parseFloat(displayValue) / 100;

    setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)));
  }, [displayValue]);

  const inputDot = React.useCallback(() => {
    if (!/\./.test(displayValue)) {
      setDisplayValue(displayValue + ".");
      setWaitingForOperand(false);
    }
  }, [displayValue]);

  const inputDigit = React.useCallback(
    (digit: number) => {
      if (waitingForOperand) {
        setDisplayValue(String(digit));
        setWaitingForOperand(false);
      } else {
        setDisplayValue(
          displayValue === "0" ? String(digit) : displayValue + digit
        );
      }
    },
    [displayValue, waitingForOperand]
  );

  const performOperation = React.useCallback(
    (nextOperator: Operations) => {
      const inputValue = parseFloat(displayValue);

      if (value == null) {
        setValue(inputValue);
      } else if (operator) {
        const currentValue = value || 0;
        const newValue = CalculatorOperations[operator](
          currentValue,
          inputValue
        );

        setValue(newValue);
        setDisplayValue(String(newValue));
      }

      setOperator(nextOperator);
      setWaitingForOperand(true);
    },
    [displayValue, operator, value]
  );

  const handleKeyDown = React.useCallback(
    (event: any) => {
      let { key } = event;

      if (key === "Enter") key = "=";

      if (/\d/.test(key)) {
        event.preventDefault();
        inputDigit(parseInt(key, 10));
      } else if (key in CalculatorOperations) {
        event.preventDefault();
        performOperation(key);
      } else if (key === ".") {
        event.preventDefault();
        inputDot();
      } else if (key === "%") {
        event.preventDefault();
        inputPercent();
      } else if (key === "Backspace") {
        event.preventDefault();
        clearLastChar();
      } else if (key === "Clear") {
        event.preventDefault();

        if (displayValue !== "0") {
          clearDisplay();
        } else {
          clearAll();
        }
      }
    },
    [
      clearAll,
      clearDisplay,
      clearLastChar,
      displayValue,
      inputDigit,
      inputDot,
      inputPercent,
      performOperation,
    ]
  );

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const hasValueToDisplay = React.useMemo(() => displayValue !== "0", [
    displayValue,
  ]);
  const clearText = React.useMemo(() => (hasValueToDisplay ? "C" : "AC"), [
    hasValueToDisplay,
  ]);

  const onKeyClearPress = React.useCallback(
    () => (hasValueToDisplay ? clearDisplay() : clearAll()),
    [clearAll, clearDisplay, hasValueToDisplay]
  );

  return (
    <div className="calculator">
      <CalculatorDisplay value={displayValue} />
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="function-keys">
            <CalculatorKey className="key-clear" onPress={onKeyClearPress}>
              {clearText}
            </CalculatorKey>
            <CalculatorKey className="key-sign" onPress={toggleSign}>
              ±
            </CalculatorKey>
            <CalculatorKey className="key-percent" onPress={inputPercent}>
              %
            </CalculatorKey>
          </div>
          <div className="digit-keys">
            <CalculatorKey className="key-0" onPress={() => inputDigit(0)}>
              0
            </CalculatorKey>
            <CalculatorKey className="key-dot" onPress={() => inputDot()}>
              ●
            </CalculatorKey>
            <CalculatorKey className="key-1" onPress={() => inputDigit(1)}>
              1
            </CalculatorKey>
            <CalculatorKey className="key-2" onPress={() => inputDigit(2)}>
              2
            </CalculatorKey>
            <CalculatorKey className="key-3" onPress={() => inputDigit(3)}>
              3
            </CalculatorKey>
            <CalculatorKey className="key-4" onPress={() => inputDigit(4)}>
              4
            </CalculatorKey>
            <CalculatorKey className="key-5" onPress={() => inputDigit(5)}>
              5
            </CalculatorKey>
            <CalculatorKey className="key-6" onPress={() => inputDigit(6)}>
              6
            </CalculatorKey>
            <CalculatorKey className="key-7" onPress={() => inputDigit(7)}>
              7
            </CalculatorKey>
            <CalculatorKey className="key-8" onPress={() => inputDigit(8)}>
              8
            </CalculatorKey>
            <CalculatorKey className="key-9" onPress={() => inputDigit(9)}>
              9
            </CalculatorKey>
          </div>
        </div>
        <div className="operator-keys">
          <CalculatorKey
            className="key-divide"
            onPress={() => performOperation("/")}
          >
            ÷
          </CalculatorKey>
          <CalculatorKey
            className="key-multiply"
            onPress={() => performOperation("*")}
          >
            ×
          </CalculatorKey>
          <CalculatorKey
            className="key-subtract"
            onPress={() => performOperation("-")}
          >
            −
          </CalculatorKey>
          <CalculatorKey
            className="key-add"
            onPress={() => performOperation("+")}
          >
            +
          </CalculatorKey>
          <CalculatorKey
            className="key-equals"
            onPress={() => performOperation("=")}
          >
            =
          </CalculatorKey>
        </div>
      </div>
    </div>
  );
};
