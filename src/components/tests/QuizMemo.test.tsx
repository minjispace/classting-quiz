import {
  render,
  fireEvent,
  screen,
} from "../../test-utils/testing-library-utils";
import { QuizMemo } from "..";
QuizMemo;

// Mocking localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

beforeAll(() => {
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
});

beforeEach(() => {
  // Clear localStorage before each test
  localStorage.clear();
});

describe("QuizMemo Component Test", () => {
  // renders correctly
  it("renders correctly", () => {
    render(
      <QuizMemo
        category="Sample Category"
        correctAnswer="Correct Answer"
        question="Sample Question"
        id="1"
        feedbackId={123}
      />,
    );

    // Check if the component renders
    const memoTextArea = screen.getByPlaceholderText("메모를 입력하세요");
    expect(memoTextArea).toBeInTheDocument();
  });

  // add memo localStorage
  it("adds memo to localStorage", () => {
    render(
      <QuizMemo
        category="Sample Category"
        correctAnswer="Correct Answer"
        question="Sample Question"
        id="1"
        feedbackId={123}
      />,
    );

    const memoTextArea = screen.getByPlaceholderText("메모를 입력하세요");
    const addButton = screen.getByText("메모하기");

    fireEvent.change(memoTextArea, { target: { value: "This is a memo." } });
    fireEvent.click(addButton);

    // Check if memo is saved in localStorage
    const savedData = localStorage.getItem("feedbackMemo");
    expect(savedData).not.toBeNull();

    // Parse and check the saved data
    const memoList = JSON.parse(savedData!);
    expect(memoList).toEqual([
      { text: "This is a memo.", id: "1", feedbackId: 123 },
    ]);
  });
});
