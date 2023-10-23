import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SetupForm from "./pages/SetupForm";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import FeedbackNote from "./pages/FeedbackNote";
import SingleFeedback from "./pages/SingleFeedback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SetupForm />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/feed-back" element={<FeedbackNote />} />
        <Route path="/feed-back/:id" element={<SingleFeedback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
