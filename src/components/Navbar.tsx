import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="p-4 flex justify-between items-center bg-green">
      <Link className="flex items-center" to="/">
        <img className="w-12" src="logo.png" alt="classting" />
        <div className="ml-2 font-extrabold text-2xl text-white line tracking-wider">
          Classming
        </div>
      </Link>
      <div>
        <Link to="/">
          <button className="text-black bg-white hover:opacity-80 transition-all font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2  ">
            홈으로
          </button>
        </Link>
        <Link to="/feed-back">
          <button
            type="button"
            className=" text-white bg-black hover:opacity-80 transition-all font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2"
          >
            모든 오답 노트 보기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
