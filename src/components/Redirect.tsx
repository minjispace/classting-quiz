import { Link } from "react-router-dom";

const Redirect = () => {
  return (
    <>
      <div>퀴즈가 종료 되었습니다. </div>
      <Link to="/">홈으로 돌아가기</Link>
    </>
  );
};

export default Redirect;
