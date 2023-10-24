import {
  render,
  screen,
  fireEvent,
} from "../../test-utils/testing-library-utils";
import { Result } from "..";
import axios from "axios";

describe("Result Component Test", () => {
  // Renders result page with correct data
  it("Renders result page with correct data", async () => {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=1&type=multiple",
    );
    render(<Result />);

    if (response.data.category) {
      // "퀴즈 결과" 텍스트 확인
      expect(screen.getByText("퀴즈 결과")).toBeInTheDocument();

      // "소요 시간" 텍스트와 시간 값 확인
      expect(screen.getByText("소요 시간 : 0초")).toBeInTheDocument();

      // "정답 개수" 텍스트와 개수 값 확인
      expect(screen.getByText("정답 개수 : 8개")).toBeInTheDocument();

      // "오답 수" 텍스트와 개수 값 확인
      expect(screen.getByText("오답 수 : 2개")).toBeInTheDocument();

      // "다른 문제 풀러가기" 버튼 확인
      const otherProblemsButton = screen.getByText("다른 문제 풀러가기");
      expect(otherProblemsButton).toBeInTheDocument();

      // "오답 노트 보기" 버튼 확인
      const feedbackButton = screen.getByText("오답 노트 보기");
      expect(feedbackButton).toBeInTheDocument();

      // "오답 노트 보기" 버튼 클릭 시 동작 확인
      fireEvent.click(feedbackButton);
    }
  });
});
