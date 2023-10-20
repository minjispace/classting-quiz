import { ReactNode, createContext, useContext } from "react";

interface QuizContextProps {}

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  return <QuizContext.Provider value={{}}>{children}</QuizContext.Provider>;
}

export function useQuizContext() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
