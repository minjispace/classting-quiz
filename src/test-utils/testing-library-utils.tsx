import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { QuizProvider } from "../context/quizContext";

interface CustomRenderOptions extends RenderOptions {
  queryClient?: QueryClient;
}

function customRender(ui: ReactElement, options?: CustomRenderOptions) {
  const { queryClient, ...restOptions } = options || {};
  const client = queryClient || new QueryClient();

  return render(
    <QueryClientProvider client={client}>
      <QuizProvider>
        <BrowserRouter>{ui}</BrowserRouter>
      </QuizProvider>
    </QueryClientProvider>,
    restOptions,
  );
}

export * from "@testing-library/react";
export { customRender };
