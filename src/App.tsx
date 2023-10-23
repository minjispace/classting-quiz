import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FeedbackNote, Quiz, Result, SetupForm, SingleFeedback } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
