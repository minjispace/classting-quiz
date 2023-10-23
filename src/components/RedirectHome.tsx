import { Link } from "react-router-dom";

const RedirectHome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="text-2xl font-bold mb-4">퀴즈가 종료 되었습니다.</div>
      <Link
        to="/"
        className="bg-green hover:opacity-80 text-white font-semibold rounded-lg px-4 py-2"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default RedirectHome;
