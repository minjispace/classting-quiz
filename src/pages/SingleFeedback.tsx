import { Link, useLocation } from "react-router-dom";
import QuizMemo from "../components/QuizMemo";
import RedirectHome from "../components/RedirectHome";
import { getDataFromLocalStorage } from "../utils/localStorage.quizResult";

const SingleFeedback = () => {
  // get feedback ID
  const { pathname } = useLocation();
  const regex = /\/feed-back\/(\d+)/;
  const match = pathname.match(regex);
  const feedbackId = match ? Number(match[1]) : null;

  // 해당되는 아이디가 없으면 redirect home으로
  if (!feedbackId) {
    return <RedirectHome />;
  }

  // 해당되는 feedbackId로 localstroage data 가져오기
  const data = getDataFromLocalStorage()?.find(
    (item) => item.startTime === feedbackId,
  );

  return (
    <div>
      <h3>문제 카테고리 : {data?.category}</h3>
      <hr />

      <div>
        <div>
          {data?.wrongResult?.map((item) => (
            <QuizMemo key={item.id} {...item} feedbackId={feedbackId} />
          ))}
        </div>
      </div>

      <Link to="/">
        <button>다른 문제 풀기</button>
      </Link>
    </div>
  );
};

export default SingleFeedback;
