import { ChangeEvent, FormEvent, useState } from "react";
import {
  amountOptions,
  categoryOptions,
  difficultyOptions,
  typeOptions,
} from "../utils/dataOption";
import { useQuery, useQueryClient } from "react-query";
import { getQuizData } from "../api/quizAPi";

export type QuizType = {
  amount: number;
  category: string;
  difficulty: string;
  type: string;
};

const SetupForm = () => {
  const [quiz, setQuiz] = useState<QuizType>({
    amount: 1,
    category: "any",
    difficulty: "any",
    type: "any",
  });
  // Access the client
  const queryClient = useQueryClient();

  // SetupForm 컴포넌트 내에서 사용
  const { data, isLoading, isError, error } = useQuery(
    "quizData",
    () => getQuizData(quiz),
    {
      enabled: false,
    },
  );

  // handleChange
  const handleChange = (e: ChangeEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setQuiz((prev) => ({ ...prev, [name]: value }));
  };

  // handleSubmit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // getQuizData api호출
    queryClient.prefetchQuery("quizData", () => getQuizData(quiz));
  };

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
