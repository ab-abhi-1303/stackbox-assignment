import React from "react";

function Square({ value, onClick, isWinner }) {
  return (
    <div className={`square ${isWinner ? "winner" : ""}`} onClick={onClick}>
      {value}
    </div>
  );
}

export default Square;
