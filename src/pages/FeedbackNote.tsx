import { Link } from "react-router-dom";
import { convertTimestampToDate, getDataFromLocalStorage } from "../utils";

const FeedbackNote = () => {
  // 로컬 스토리지에서 데이터를 가져오기
  const wrongAnswerData = getDataFromLocalStorage();

  return (
    <div className="text-center mt-10">
      <h2 className="text-4xl font-bold mb-10">오답 노트</h2>
      {!wrongAnswerData && (
        <div className="text-2xl">현재 정리된 오답 노트가 없습니다.</div>
      )}

      {wrongAnswerData?.map((item) => {
        const { endTime, wrongResult, startTime, wrong } = item;

        // 오답노트 리스트가 없다면 return
        if (wrongResult.length === 0 || wrong === 0) return null;

        return (
          <div key={endTime} className="mb-4">
            <Link to={`/feed-back/${startTime}`}>
              <button className="hover:opacity-50 transition-opacity shadow-lg font-semibold rounded-lg px-4 py-2.5">
                {convertTimestampToDate(endTime)} 종료된 <br /> 오답 노트
                보러가기
              </button>
            </Link>
          </div>
        );
      })}
      <Link to="/">
        <button className="bg-green hover:opacity-80 text-white font-semibold rounded-lg px-4 py-2.5 mt-4">
          다른 문제 풀러가기
        </button>
      </Link>
    </div>
  );
};

export default FeedbackNote;
