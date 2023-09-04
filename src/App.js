import React, { useState } from "react";
import "./App.css";
import Square from "./Square";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handleSquareClick = (index) => {
    if (playerSymbol && !board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = playerSymbol;
      setBoard(newBoard);
      checkWinner(newBoard);
      makeComputerMove(newBoard);
    }
  };

  const findWinningSequence = (currentBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return combination;
      }
    }

    return []; 
  };

  const checkWinner = (currentBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        setWinner(currentBoard[a]);
        return;
      }
    }

    if (!currentBoard.includes(null)) {
      setWinner("Draw");
    }
  };

  const makeComputerMove = async (currentBoard) => {
    if (!playerSymbol || winner) return;

    const requestBody = [...currentBoard];

    try {
      const response = await fetch(
        "https://hiring-react-assignment.vercel.app/api/bot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (response.ok) {
        const computerMove = await response.json();
        console.log("Computer move:", computerMove);
        const newBoard = [...requestBody];
        newBoard[computerMove] = playerSymbol === "X" ? "O" : "X";
        setBoard(newBoard);
        checkWinner(newBoard);
      }
    } catch (error) {
      console.error("Error making computer move:", error);
    }
  };

  const winningSequence = findWinningSequence(board);

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="symbol-selection">
        {playerSymbol ? (
          <p>You are playing as: {playerSymbol}</p>
        ) : (
          <div>
            <p>Select your symbol:</p>
            <button onClick={() => setPlayerSymbol("X")}>X</button>
            <button onClick={() => setPlayerSymbol("O")}>O</button>
          </div>
        )}
      </div>
      <div className="board">
        {board.map((square, index) => (
          <Square
            key={index}
            value={square}
            isWinner={winningSequence.includes(index)}
            onClick={() => handleSquareClick(index)}
          />
        ))}
      </div>
      <div className="status">
        {winner ? (
          winner === "Draw" ? (
            <p>It's a Draw!</p>
          ) : (
            <p>{`${winner} wins!`}</p>
          )
        ) : (
          <p>Next player: {playerSymbol}</p>
        )}
      </div>
    </div>
  );
}

export default App;
