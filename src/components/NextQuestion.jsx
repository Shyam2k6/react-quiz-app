function NextQuestion({ index, dispatch, answer, numQuestions, points }) {
  if (answer === null) return null;

  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion", payload: points })}
      >
        Next
      </button>
    );
  }

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "finish", payload: points })}
    >
      Finish
    </button>
  );
}

export default NextQuestion;
