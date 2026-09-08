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
  {
    id: "test-fair",
    prompt: "Name something you buy at a fall fair",
    answers: [
      { text: "Funnel cake", points: 28 },
      { text: "Apple cider", points: 20 },
      { text: "Corn dogs", points: 16 },
      { text: "Tickets", points: 12 },
      { text: "Pumpkins", points: 9 },
      { text: "Cotton candy", points: 7 },
      { text: "Fries", points: 5 },
      { text: "Caramel apples", points: 3 },
    ],
  },
];
