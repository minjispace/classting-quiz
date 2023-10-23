import { ReactNode, createContext, useContext, useState } from "react";
import { QuizInfoType } from "../types/quiz.type";

// Quiz context type
type QuizContextType = {
  quizInfo: QuizInfoType;
  quizStartTime: number;
  startQuiz: (info: QuizInfoType) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizInfo, setQuizInfo] = useState<QuizInfoType>({
    amount: 1,
    category: "any",
    difficulty: "any",
  });

  const [quizStartTime, setStartTime] = useState<number>(-1);

  /**
   * @param info
   * start Quiz를 실행 하면
   * quizInfo 에 대한 정보를 업데이트하고
   * 시작 시간을 global state 에 업데이트한다.
   */
  const startQuiz = (info: QuizInfoType) => {
    updateSetQuizInfo(info);
    setStartTime(Date.now());
  };

  // quizInfo 에 대한 정보를 업데이트
  const updateSetQuizInfo = (info: QuizInfoType) => {
    setQuizInfo(info);
  };

  return (
    <QuizContext.Provider
      value={{
        quizStartTime,
        startQuiz,
        quizInfo,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// useQuizContext hook
export function useQuizContext() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
