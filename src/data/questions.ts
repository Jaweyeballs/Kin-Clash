import type { Question } from "../types";

export const QUESTIONS: Question[] = [
  {
    id: "test-holidays",
    prompt: "Name something families fight over during the holidays",
    answers: [
      { text: "Where to spend it", points: 32 },
      { text: "Politics", points: 21 },
      { text: "Cooking the meal", points: 14 },
      { text: "How much to spend", points: 11 },
      { text: "Who hosts", points: 8 },
      { text: "The TV remote", points: 6 },
      { text: "Seating", points: 5 },
      { text: "Who says grace", points: 3 },
    ],
  },
];
