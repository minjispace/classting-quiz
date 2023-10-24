import { getSingleDataFromLocalStorage, getAllDataFromLocalStorage } from "..";

describe("getSingleDataFromLocalStorage function", () => {
  it("should return single data from localStorage when it exists", () => {
    // 가짜 데이터 생성
    const fakeData = [
      {
        text: "Sample Text 1",
        id: "1",
        feedbackId: 1001,
      },
      {
        text: "Sample Text 2",
        id: "2",
        feedbackId: 1002,
      },
    ];

    // localStorage에 가짜 데이터 설정
    localStorage.setItem("feedbackMemo", JSON.stringify(fakeData));

    // 데이터 가져오기
    const result = getSingleDataFromLocalStorage("1", 1001);

    // 예상 결과와 일치하는지 확인
    expect(result).toBe("Sample Text 1");
  });

  it("should return null when no single data in localStorage", () => {
    // localStorage 초기화
    localStorage.clear();

    // 데이터 가져오기
    const result = getSingleDataFromLocalStorage("3", 1003);

    // 가져온 데이터가 null인지 확인
    expect(result).toBeNull();
  });
});

describe("getAllDataFromLocalStorage function", () => {
  it("should return all data from localStorage when it exists", () => {
    // 가짜 데이터 생성
    const fakeData = [
      {
        text: "Sample Text 1",
        id: "1",
        feedbackId: 1001,
      },
      {
        text: "Sample Text 2",
        id: "2",
        feedbackId: 1002,
      },
    ];

    // localStorage에 가짜 데이터 설정
    localStorage.setItem("feedbackMemo", JSON.stringify(fakeData));

    // 데이터 가져오기
    const result = getAllDataFromLocalStorage();

    // 예상 결과와 일치하는지 확인
    expect(result).toEqual(fakeData);
  });

  it("should return null when no data in localStorage", () => {
    // localStorage 초기화
    localStorage.clear();

    // 데이터 가져오기
    const result = getAllDataFromLocalStorage();

    // 가져온 데이터가 null인지 확인
    expect(result).toBeNull();
  });
});
