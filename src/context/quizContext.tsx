import { ReactNode, createContext, useContext, useState } from "react";

// wrongAnswerList type
type WrongAnswerListType = {
  question: string;
  correctAnswer: string;
  category: string;
};

// Quiz result type
type QuizResult = {
  startTime: number | null;
  correctAnswers: number;
  wrongAnswers: number;
  usedTime: number;
  wrongAnswersList: WrongAnswerListType[];
};

// Quiz context type
type QuizContextType = {
  quizResult: QuizResult;
  startQuizTime: () => void;
  endQuizTime: () => void;
  updateAnswerCounts: (
    isCorrect: boolean,
    question: string,
    correctAnswer: string,
    category: string,
  ) => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [quizResult, setQuizResult] = useState<QuizResult>({
    startTime: null,
    correctAnswers: 0,
    wrongAnswers: 0,
    usedTime: 0,
    wrongAnswersList: [],
  });

  // 퀴즈 시작 시간 설정
  const startQuizTime = () => {
    setQuizResult({
      ...quizResult,
      startTime: Date.now(),
      correctAnswers: 0,
      wrongAnswers: 0,
      wrongAnswersList: [],
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

  // 정답 오답 개수 업데이트 함수
  const updateAnswerCounts = (
    isCorrect: boolean,
    question: string,
    correctAnswer: string,
    category: string,
  ) => {
    if (isCorrect) {
      setQuizResult((prevQuizResult) => ({
        ...prevQuizResult,
        correctAnswers: prevQuizResult.correctAnswers + 1,
      }));
    } else {
      setQuizResult((prevQuizResult) => ({
        ...prevQuizResult,
        wrongAnswers: prevQuizResult.wrongAnswers + 1,
        wrongAnswersList: [
          ...prevQuizResult.wrongAnswersList,
          { question, correctAnswer, category, id: Date.now() },
        ],
      }));
    }
  };

  return (
    <QuizContext.Provider
      value={{
        quizResult,
        startQuizTime,
        endQuizTime,
        updateAnswerCounts,
        // addWrongAnswerList,
      }}
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
