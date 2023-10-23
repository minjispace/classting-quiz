import { useTimer } from "../hooks/useTimer";

const Timer = () => {
  const { minutes, seconds } = useTimer();
  return (
    <div className="bg-orange-500 w-40">
      <h3>타이머</h3>
      <h1 className="bg-yellow-400">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </h1>
    </div>
  );
};

export default Timer;
