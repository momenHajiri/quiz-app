export default function NextButton({ dispatch, answer, numQuestions, index }) {
  if (answer === null) return null;

  const isLastQuestion = index + 1 === numQuestions;

  return isLastQuestion ? (
    ""
  ) : (
    <button className="btn" onClick={() => dispatch({ type: "nextQuestion" })}>
      Next
    </button>
  );
}
