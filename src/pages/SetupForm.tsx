import { ChangeEvent, FormEvent, useState } from "react";
import {
  amountOptions,
  categoryOptions,
  difficultyOptions,
  typeOptions,
} from "../utils/dataOption";
import { useQuery } from "react-query";
import { getQuizData } from "../api/quizAPI";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

export type QuizType = {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
};

const SetupForm = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<QuizType>({
    amount: 1,
    category: "any",
    difficulty: "any",
    type: "any",
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
    refetch();
  };

  // if isLoading
  if (isLoading) return <Loading />;

  return (
    <section>
      <form>
        <h2>퀴즈 풀기 셋팅</h2>

        {/* amount */}
        <div>
          <label htmlFor="amount">개수 : </label>
          <select
            name="amount"
            id="amount"
            value={quiz.amount}
            onChange={handleChange}
          >
            {amountOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* category */}
        <div>
          <label htmlFor="category">카테고리 : </label>
          <select
            name="category"
            id="category"
            value={quiz.category}
            onChange={handleChange}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* difficulty */}
        <div>
          <label htmlFor="difficulty">난이도 : </label>
          <select
            name="difficulty"
            id="difficulty"
            value={quiz.difficulty}
            onChange={handleChange}
          >
            {difficultyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* type */}
        <div>
          <label htmlFor="type">타입 : </label>
          <select
            name="type"
            id="type"
            value={quiz.type}
            onChange={handleChange}
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" onClick={handleSubmit}>
          퀴즈 풀기 시작
        </button>
      </form>
    </section>
  );
};

export default SetupForm;