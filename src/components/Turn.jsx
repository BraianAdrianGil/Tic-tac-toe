import Square from "./Square/Square";
import { turns } from "../constants";

const Turn = ({ turn }) => {
  return (
    <section className="turn">
      <Square isSelected={turn === turns.X}>{turns.X}</Square>
      <Square isSelected={turn === turns.O}>{turns.O}</Square>
    </section>
  );
};

export default Turn;
