export default function Progress({ points, questions, index, totalPoints }) {
  return (
    <header className="progress">
      <progress
        disabled
        min={0}
        max={questions.length}
        value={index}
      ></progress>
      <span>
        Qestions {index + 1}/{questions.length}
      </span>
      <span>
        Points {points}/{totalPoints}
      </span>
    </header>
  );
}
