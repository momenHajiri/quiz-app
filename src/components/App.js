import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishingScreen from "./FinishingScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  time: 10,
};

function reducer(state, action) {
  const question = state.questions.at(state.index);
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", time: state.questions.length * 30 };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
      };
    case "restart":
      return {
        // ...state,
        // index: 0,
        // answer: null,
        // points: 0,
        // status: "active",
        ...initialState,
        status: "active",
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Unknown action");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, time } = state;
  const numQuestions = questions.length;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  // save the highestScore
  const highestScore = Number(localStorage.getItem("highestScore")) || 0;
  const newHighest = points > highestScore ? points : highestScore;
  localStorage.setItem("highestScore", newHighest);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  console.log(questions);
  // console.log(status);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "active" && (
          <Progress
            points={points}
            totalPoints={totalPoints}
            questions={questions}
            index={index}
          />
        )}
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "error" && <Error />}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
        {status === "finish" && (
          <FinishingScreen
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
            highestScore={highestScore}
          />
        )}
        {status === "active" && (
          <Footer>
            <Timer dispatch={dispatch} time={time} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            />
          </Footer>
        )}
      </Main>
    </div>
  );
}

export default App;
