import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { QuizProvider } from "./context/quizContext.tsx";
import { WrongAnswerProvider } from "./context/\bwrongAnswerContext.tsx";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <QuizProvider>
        <WrongAnswerProvider>
          <App />
        </WrongAnswerProvider>
      </QuizProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
