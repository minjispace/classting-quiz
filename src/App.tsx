import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SetupForm from "./components/SetupForm";
import Quiz from "./components/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SetupForm />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
