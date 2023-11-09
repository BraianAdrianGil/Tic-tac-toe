import Square from "./Square/Square";

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : "Gano:";
  const winnerClassName = `win ${winner !== false && "real__win"}`;

  return (
    <section className="winner">
      <div className="text">
        <header>
          <h2>{winnerText}</h2>

          <div className={winnerClassName}>
            {winner && <Square>{winner}</Square>}
          </div>
        </header>

        <footer className="reset__game__container">
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
