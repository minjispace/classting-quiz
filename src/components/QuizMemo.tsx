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
    <div>
      <div key={question}>
        <div>
          <div>카테고리 : {category}</div>
          <div>문제 : {question}</div>
          <div>답 : {correctAnswer}</div>
        </div>
      </div>
      <br />

      <textarea
        placeholder="Write your memo here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAddMemo}>Add Memo</button>
      <hr />
    </div>
  );
};

export default QuizMemo;
