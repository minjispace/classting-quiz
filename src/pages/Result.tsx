import { Link } from "react-router-dom";
import { useQuizContext } from "../context/quizContext";
import { getDataFromLocalStorage, formatTime } from "../utils";
import { RedirectHome, ResultChart } from "../components";
import { useState } from "react";
import Confetti from "react-confetti";

const Result = () => {
  const { quizStartTime } = useQuizContext();

  // 해당 quiz data localstorage에서 가져오기
  const data = getDataFromLocalStorage()?.find(
    (item) => item.startTime === quizStartTime,
  );

  // 만점인 경우에 confetti를 활성화시키는 상태 변수
  const isPerfectScore = data?.wrongResult?.length === 0;
  const [confettiActive, setConfettiActive] = useState(isPerfectScore);

  // 데이터가 없다면 홈으로
  if (!data || !data.startTime) {
    return <RedirectHome />;
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="text-4xl font-bold p-4 rounded-lg mt-10">퀴즈 결과</div>

      {/* Description and Chart */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start m-4">
        <div className="bg-white rounded-lg p-8 shadow-md lg:mr-10 lg:min-w-fit mb-4">
          <p>소요 시간 : {formatTime(data.endTime - data.startTime)}</p>
          <p>정답 개수 : {data.correct}개</p>
          <p>오답 수 : {data.wrong}개</p>
          <div>총 문제 수 : {data.correct + data.wrong}개</div>
          <p>
            정답 비율 :{" "}
            {((data.correct / (data.correct + data.wrong)) * 100).toFixed(2)}%
          </p>
        </div>

        <ResultChart correctAnswers={data.correct} wrongAnswers={data.wrong} />
      </div>

      {/* Feedback Note Button */}
      {data?.wrongResult?.length === 0 ? (
        <div className="text-2xl text-green mt-4">만점입니다. 축하합니다!!</div>
      ) : (
        <Link to={`/feed-back/${data.startTime}`}>
          <button className="bg-red-500 hover:opacity-80 text-white font-semibold rounded-lg px-4 py-2.5 mt-4">
            오답 노트 보기
          </button>
        </Link>
      )}

      {/* Home Button */}
      <Link to="/">
        <button className="bg-green hover:opacity-80 transition-all text-white font-semibold rounded-lg px-4 py-2.5 mt-4">
          다른 문제 풀러가기
        </button>
      </Link>

      {/* 만점일 때 confetti 효과 */}
      {confettiActive && (
        <Confetti
          numberOfPieces={400}
          recycle={false}
          onConfettiComplete={() => setConfettiActive(false)}
        />
      )}
    </main>
  );
};

export default Result;
