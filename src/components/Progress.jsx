import React from "react";

function Progress({ numQuestions, index, points, maxPoints, answer }) {
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question{" "}
        <strong>
          {index + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points}/{maxPoints}
        </strong>
      </p>
    </div>
  );
}

export default Progress;
