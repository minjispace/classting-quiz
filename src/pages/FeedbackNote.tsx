import { Link } from "react-router-dom";
import { convertTimestampToDate } from "../utils/formatTime";
import { useWrongAnswerContext } from "../context/\bwrongAnswerContext";

const FeedbackNote = () => {
  const { getWrongAnswers } = useWrongAnswerContext();

  const wrongAnswerData = getWrongAnswers();

  return (
    <div>
      <h2>오답노트</h2>
      {wrongAnswerData?.map((item, index) => {
        const { category, question, correctAnswer, date } = item;

        return (
          <ul style={{ backgroundColor: "gray" }} key={index}>
            <h3>문제 카테고리 : {category}</h3>
            <article>
              <h3>문제 : {question}</h3>
              <h2>정답 : {correctAnswer}</h2>
              <p>{convertTimestampToDate(date)}</p>
            </article>
          </ul>
        );
      })}
      <Link to="/">
        <button>다른 문제 풀러가기</button>
      </Link>
    </div>
  );
};

export default FeedbackNote;
