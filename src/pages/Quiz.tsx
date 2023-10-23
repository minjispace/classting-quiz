import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { QuizDataType, WrongAnswerListType } from "../types/quiz.type";
import { useQuizContext } from "../context/quizContext";
import { generateUniqueId } from "../utils";
import { AnswerModal, RedirectHome, Timer } from "../components";

type QuizProgressInfoType = {
  correctAnswers: number;
  wrongAnswers: number;
  wrongAnswersList: WrongAnswerListType[];
};

const Quiz = () => {
  const navigate = useNavigate();
  const { quizStartTime, quizInfo } = useQuizContext();

  // 현재 풀고 있는 문제 번호 state
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

  // quiz progress 정보 state
  const [quizProgressInfo, setQuizProgressInfo] =
    useState<QuizProgressInfoType>({
      correctAnswers: 0,
      wrongAnswers: 0,
      wrongAnswersList: [],
    });

  // 답 체크한 state
  const [answerSelected, setAnswerSelected] = useState({
    state: false,
    answer: "",
    index: -1,
  });

  // answer check modal state
  const [isAnswerCheckModal, setIsAnswerCheckModal] = useState({
    isOpen: false,
    content: "",
  });

  // 4지선다 answerList (오답 3개, 정답 1개)
  const [answersList, setAnswersList] = useState<string[]>([]);

  // get quiz cached data from react-query ----------------------------------------
  const cache = useQueryClient();
  const data = cache.getQueryData(["quizData"]) as QuizDataType[];

  // quiz 푸는 중간에 페이지가 새로고침되면 다시 홈으로
  if (!data) {
    return <RedirectHome />;
  }

  // 현재문제 destructuring
  const { question, incorrect_answers, correct_answer, category } =
    data[currentQuizIndex];

  // 내가 선택한 정답 상태 셋팅
  const updateSelectedAnswerState = (answer: string, index: number) => {
    setAnswerSelected({
      state: true,
      answer,
      index,
    });
  };

  // set wrongAnswerList in localStorage -------------------------
  const setWrongAnswerLocalStroage = () => {
    // newWrongResultList define
    const newWrongResultList = {
      category: quizInfo.category,
      startTime: quizStartTime,
      endTime: Date.now(),
      correct: quizProgressInfo.correctAnswers,
      wrong: quizProgressInfo.wrongAnswers,
      wrongResult: quizProgressInfo.wrongAnswersList,
    };

    // localStorage에 저장
    const existingDataJSON = localStorage.getItem("quizResults");
    let existingData = existingDataJSON ? JSON.parse(existingDataJSON) : [];

    existingData.push(newWrongResultList);
    localStorage.setItem("quizResults", JSON.stringify(existingData));
  };

  // index 하나씩 증가해서 다음 문제로 넘기는 함수
  const passToNextQuestion = () => {
    setCurrentQuizIndex((oldIndex) => {
      return oldIndex + 1;
    });
  };

  // answer선택 초기화 작업
  const initializeSetAnswerState = () => {
    setAnswerSelected((prevState) => ({
      ...prevState,
      state: false,
      answer: "",
      index: -1,
    }));
  };

  // nextQuestion
  const nextQuestion = () => {
    /**
     * 마지막 문제가 종료되면,
     * 오답문제 localstorage에 저장하고,
     * result pages로 보내기
     */
    if (currentQuizIndex === data.length - 1) {
      setWrongAnswerLocalStroage();
      navigate("/result");
      return;
    }

    /**
     * 마지막 문제가 아니면
     * 다음 문제로 넘기고
     * 상태들 초기화 작업
     * 모달 닫기
     */
    passToNextQuestion();
    initializeSetAnswerState();
    closeModal();
  };

  // 정답 수 올리기 -------------------------------------------------------
  const increaseCorrectAnswers = () => {
    setQuizProgressInfo((prev) => {
      return {
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
      };
    });
  };

  // 오답수 올리기 & 오답리스트에 넣기
  const increaseWrongAnswers = () => {
    setQuizProgressInfo((prev) => {
      return {
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
        wrongAnswersList: [
          ...prev.wrongAnswersList,
          {
            category,
            correctAnswer: correct_answer,
            question,
            id: generateUniqueId(),
          },
        ],
      };
    });
  };

  // 정답 여부에 따라 정답, 오답 갯수 업데이트
  const handleQuizAnswerCount = () => {
    // 정답일 때 정답 수 올리기
    if (correct_answer === answerSelected.answer) {
      increaseCorrectAnswers();

      // 오답일 떄, 오답 수 올리기
    } else {
      increaseWrongAnswers();
    }
  };

  // open modal -------------------------------------------------------
  const openModal = () => {
    handleQuizAnswerCount();
    setIsAnswerCheckModal({
      isOpen: true,
      content:
        correct_answer === answerSelected.answer ? "정답입니다" : "오답입니다",
    });
  };

  // closeModal
  const closeModal = () => {
    setIsAnswerCheckModal({
      isOpen: false,
      content: "",
    });
  };

  // 문제 바뀔 때마다 4지선다 섞기 작업
  useEffect(() => {
    if (!data) return;

    const randomizedAnswers = [...incorrect_answers, correct_answer];
    const randomIndex = Math.floor(Math.random() * randomizedAnswers.length);

    // 배열의 요소 위치 바꾸기
    [
      randomizedAnswers[randomIndex],
      randomizedAnswers[randomizedAnswers.length - 1],
    ] = [
      randomizedAnswers[randomizedAnswers.length - 1],
      randomizedAnswers[randomIndex],
    ];

    setAnswersList(randomizedAnswers);
  }, [data, currentQuizIndex]);

  return (
    <main>
      {isAnswerCheckModal.isOpen && (
        <AnswerModal
          isOpen={isAnswerCheckModal.isOpen}
          content={isAnswerCheckModal.content}
          onNext={nextQuestion}
          isLastQuiz={currentQuizIndex === data.length - 1}
        />
      )}
      <section>
        <Timer />
        <hr />

        <h4>총 문제 수 : {quizInfo.amount}</h4>
        <h5>문제 난이도 : {quizInfo.difficulty}</h5>
        <h5>문제 전체 카테고리 : {quizInfo.category}</h5>
        <hr />

        <h3>문제 카테고리 : {category}</h3>
        <h3>문제 {currentQuizIndex + 1}번</h3>
        <hr />

        <article>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div>
            {answersList.map((answer, index) => {
              return (
                <button
                  key={index}
                  style={{
                    backgroundColor:
                      answerSelected.index === index ? "grey" : "",
                  }}
                  onClick={() => updateSelectedAnswerState(answer, index)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              );
            })}
          </div>
        </article>
        {answerSelected.state && <button onClick={openModal}>정답 확인</button>}
      </section>
    </main>
  );
};

export default Quiz;
