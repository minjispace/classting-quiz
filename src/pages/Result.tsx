import { Link } from "react-router-dom";
import { useQuizContext } from "../context/quizContext";
import { formatTime } from "../utils/formatTime";
import RedirectHome from "../components/RedirectHome";
import ResultChart from "../components/ResultChart";
import { getDataFromLocalStorage } from "../utils/localStorage.quizResult";

const Result = () => {
  const { quizStartTime } = useQuizContext();

  // 해당 quiz data localstorage에서 가져오기
  const data = getDataFromLocalStorage()?.find(
    (item) => item.startTime === quizStartTime,
  );

  // 데이터가 없다면 홈으로
  if (!data || !data.startTime) {
    return <RedirectHome />;
  }

  return (
    <main>
      {/* quiz result description */}
      <h1>결과</h1>
      <p>
        퀴즈를 마칠 때까지 소요된 시간:{" "}
        {formatTime(data.endTime - data.startTime)}
      </p>
      <p>정답 개수: {data.correct}</p>
      <p>오답 수: {data.wrong}</p>
      <div>총 문제수 {data.correct + data.wrong}</div>
      <p>
        정답 비율:{" "}
        {((data.correct / (data.correct + data.wrong)) * 100).toFixed(2)}%
      </p>

      {/* chart */}
      <ResultChart correctAnswers={data.correct} wrongAnswers={data.wrong} />

      {/* feedback note button */}
      {data?.wrongResult?.length === 0 ? (
        <div>만점입니다. 축하합니다!!</div>
      ) : (
        <Link to={`/feed-back/${data.startTime}`}>
          <button>오답노트</button>
        </Link>
      )}

      {/* home button */}
      <Link to="/">
        <button>다른 문제 풀러가기</button>
      </Link>
    </main>
  );
};

export default Result;
