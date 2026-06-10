import React from "react";

function FinishScreen({ points, maxPoints }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <div className="result">
      You scored {points} out of {maxPoints} ({Math.ceil(percentage)}%)
    </div>
  );
}

export default FinishScreen;
