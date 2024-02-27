interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  question: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is my name?",
    options: [
      { id: "a", text: `alon`, isCorrect: true },
      { id: "b", text: `yaron`, isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "What is my age?",
    options: [
      { id: "a", text: `28`, isCorrect: true },
      { id: "b", text: `31`, isCorrect: false },
    ],
  },
  {
    id: 3,
    question: "Where do I live?",
    options: [
      { id: "a", text: `tlv`, isCorrect: true },
      { id: "b", text: `tvreia`, isCorrect: false },
    ],
  },
];

export default questions;
