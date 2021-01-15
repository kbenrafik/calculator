export const Operation = {
  Multiplication: "*",
  Equality: "=",
  Subtraction: "-",
  Addition: "+",
  Division: "/",
} as const;
export type Operations = typeof Operation[keyof typeof Operation];

type CalculatorOperationsType = {
  [key in Operations]: (prevValue: number, nextValue: number) => number;
};

export const CalculatorOperations: CalculatorOperationsType = {
  [Operation.Division]: (prevValue: number, nextValue: number) =>
    prevValue / nextValue,
  [Operation.Multiplication]: (prevValue: number, nextValue: number) =>
    prevValue * nextValue,
  [Operation.Addition]: (prevValue: number, nextValue: number) =>
    prevValue + nextValue,
  [Operation.Subtraction]: (prevValue: number, nextValue: number) =>
    prevValue - nextValue,
  [Operation.Equality]: (prevValue: number, nextValue: number) => nextValue,
};

export type CalculatorProps = {};
