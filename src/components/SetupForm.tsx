import { ChangeEvent, FormEvent, useState } from "react";
import {
  amountOptions,
  categoryOptions,
  difficultyOptions,
  typeOptions,
} from "../utils/dataOption";

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

  // handleChange
  const handleChange = (e: ChangeEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    setQuiz((prev) => ({ ...prev, [name]: value }));
  };

  // handleSubmit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
