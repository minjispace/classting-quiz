import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SetupForm from "./pages/SetupForm";
import Quiz from "./pages/Quiz";
import QuizResult from "./pages/QuizResult";

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
