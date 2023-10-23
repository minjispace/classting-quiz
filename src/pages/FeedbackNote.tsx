import { Link } from "react-router-dom";
import { convertTimestampToDate } from "../utils/formatTime";
import { getDataFromLocalStorage } from "../utils/localStorage.quizResult";

const FeedbackNote = () => {
  // 로컬 스토리지에서 데이터를 가져오기
  const wrongAnswerData = getDataFromLocalStorage();

  return (
    <div>
      <h2>오답노트</h2>
      {!wrongAnswerData && <div>현재 정리된 오답 노트가 없습니다.</div>}

      {wrongAnswerData?.map((item) => {
        const { endTime, wrongResult, startTime, wrong } = item;

        // 오답노트 리스트가 없다면 return
        if (wrongResult.length === 0 || wrong === 0) return;

        return (
          <>
            <Link key={endTime} to={`/feed-back/${startTime}`}>
              <div>
                <button>
                  {convertTimestampToDate(endTime)} 오답 노트 보러가기
                </button>
              </div>
            </Link>
          </>
        );
      })}
      <Link to="/">
        <button>다른 문제 풀러가기</button>
      </Link>
    </div>
  );
};

export default FeedbackNote;
