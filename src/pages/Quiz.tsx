import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { QuizDataType } from "../types/quiz.type";
import Redirect from "../components/Redirect";
import { useQuizContext } from "../context/quizContext";
import { formatTime } from "../utils/formatTime";
import Modal from "../components/Modal";

const Quiz = () => {
  const navigate = useNavigate();

  // quizContext
  const { quizResult, endQuizTime, updateAnswerCounts } = useQuizContext();

  // state
  const [index, setIndex] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [checked, setChecked] = useState({
    state: false,
    answer: "",
    index: -1,
  });
  const [modal, setModal] = useState({
    isOpen: false,
    content: "",
  });

  // get quiz cached data from react-query
  const cache = useQueryClient();
  const data = cache.getQueryData(["quizData"]) as QuizDataType[];

  // quiz 푸는 중간에 페이지가 새로고침되면 다시 홈으로
  if (!data) {
    return <Redirect />;
  }

  const { question, incorrect_answers, correct_answer, category } = data[index];

  // checked answer
  const checkedAnswer = (answer: string, index: number) => {
    setChecked((prevState) => ({
      ...prevState,
      state: true,
      answer,
      index,
    }));
  };

  // nextQuestion
  const nextQuestion = () => {
    // 문제가 끝나면 시간종료 & result 창으로
    if (index === data.length - 1) {
      navigate("/result");
      endQuizTime();
    }

    // 정답 여부에 따라 정답, 오답 갯수 업데이트
    if (correct_answer === checked.answer) {
      updateAnswerCounts(true);
    } else {
      updateAnswerCounts(false);
    }

    // index 하나씩 증가
    setIndex((oldIndex) => {
      return oldIndex + 1;
    });
    setChecked((prevState) => ({
      ...prevState,
      state: false,
      answer: "",
      index: -1,
    }));
    closeModal();
  };

  // open modal
  const openModal = (content: string) => {
    setModal({
      isOpen: true,
      content: content,
    });
  };

  // closeModal
  const closeModal = () => {
    setModal({
      isOpen: false,
      content: "",
    });
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
      {modal.isOpen && (
        <Modal
          isOpen={modal.isOpen}
          content={modal.content}
          onNext={nextQuestion}
        />
      )}
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
                    backgroundColor: checked.index === index ? "grey" : "",
                  }}
                  onClick={() => checkedAnswer(answer, index)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        {checked.state && (
          <button
            onClick={() =>
              openModal(
                correct_answer === checked.answer ? "정답입니다" : "오답입니다",
              )
            }
          >
            정답 확인
          </button>
        )}
      </section>
    </main>
  );
};

export default Quiz;
