export type QuizDataType = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type correctListType =
  | "정답을 클릭 해주세요"
  | "오답입니다"
  | "정답입니다";
