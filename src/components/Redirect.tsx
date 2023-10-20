import { Link } from "react-router-dom";

const Redirect = () => {
  return (
    <>
      <div>퀴즈가 중간에 종료되었습니다. </div>
      <Link to="/">홈으로 돌아가기</Link>
    </>
  );
};

export default Redirect;
