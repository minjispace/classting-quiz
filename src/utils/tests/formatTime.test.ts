import { convertTimestampToDate, formatTime } from "..";

describe("formatTime function", () => {
  // should format time correctly
  it("should format time correctly", () => {
    const timeInMilliseconds = 150000; // 2분 30초 (150초)
    const formattedTime = formatTime(timeInMilliseconds);

    // 예상 결과와 일치하는지 확인
    expect(formattedTime).toBe("2분30초");
  });
});

describe("convertTimestampToDate function", () => {
  // should convert timestamp to date correctly
  it("should convert timestamp to date correctly", () => {
    const timestamp = 1635057200000; // 예시 타임스탬프

    // 예상 결과와 일치하는지 확인
    const convertedDate = convertTimestampToDate(timestamp);
    const expectedDate = new Date(timestamp).toLocaleString();

    expect(convertedDate).toBe(expectedDate);
  });
});
