import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { QuizDataType, correctListType } from "../types/quiz.type";
import Redirect from "../components/Redirect";
import { useQuizContext } from "../context/quizContext";
import { formatTime } from "../utils/formatTime";
import { useWrongAnswerContext } from "../context/\bwrongAnswerContext";

const Quiz = () => {
  const navigate = useNavigate();

  // quizContext
  const { quizResult, endQuizTime, updateAnswerCounts } = useQuizContext();
  const { addWrongAnswer } = useWrongAnswerContext();

  // state
  const [index, setIndex] = useState<number>(0);
  const [isCorrect, setIsCorrect] =
    useState<correctListType>("정답을 클릭 해주세요");
  const [isNextOn, setIsNextOn] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [clickedIndex, setClickedIndex] = useState(-1);

  // get quiz cached data from react-query
  const cache = useQueryClient();
  const data = cache.getQueryData(["quizData"]) as QuizDataType[];

  // quiz 푸는 중간에 페이지가 새로고침되면 다시 홈으로
  if (!data) {
    return <Redirect />;
  }

  const { question, incorrect_answers, correct_answer, category } = data[index];

  // checkAnswer
  const checkAnswer = (answer: string, index: number) => {
    // 이미 클릭한 버튼은 무시
    if (clickedIndex === index) {
      return;
    }

    // 클릭한 버튼의 인덱스 업데이트
    setClickedIndex(index);

    if (correct_answer === answer) {
      setIsCorrect("정답입니다");
    } else {
      setIsCorrect("오답입니다");
    }
    setIsNextOn(true);
  };

  // nextQuestion
  const nextQuestion = () => {
    // 문제가 끝나면 시간종료 & result 창으로
    if (index === data.length - 1) {
      navigate("/result");
      setClickedIndex(-1);
      endQuizTime();
    }

    // 정답 여부에 따라 정답, 오답 갯수 업데이트
    if (isCorrect === "정답입니다") {
      updateAnswerCounts(true);
    } else if (isCorrect === "오답입니다") {
      updateAnswerCounts(false);
      addWrongAnswer(question, correct_answer, category);
    }

    // index 하나씩 증가
    setIndex((oldIndex) => {
      return oldIndex + 1;
    });
    setIsNextOn(false);
    setClickedIndex(-1);
    setIsCorrect("정답을 클릭 해주세요");
  };

  // quizTime setting
  useEffect(() => {
    if (quizResult.startTime !== null) {
      const interval = setInterval(() => {
        const now = Date.now();

        const elapsed = quizResult.startTime ? now - quizResult.startTime : 0;
        setTimer(elapsed);
      }, 1000); // 1초마다 업데이트 (1000ms)

      // 컴포넌트 언마운트 시 clearInterval 호출
      return () => clearInterval(interval);
    }
  }, [quizResult.startTime]);

  // 문제를 불러올 때만 섞기
  useEffect(() => {
    if (data) {
      const randomizedAnswers = [...incorrect_answers, correct_answer];

      // 문제의 정답 위치를 무작위로 바꿈
      const randomIndex = Math.floor(Math.random() * randomizedAnswers.length);
      [
        randomizedAnswers[randomIndex],
        randomizedAnswers[randomizedAnswers.length - 1],
      ] = [
        randomizedAnswers[randomizedAnswers.length - 1],
        randomizedAnswers[randomIndex],
      ]; // 배열 끝과 무작위 위치를 바꿔 정답 위치를 무작위로 만듦

      // answers 상태를 설정
      setAnswers(randomizedAnswers);
    }
  }, [data, index]);

  return (
    <main>
      <section>
        <h2>시간 : {formatTime(timer)}</h2>
        <h3>문제 {index + 1}번</h3>
        <h3>문제 카테고리 : {category}</h3>
        <article>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div>
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  style={{
                    backgroundColor: clickedIndex === index ? "grey" : "",
                  }}
                  onClick={() => checkAnswer(answer, index)}
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
