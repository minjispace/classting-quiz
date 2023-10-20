import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { QuizDataType, correctListType } from "../types/quiz.type";
import Redirect from "../components/Redirect";

const Quiz = () => {
  const navigate = useNavigate();

  // state
  const [index, setIndex] = useState<number>(0);
  const [isCorrect, setIsCorrect] =
    useState<correctListType>("정답을 클릭 해주세요");
  const [isNextOn, setIsNextOn] = useState(false);

  // get quiz cached data from react-query
  const cache = useQueryClient();
  const data = cache.getQueryData(["quizData"]) as QuizDataType[];

  // quiz 푸는 중간에 페이지가 새로고침되면 다시 홈으로
  if (!data) {
    return <Redirect />;
  }

  const { question, incorrect_answers, correct_answer, category } = data[index];

  // checkAnswer
  const checkAnswer = (answer: string) => {
    if (correct_answer === answer) {
      setIsCorrect("정답입니다");
    } else {
      setIsCorrect("오답입니다");
    }
    setIsNextOn(true);
  };

  // nextQuestion
  const nextQuestion = () => {
    // 문제가 끝나면 result 창으로
    if (index === data.length - 1) {
      navigate("/result");
    }

    // index 하나씩 증가
    setIndex((oldIndex) => {
      return oldIndex + 1;
    });
  };

  // create answersList
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);

  if (tempIndex === 3 || tempIndex === 2) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }

  return (
    <main>
      <section>
        <h3>문제 {index + 1}번</h3>
        <h3>문제 카테고리 : {category}</h3>
        <article>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  onClick={() => checkAnswer(answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        <div>{isCorrect}</div>
        {isNextOn && <button onClick={nextQuestion}>next question</button>}
      </section>
    </main>
  );
};

export default Quiz;
