import { ChangeEvent, FormEvent, useState } from "react";

const SetupForm = () => {
  const [quiz, setQuiz] = useState({
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
          <input
            type="number"
            name="amount"
            id="amount"
            value={quiz.amount}
            onChange={handleChange}
            min={1}
            max={10}
          />
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
            <option value="any">Any</option>
            <option value="art">Art</option>
            <option value="animals">Animals</option>
            <option value="sports">Sports</option>
            <option value="history">History</option>
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
            <option value="any">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
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
            <option value="any">Any</option>
            <option value="multiple">multiple choice</option>
            <option value="boolean">true / false</option>
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
