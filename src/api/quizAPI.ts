import axios from "axios";
import { QuizInfoType } from "../types/quiz.type";

const BASE_URL = "https://opentdb.com/api.php";

const getQuizData = async (quiz: QuizInfoType) => {
  const { amount, category, difficulty } = quiz;

  const params: Record<string, any> = {
    amount,
    type: "multiple",
  };

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
