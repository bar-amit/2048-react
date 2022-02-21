import { useEffect, useState } from "react";
import Game from "./utils/2048";
import "./App.css";

var game = new Game();

function App() {
  const [board, setBoard] = useState(game.board);
  const [status, setStatus] = useState(game.gameStatus);

  function play(e) {
    switch (e.key) {
      case "ArrowLeft":
      case "a":
      case "A":
        game.play("left");
        break;
      case "ArrowRight":
      case "d":
      case "D":
        game.play("right");
        break;
      case "ArrowUp":
      case "w":
      case "W":
        game.play("up");
        break;
      case "ArrowDown":
      case "s":
      case "S":
        game.play("down");
        break;
    }
    setBoard(game.board);
    setStatus(game.gameStatus);
  }

  function addKeyboardEvent() {
    document.addEventListener("keydown", play);
  }

  function removeKeyboardEvent() {
    document.removeEventListener("keydown", play);
  }

  function startGame() {
    game.initialize();
    setBoard(game.board);
    setStatus(game.gameStatus);
    addKeyboardEvent();
  }

  useEffect(() => {
    if (status !== "playing") removeKeyboardEvent();
  }, [status]);

  return (
    <div className="App">
      <header className="header">
        <h1>2048</h1>
      </header>
      {status === null && (
        <button className="button" type="button" onClick={startGame}>
          start
        </button>
      )}
      <div className="board">
        {board.map((tile) => (
          <div className="tile">{tile}</div>
        ))}
      </div>
      <footer>Created by Bar Amit</footer>
    </div>
  );
}

export default App;
