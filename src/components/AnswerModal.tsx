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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 모달 배경 */}
      <div className="fixed inset-0 bg-black opacity-90 z-40" />

      {/* 모달 내용 */}
      <div className="bg-white rounded-lg shadow-lg p-4 w-80 z-50 relative">
        <div className="text-xl text-center font-semibold mb-4">{content}.</div>
        <button
          className="block w-full py-2 text-white bg-green rounded-lg hover:opacity-80"
          onClick={onNext}
        >
          {isLastQuiz ? "결과 보기" : "다음 문제"}
        </button>
      </div>
    </div>
  );
};

export default AnswerModal;
