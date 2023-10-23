import { FC, useState } from "react";
import {
  getAllDataFromLocalStorage,
  getSingleDataFromLocalStorage,
} from "../utils";

type QuizMemoProps = {
  category: string;
  correctAnswer: string;
  question: string;
  id: string;
  feedbackId: number;
};

type MemoType = {
  text: string;
  id: string;
  feedbackId: number;
};

const QuizMemo: FC<QuizMemoProps> = ({
  category,
  correctAnswer,
  question,
  id,
  feedbackId,
}) => {
  const [text, setText] = useState(
    getSingleDataFromLocalStorage(id, feedbackId) || "",
  );

  // 처음 메모 등록시키는 함수
  const createNewMemo = (data: MemoType[], memoList: MemoType) => {
    // 새로 추가하고
    let newMemoList = [...data, memoList];

    // localStorage에 저장
    localStorage.setItem("feedbackMemo", JSON.stringify(newMemoList));
  };

  // 이미 등록된 메모를 수정시키는 함수
  const updateMemo = (data: MemoType[]) => {
    // 있는 메모인지 찾고, text만 바꾸기
    let alreadyExistMemoList = data.map((item) => {
      if (item.id === id && item.feedbackId === feedbackId) {
        return {
          ...item,
          text,
        };
      }
      return item;
    });

    // localStorage에 저장
    localStorage.setItem("feedbackMemo", JSON.stringify(alreadyExistMemoList));
  };

  // add memo logic
  const handleAddMemo = () => {
    const memoList = {
      text,
      id,
      feedbackId,
    };

    // memo localStorage에서 꺼내오기
    const existingDataJSON = getAllDataFromLocalStorage();
    let existingData = existingDataJSON ? existingDataJSON : [];

    // 처음 메모 등록할 때
    if (!existingData.find((item) => item.id === id)) {
      createNewMemo(existingData, memoList);
    } else {
      // 이미 등록된 메모일 떄
      updateMemo(existingData);
    }
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4">
      <div className="mb-4">
        <div className="font-semibold text-lg pb-2">
          해당 문제 카테고리: {category}
        </div>
        <div className="text-xl font-bold pb-2">문제 : {question}</div>
        <div className="text-lg text-green font-bold">답 : {correctAnswer}</div>
      </div>

      {/* 메모 textarea */}

      <textarea
        className="border border-gray-300 rounded-md p-2 w-full md:w-3/4 lg:w-1/2 h-32"
        placeholder="메모를 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>
        <button
          className="bg-green hover:opacity-80 text-white font-semibold rounded-md px-4 py-2 mt-2"
          onClick={handleAddMemo}
        >
          메모하기
        </button>
      </div>
    </div>
  );
};

export default QuizMemo;
