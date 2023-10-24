import { QuizHistoryDataType, getDataFromLocalStorage } from "..";

// localStorage를 사용하기 전에 임시 스토리지를 설정하고 이후에 정리
describe("getDataFromLocalStorage function", () => {
  beforeAll(() => {
    const fakeData: QuizHistoryDataType = [
      {
        category: "Sample Category",
        startTime: 1635057200000,
        endTime: 1635057205000,
        correct: 8,
        wrong: 2,
        wrongResult: [
          {
            category: "Wrong Category",
            correctAnswer: "Correct Answer",
            question: "Sample Question",
            id: "1",
          },
        ],
      },
    ];
    localStorage.setItem("quizResults", JSON.stringify(fakeData));
  });

  afterAll(() => {
    localStorage.removeItem("quizResults");
  });

  // localStorage 데이터 가져오기
  it("should return data from localStorage when it exists", () => {
    const result = getDataFromLocalStorage();

    // 가져온 데이터가 예상과 일치하는지 확인
    expect(result).toEqual([
      {
        category: "Sample Category",
        startTime: 1635057200000,
        endTime: 1635057205000,
        correct: 8,
        wrong: 2,
        wrongResult: [
          {
            category: "Wrong Category",
            correctAnswer: "Correct Answer",
            question: "Sample Question",
            id: "1",
          },
        ],
      },
    ]);
  });

  // localStorage에서 데이터를 제거
  it("should return null when no data in localStorage", () => {
    localStorage.removeItem("quizResults");

    // 데이터 가져오기
    const result = getDataFromLocalStorage();

    // 가져온 데이터가 null인지 확인
    expect(result).toBeNull();
  });
});
