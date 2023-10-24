import "@testing-library/jest-dom";
import { SetupForm } from "..";
import * as quizContext from "../../context/quizContext";
import {
  render,
  screen,
  fireEvent,
  act,
} from "../../test-utils/testing-library-utils";
import * as ReactQuery from "react-query";

describe("SetupForm Component Test", () => {
  // SetupForm component rendering
  it("setupForm 컴포넌트 렌더링 테스트", () => {
    render(<SetupForm />);
    const setupFormElement = screen.getByText("클래스밍 퀴즈 세팅");
    expect(setupFormElement).toBeInTheDocument();
  });

  // amount state test
  it("amount 상태 변경 이벤트 테스트", () => {
    render(<SetupForm />);
    const amountSelect = screen.getByLabelText("문제수:");
    fireEvent.change(amountSelect, { target: { value: "10" } });
    expect(amountSelect).toHaveValue("10");
  });

  // category state test
  it("category 상태 변경 이벤트 테스트", () => {
    render(<SetupForm />);
    const categorySelect = screen.getByLabelText("카테고리:");
    fireEvent.change(categorySelect, { target: { value: "10" } });
    expect(categorySelect).toHaveValue("10");
  });

  // difficulty state test
  it("difficulty 상태 변경 이벤트 테스트", () => {
    render(<SetupForm />);
    const difficultySelect = screen.getByLabelText("난이도:");
    fireEvent.change(difficultySelect, { target: { value: "easy" } });
    expect(difficultySelect).toHaveValue("easy");
  });

  // quizContext quizInfo test
  it("form 제출 했을때, quizInfo 받아오는 값 테스트", async () => {
    const startQuizMock = jest.fn();

    jest.spyOn(quizContext, "useQuizContext").mockImplementation(() => ({
      startQuiz: startQuizMock,
      quizInfo: {
        amount: 3,
        category: "any",
        difficulty: "any",
      },
      quizStartTime: 0,
    }));

    render(<SetupForm />);

    const startButton = screen.getByText("퀴즈 풀기 시작");

    act(() => {
      fireEvent.click(startButton);
    });

    expect(startQuizMock).toHaveBeenCalledWith({
      amount: 3,
      category: "any",
      difficulty: "any",
    });
  });

  // react query data state is loading
  it("renders loading spinner when isLoading is true", async () => {
    jest.mock("react-query");

    // useQuery를 모의하고 isLoading을 true로 설정합니다.
    jest.mock("react-query", () => {
      return {
        ...ReactQuery,
        useQuery: jest.fn().mockReturnValue({
          isLoading: true,
          data: null,
        }),
      };
    });

    render(<SetupForm />);

    // Loading 컴포넌트가 렌더링되는지 확인
    expect(screen.queryByTestId("loading-component")).toBeNull();
  });
});
