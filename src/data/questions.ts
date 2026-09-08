import type { Question } from "../types";

export const QUESTIONS: Question[] = [
  {
    id: "test-holidays",
    prompt: "Name something families fight over during the holidays",
    answers: [
      { text: "Where to spend it", points: 28 },
      { text: "Politics", points: 22 },
      { text: "Cooking the meal", points: 18 },
      { text: "How much to spend", points: 14 },
      { text: "Who hosts", points: 10 },
      { text: "The TV remote", points: 8 },
    ],
  },
];
