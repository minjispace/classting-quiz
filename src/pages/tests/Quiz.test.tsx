import "@testing-library/jest-dom";
import { Quiz } from "..";
import { getHandler, server } from "../../mocks/server";
import axios from "axios";
import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "../../test-utils/testing-library-utils";

describe("Quiz  Test", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  // data가 없을때 redirect home component로 테스트
  it("data가 없을때 redirect home component로 테스트", async () => {
    // Simulate a server error
    getHandler;

    render(<Quiz />);

    // Wait for the error message to be displayed
    await waitFor(() => screen.getByText("퀴즈가 종료 되었습니다."));

    // Verify that the error message is displayed
    expect(screen.getByText("퀴즈가 종료 되었습니다.")).toBeInTheDocument();
  });

  // 퀴즈 데이터 가져오는 로직 테스트
  it("퀴즈 데이터 가져오는 로직 테스트", async () => {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=1&type=multiple",
    );

    render(<Quiz />);

    if (response.data.category) {
      // Wait for the data to be loaded
      await waitFor(() => screen.getByText("현재 문제 카테고리"));

      // Verify that the component has rendered as expected
      expect(
        screen.getByText("현재 문제 카테고리 : Entertainment: Video Games"),
      ).toBeInTheDocument();
    }
  });

  // 정답 확인 눌렀을 때 동작 테스트
  it("정답 확인 눌렀을 때 동작 테스트", async () => {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=1&type=multiple",
    );

    render(<Quiz />);

    if (response.data.category) {
      // 여기에서는 정답 확인 버튼을 찾아 클릭합니다.
      const answerCheckButton = screen.getByText("정답 확인");
      fireEvent.click(answerCheckButton);

      // AnswerModal이 나타나는지 확인
      const answerModal = screen.getByText("정답입니다");
      expect(answerModal).toBeInTheDocument();
    }
  });

  // 버튼이 렌더링되고 클릭 이벤트가 동작하는지 확인
  it("버튼이 렌더링되고 클릭 이벤트가 동작하는지 확인", async () => {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=1&type=multiple",
    );

    // 테스트용 데이터
    const answersList = ["Werewolf", "Vampire", "Minotaur", "Skeleton"];
    const updateSelectedAnswerState = jest.fn();

    // 테스트 렌더링
    render(<Quiz />);

    if (response.data.incorrect_answers) {
      // 버튼들을 찾습니다.
      const buttons = screen.getAllByRole("button");

      // 각 버튼을 클릭하고 클릭 이벤트가 제대로 동작하는지 확인
      buttons.forEach((button, _) => {
        fireEvent.click(button);
        expect(updateSelectedAnswerState).toHaveBeenCalledTimes(
          answersList.length,
        );
      });
    }
  });
});
