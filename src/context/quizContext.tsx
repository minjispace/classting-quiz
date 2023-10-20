import { ReactNode, createContext, useContext, useState } from "react";

// 결과 정보를 담는 타입 정의
type QuizResult = {
  startTime: number | null;
  correctAnswers: number;
  wrongAnswers: number;
  usedTime: number;
};

type QuizContextType = {
  quizResult: QuizResult;
  startQuizTime: () => void;
  endQuizTime: () => void;
  updateAnswerCounts: (isCorrect: boolean) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizResult, setQuizResult] = useState<QuizResult>({
    startTime: null,
    correctAnswers: 0,
    wrongAnswers: 0,
    usedTime: 0,
  });

  // 퀴즈 시작 시간 설정
  const startQuizTime = () => {
    setQuizResult({
      ...quizResult,
      startTime: Date.now(),
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  };

  // 퀴즈 종료 시간 설정
  const endQuizTime = () => {
    if (quizResult.startTime) {
      const endTime = Date.now();
      const usedTime = endTime - quizResult.startTime;
      setQuizResult({
        ...quizResult,
        usedTime,
      });
    }
  };

  // 정답 오답 업데이트 함수
  const updateAnswerCounts = (isCorrect: boolean) => {
    if (isCorrect) {
      setQuizResult({
        ...quizResult,
        correctAnswers: quizResult.correctAnswers + 1, // 정답일 때 정답 갯수 증가
      });
    } else {
      setQuizResult({
        ...quizResult,
        wrongAnswers: quizResult.wrongAnswers + 1, // 오답일 때 오답 갯수 증가
      });
    }
  };

  return (
    <QuizContext.Provider
      value={{ quizResult, startQuizTime, endQuizTime, updateAnswerCounts }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuizContext() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
