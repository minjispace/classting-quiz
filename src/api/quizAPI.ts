import axios from "axios";
import { QuizType } from "../pages/SetupForm";

const BASE_URL = "https://opentdb.com/api.php";

const getQuizData = async (quiz: QuizType) => {
  const { amount, category, difficulty, type } = quiz;

  const params: Record<string, any> = {
    amount,
  };
  // type이 any가 아닐경우만 params 추가
  if (type !== "any") {
    params["type"] = type;
  }

  // category any가 아닐경우만 params 추가
  if (category !== "any") {
    params["category"] = category;
  }

  // difficulty any가 아닐경우만 params 추가
  if (difficulty !== "any") {
    params["difficulty"] = difficulty;
  }

  const response = await axios.get(BASE_URL, {
    params,
  });

  return response.data.results;
};

export { getQuizData };
