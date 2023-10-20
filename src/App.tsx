import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SetupForm from "./components/SetupForm";
import Quiz from "./components/Quiz";
import QuizResult from "./components/QuizResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SetupForm />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<QuizResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
