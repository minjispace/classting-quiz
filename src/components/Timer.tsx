import { useTimer } from "../hooks/useTimer";

const Timer = () => {
  const { minutes, seconds } = useTimer();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-blue-500 w-40 rounded-lg p-3 text-white text-center">
        <h3 className="text-sm font-medium">소요 시간</h3>
        <h1 className="text-2xl font-bold">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      </div>
    </div>
  );
};

export default Timer;
