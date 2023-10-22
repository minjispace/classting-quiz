// 시간 포맷팅 함수 (예: 밀리초를 분:초 형식으로 변환)
export const formatTime = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}분${remainingSeconds}초`;
};

export function convertTimestampToDate(timestamp: number) {
  return new Date(timestamp).toLocaleString();
}
