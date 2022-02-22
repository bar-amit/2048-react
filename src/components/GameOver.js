import "./GameOver.css";

function GameOver({ reset, isOpen }) {
  return (
    <div className={`game-over ${isOpen ? "game-over_visible" : ""}`}>
      <h2 className="game-over__message">Oh no! You lost :(</h2>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </div>
  );
}

export default GameOver;
