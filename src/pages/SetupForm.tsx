import { ChangeEvent, FormEvent, useState } from "react";
import { useQuery } from "react-query";
import { getQuizData } from "../api/quizAPI";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/quizContext";
import { QuizInfoType } from "../types/quiz.type";
import { Loading } from "../components";
import { amountOptions, categoryOptions, difficultyOptions } from "../utils";

const SetupForm = () => {
  const { startQuiz } = useQuizContext();
  const navigate = useNavigate();

  // state define
  const [quiz, setQuiz] = useState<QuizInfoType>({
    amount: 3,
    category: "any",
    difficulty: "any",
  });

  // SetupForm 컴포넌트 내에서 사용
  const { isLoading, refetch } = useQuery("quizData", () => getQuizData(quiz), {
    enabled: false,
    onSuccess: (data) => {
      if (data) {
        navigate("quiz");
      }
    },
  });

  // handleChange
  const handleChange = (e: ChangeEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setQuiz((prev) => ({ ...prev, [name]: value }));
  };

  // handleSubmit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    startQuiz(quiz);
    refetch();
  };

  // if isLoading
  if (isLoading) return <Loading />;

  return (
    <section className="flex justify-center items-center text-center">
      <form className="max-w-md">
        <div className="font-bold text-4xl mt-28 text-center">
          클래스밍 퀴즈 세팅{" "}
        </div>

        {/* amount */}
        <div className="flex items-center mt-10">
          <label
            htmlFor="amount"
            className="block mb-2 text-lg font-medium mr-2 w-32"
          >
            문제수 :
          </label>
          <select
            name="amount"
            id="amount"
            value={quiz.amount}
            onChange={handleChange}
            className="bg-white border border-green text-sm rounded-lg block w-full p-2.5 "
          >
            {amountOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* category */}
        <div className="flex items-center mt-5">
          <label
            htmlFor="category"
            className="block mb-2 text-lg font-medium mr-2 w-32"
          >
            카테고리 :
          </label>
          <select
            name="category"
            id="category"
            value={quiz.category}
            onChange={handleChange}
            className="bg-white border border-green text-sm rounded-lg block w-full p-2.5 "
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* difficulty */}
        <div className="flex items-center mt-5">
          <label
            htmlFor="difficulty"
            className="block mb-2 text-lg font-medium mr-2 w-32"
          >
            난이도 :
          </label>
          <select
            name="difficulty"
            id="difficulty"
            value={quiz.difficulty}
            onChange={handleChange}
            className="bg-white border border-green text-sm rounded-lg block w-full p-2.5 "
          >
            {difficultyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="mt-8 text-white bg-green hover:opacity-70 transition-all font-medium rounded-lg text-lg px-5 py-2.5"
          type="submit"
          onClick={handleSubmit}
        >
          퀴즈 풀기 시작
        </button>
      </form>
    </section>
  );
};

export default SetupForm;
