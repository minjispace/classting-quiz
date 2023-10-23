export function getSingleDataFromLocalStorage(id: string, feedbackId: number) {
  const storedData = localStorage.getItem("feedbackMemo");

  // date가 있을 경우 가져오기
  if (storedData) {
    const parsedData = JSON.parse(storedData) as {
      text: string;
      id: string;
      feedbackId: number;
    }[];
    const tempData = parsedData.find(
      (item) => item.id === id && item.feedbackId === feedbackId,
    );
    return tempData?.text;
  }
  // 데이터를 찾지 못한 경우 null 반환
  return null;
}

export function getAllDataFromLocalStorage() {
  const storedData = localStorage.getItem("feedbackMemo");

  // date가 있을 경우 가져오기
  if (storedData) {
    const parsedData = JSON.parse(storedData) as {
      text: string;
      id: string;
      feedbackId: number;
    }[];
    return parsedData;
  }
  // 데이터를 찾지 못한 경우 null 반환
  return null;
}
