import { Link } from "react-router-dom";
import { useQuizContext } from "../context/quizContext";
import { formatTime } from "../utils/formatTime";
import Redirect from "../components/Redirect";
import ResultChart from "../components/ResultChart";

const Result = () => {
  const { quizResult } = useQuizContext();

  // 정답, 오답 및 총 시간 가져오기
  const { correctAnswers, wrongAnswers, startTime } = quizResult;

  // 퀴즈를 마칠 때까지 소요된 시간 계산
  const endTime = Date.now();
  const elapsedMilliseconds = startTime ? endTime - startTime : 0;

  // // redirect page
  if (!startTime) return <Redirect />;

  return (
    <main>
      {/* description */}
      <h1>결과</h1>
      <p>퀴즈를 마칠 때까지 소요된 시간: {formatTime(elapsedMilliseconds)}</p>
      <p>정답 개수: {correctAnswers}</p>
      <p>오답 수: {wrongAnswers}</p>
      <p>
        정답 비율:{" "}
        {((correctAnswers / (correctAnswers + wrongAnswers)) * 100).toFixed(2)}%
      </p>

      {/* chart */}
      <ResultChart
        correctAnswers={correctAnswers}
        wrongAnswers={wrongAnswers}
      />

      {/* home button */}
      <Link to="/">
        <button>다른 문제 풀러가기</button>
      </Link>

      {/* feedback note button */}
      <Link to="/feed-back">
        <button>오답노트</button>
      </Link>
    </main>
  );
};

export default Result;
