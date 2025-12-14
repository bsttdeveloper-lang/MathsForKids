export type Operation = "addition" | "subtraction" | "multiplication" | "division";

export interface Question {
  id: number;
  num1: number;
  num2: number;
  operation: Operation;
  correctAnswer: number;
  userAnswer: string;
  isAnswered: boolean;
  isCorrect: boolean | null;
}

export const getOperationSymbol = (operation: Operation): string => {
  switch (operation) {
    case "addition":
      return "+";
    case "subtraction":
      return "−";
    case "multiplication":
      return "×";
    case "division":
      return "÷";
  }
};

export const calculateAnswer = (num1: number, num2: number, operation: Operation): number => {
  switch (operation) {
    case "addition":
      return num1 + num2;
    case "subtraction":
      return num1 - num2;
    case "multiplication":
      return num1 * num2;
    case "division":
      return num1 / num2;
  }
};

export const generateQuestions = (
  operation: Operation,
  count: number,
  wholeNumbersOnly: boolean
): Question[] => {
  const questions: Question[] = [];

  for (let i = 0; i < count; i++) {
    let num1: number;
    let num2: number;

    if (wholeNumbersOnly) {
      if (operation === "division") {
        // Ensure clean division
        num2 = Math.floor(Math.random() * 9) + 1;
        num1 = num2 * (Math.floor(Math.random() * 10) + 1);
      } else if (operation === "subtraction") {
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * num1) + 1;
      } else {
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
      }
    } else {
      // Decimal numbers
      if (operation === "division") {
        num2 = Math.floor(Math.random() * 9) + 1;
        num1 = num2 * (Math.floor(Math.random() * 10) + 1);
      } else {
        num1 = Math.round((Math.random() * 20 + 0.1) * 10) / 10;
        num2 = Math.round((Math.random() * 20 + 0.1) * 10) / 10;
      }
    }

    questions.push({
      id: i + 1,
      num1,
      num2,
      operation,
      correctAnswer: calculateAnswer(num1, num2, operation),
      userAnswer: "",
      isAnswered: false,
      isCorrect: null,
    });
  }

  return questions;
};
