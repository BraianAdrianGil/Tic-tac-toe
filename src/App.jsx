import { useState } from "react";
import { turns } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./utils/board";
import { WinnerModal } from "./components/WinnerModal";
import { confettiFunct } from "./utils/confetiAnimation";
import Board from "./components/Board";
import "./App.css";
import Turn from "./components/Turn";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromLocaStorage = window.localStorage.getItem("turn");
    return turnFromLocaStorage ? JSON.parse(turnFromLocaStorage) : turns.X;
  });
  //winner = null: no hay ganador , false : hay empate.
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    // no actualizamos esta posición si ya tiene algo osea !== a null y devolvemos la función.
    if (board[index] || winner) return;
    // Actualizar tablero mediante copia
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Cambiar el turno si no hay un ganador
    const newTurn = turn === turns.X ? turns.O : turns.X;
    if (!checkWinnerFrom(newBoard)) setTurn(newTurn);
    //Guardamos partida en local storage
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", JSON.stringify(newTurn));
    //Revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confettiFunct();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      window.localStorage.removeItem("board");
      window.localStorage.removeItem("turn");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(turns.X);
    setWinner(null);
    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}> Reset del juego</button>
      <Board board={board} updateBoard={updateBoard} />
      <Turn turn={turn} />
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
