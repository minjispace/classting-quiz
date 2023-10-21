import { ReactNode, createContext, useContext, useState } from "react";

// 오답들 담는 타입 정의
type WrongAnswer = {
  question: string;
  correctAnswer: string;
  category: string;
  date: number;
};

type WrongAnswerContextType = {
  addWrongAnswer: (
    question: string,
    correctAnswer: string,
    category: string,
  ) => void;
  getWrongAnswers: () => {
    question: string;
    date: number;
    category: string;
    correctAnswer: string;
  }[];
};

const WrongAnswerContext = createContext<WrongAnswerContextType | undefined>(
  undefined,
);

export function WrongAnswerProvider({ children }: { children: ReactNode }) {
  // null or string 반환하는 wrongAnswer 정의
  const wrongAnswersFromLocalStorage = localStorage.getItem("wrongAnswers");
  const parsedWrongAnswers = wrongAnswersFromLocalStorage
    ? JSON.parse(wrongAnswersFromLocalStorage)
    : [];

  // wrongAnwser state
  const [wrongAnswers, setWrongAnswers] =
    useState<WrongAnswer[]>(parsedWrongAnswers);

  // 오답들 새로 담기
  const addWrongAnswer = (
    question: string,
    correctAnswer: string,
    category: string,
  ) => {
    const newWrongAnswer = {
      question,
      correctAnswer,
      category,
      date: Date.now(),
    };
    setWrongAnswers((prevWrongAnswers) => {
      const updatedWrongAnswers = [...prevWrongAnswers, newWrongAnswer];
      localStorage.setItem("wrongAnswers", JSON.stringify(updatedWrongAnswers));
      return updatedWrongAnswers;
    });
  };

  // 오답들 가져오기
  const getWrongAnswers = () => {
    return wrongAnswers;
  };

  return (
    <WrongAnswerContext.Provider
      value={{
        addWrongAnswer,
        getWrongAnswers,
      }}
    >
      {children}
    </WrongAnswerContext.Provider>
  );
}

export function useWrongAnswerContext() {
  const context = useContext(WrongAnswerContext);

  if (!context) {
    throw new Error("useWrongAnswer must be used within a WrongAnswerProvider");
  }
  return context;
}
