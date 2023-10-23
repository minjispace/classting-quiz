type ModalType = {
  isOpen: boolean;
  content: string;
  onNext: () => void;
  isLastQuiz: boolean;
};

const AnswerModal = ({ isOpen, content, onNext, isLastQuiz }: ModalType) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        width: "90%",
        height: "50vh",
        backgroundColor: "blue",
        position: "fixed",
        left: 0,
        right: 0,
      }}
    >
      <div className="modal-content">
        <div>내용 : {content}</div>
        <button className="close-button" onClick={onNext}>
          {isLastQuiz ? "결과 보기" : "다음 문제"}
        </button>
      </div>
    </div>
  );
};

export default AnswerModal;
