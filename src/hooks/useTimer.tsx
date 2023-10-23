import { useState, useEffect } from "react";

const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const timerStop = () => setIsRunning(false);
  const timerStart = () => setIsRunning(true);

  useEffect(() => {
    let interval = 0;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds < 59) {
          setSeconds(seconds + 1);
        } else {
          setSeconds(0);
          if (minutes < 59) {
            setMinutes(minutes + 1);
          } else {
            setMinutes(0);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, minutes]);

  return { minutes, seconds, isRunning, timerStop, timerStart };
};

export { useTimer };
