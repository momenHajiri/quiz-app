import { useEffect } from "react";

export default function Timer({ dispatch, time }) {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  useEffect(
    function () {
      const id = setInterval(() => dispatch({ type: "tick" }), 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min}:{sec}
    </div>
  );
}
