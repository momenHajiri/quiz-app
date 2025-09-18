export default function Options({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          disabled={hasAnswered}
          key={index}
          className={`btn btn-option ${
            hasAnswered
              ? index === question.correctOption
                ? "correct disabled"
                : "wrong"
              : ""
          }`}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: index });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
