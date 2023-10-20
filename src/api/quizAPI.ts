import axios from "axios";
import { QuizType } from "../components/SetupForm";

const BASE_URL = "https://opentdb.com/api_config.php";

const getQuizData = async (quiz: QuizType) => {
  const { amount, category, difficulty, type } = quiz;
  const params = {
    amount,
    category,
    difficulty,
    type,
  };

  const response = await axios.get(BASE_URL, {
    params,
  });

  return response.data;
};

export { getQuizData };
