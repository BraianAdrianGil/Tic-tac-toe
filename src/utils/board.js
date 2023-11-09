import { winnerCombos } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
