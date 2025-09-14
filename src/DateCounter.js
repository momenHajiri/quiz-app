// import { type } from "@testing-library/user-event/dist/type";
import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "setStep":
      return { ...state, step: action.payload };
    case "setCount":
      return { ...state, count: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
}

function DateCounter() {
  const [states, dispatch] = useReducer(reducer, initialState);
  const { count, step } = states;

  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
    // dispatch({ type: "dec", step });
    // مو لازم يكون
    dispatch({ type: "dec" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    // dispatch({ type: "define", payload: Number(e.target.value) });
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({
      type: "setStep",
      payload: Number(e.target.value),
    });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span> {step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

// export default function DateCounter() {
//   const [step, setStep] = useState(1);
//   const [count, setCount] = useState(0);

//   const date = new Date();
//   date.setDate(date.getDate() + count);

//   return (
//     <div className="counter">
//       <div>
//         <input
//           type="range"
//           min={0}
//           max={10}
//           value={step}
//           onChange={(e) => setStep(Number(e.target.value))}
//         ></input>
//         <span> {step}</span>
//       </div>
//       <div>
//         <button onClick={() => setCount((count) => count - step)}>-</button>
//         <input
//           value={count}
//           onChange={(e) => {
//             setCount(Number(e.target.value));
//           }}
//         />
//         <button onClick={() => setCount((count) => count + step)}>+</button>
//       </div>
//       <div> {date.toDateString()} </div>
//       <button>Reset</button>
//     </div>
//   );
// }
