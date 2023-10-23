import { Link, useLocation } from "react-router-dom";
import { getDataFromLocalStorage } from "../utils";
import { QuizMemo, RedirectHome } from "../components";

const SingleFeedback = () => {
  // get feedback ID
  const { pathname } = useLocation();
  const regex = /\/feed-back\/(\d+)/;
  const match = pathname.match(regex);
  const feedbackId = match ? Number(match[1]) : null;

  // 해당되는 아이디가 없으면 redirect home으로
  if (!feedbackId) {
    return <RedirectHome />;
  }

  // 해당되는 feedbackId로 localstroage data 가져오기
  const data = getDataFromLocalStorage()?.find(
    (item) => item.startTime === feedbackId,
  );

  return (
    <div className="text-center mt-10">
      <div className="text-2xl font-semibold mb-4">
        전체 퀴즈 문제 카테고리 : {data?.category}
      </div>
      {/* <hr className="border-t-2 border-gray-300 mb-6" /> */}

      <div className="flex flex-col items-center ">
        <div className="w-full md:w-3/4 lg:w-1/2">
          {data?.wrongResult?.map((item) => (
            <QuizMemo key={item.id} {...item} feedbackId={feedbackId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleFeedback;
