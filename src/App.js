import { useState } from "react";
import Game from "./utils/2048";
import Board from "./components/Board";
import Tile from "./components/Tile";
import "./App.css";

var game = new Game();

function App() {
  const [board, setBoard] = useState(game.board);
  const [status, setStatus] = useState(null);

  function init() {
    setBoard(game.initialize());
  }

  function play(move) {
    setBoard(game.play(move));
  }

  function playMove(e) {
    removeKeyboardEvent();
    switch (e.key) {
      case "ArrowLeft":
      case "a":
      case "A":
        play("left");
        break;
      case "ArrowRight":
      case "d":
      case "D":
        play("right");
        break;
      case "ArrowUp":
      case "w":
      case "W":
        play("up");
        break;
      case "ArrowDown":
      case "s":
      case "S":
        play("down");
        break;
      default:
        addKeyboardEvent();
        return;
    }
    addKeyboardEvent();
  }

  function addKeyboardEvent() {
    document.addEventListener("keydown", playMove);
  }

  function removeKeyboardEvent() {
    document.removeEventListener("keydown", playMove);
  }

  function startGame() {
    init();
    setStatus("playing");
    addKeyboardEvent();
  }

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
      <Board>
        {board.flat().map((tile, idx) => (
          <Tile value={tile} key={`tile-${idx}`} />
        ))}
      </Board>
      <footer>Created by Bar Amit</footer>
    </div>
  );
}

export default App;
