export type QuizDataType = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

// quizInfoType
export type QuizInfoType = {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
};

// wrongAnswerList type
export type WrongAnswerListType = {
  question: string;
  correctAnswer: string;
  category: string;
  id: string;
};
