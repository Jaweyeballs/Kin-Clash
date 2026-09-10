export type Answer = {
  text: string;
  points: number;
};

export type Question = {
  id: string;
  prompt: string;
  answers: Answer[];
};

export type QuestionSet = {
  id: string;
  name: string;
  questions: Question[];
};
