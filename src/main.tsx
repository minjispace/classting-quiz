import React from "react";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { QuizProvider } from "./context/quizContext.tsx";
import { createRoot } from "react-dom/client";

// Create a client
export const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <QuizProvider>
          <App />
        </QuizProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
