import { useEffect, useState } from "react";
import Square from "./components/Square/Square";
import confetti from "canvas-confetti";
import "./App.css";

// Turnos
const turns = {
  X: "X",
  O: "O",
};

//Combinaciones ganadoras
const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(turns.X);
  //winner = null: no hay ganador , false : hay empate.
  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    // Chequear todas las combinaciones para ver si hay un ganador sea X u O
    for (const combination of winnerCombos) {
      const [a, b, c] = combination;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    // Si no hay ganador devolvemos la función con un null
    return null;
  };

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const updateBoard = (index) => {
    // no actualizamos esta posición si ya tiene algo osea !== a null y devolvemos la función.
    if (board[index] || winner) return;
    // Actualizar tablero mediante copia
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    //Revisar si hay un ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confettiFunct();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
    // Cambiar el turno si no hay un ganador
    const newTurn = turn === turns.X ? turns.O : turns.X;
    if (!checkWinner(newBoard)) setTurn(newTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
  };

  const confettiFunct = () => {
    // launch a few confetti from the left edge
    confetti({
      startVelocity: 80,
      particleCount: 200,
      angle: 60,
      spread: 75,
      origin: { x: 0, y: 0.9 },
    });
    // and launch a few from the right edge
    confetti({
      startVelocity: 80,

      particleCount: 200,
      angle: 120,
      spread: 75,
      origin: { x: 1, y: 0.9 },
    });
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}> Reset del juego</button>
      <section className="game">
        {board.map((_, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
          </Square>
        ))}
      </section>

      <section className="turn">
        <Square isSelected={turn === turns.X}>{turns.X}</Square>
        <Square isSelected={turn === turns.O}>{turns.O}</Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <header>
              <h2>{winner === false ? "Empate" : "Gano:"}</h2>

              <div className={`win ${winner !== false && "real__win"}`}>
                {winner && <Square>{winner}</Square>}
              </div>
            </header>

            <footer className="reset__game__container">
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
