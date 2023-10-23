export type QuizHistoryDataType = {
  category: string;
  startTime: number;
  endTime: number;
  correct: number;
  wrong: number;
  wrongResult: {
    category: string;
    correctAnswer: string;
    question: string;
    id: string;
  }[];
}[];

export function getDataFromLocalStorage() {
  const storedData = localStorage.getItem("quizResults");

  // date가 있을 경우 가져오기
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    return parsedData as QuizHistoryDataType;
  }

  // 데이터를 찾지 못한 경우 null 반환
  return null;
}
