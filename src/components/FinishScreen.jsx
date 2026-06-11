import React from "react";

function FinishScreen({ points, maxPoints, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <div className="result">
        You scored {points} out of {maxPoints} ({Math.ceil(percentage)}%)
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
