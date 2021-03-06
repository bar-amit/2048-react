import { useState } from "react";
import Game from "./utils/2048";
import Board from "./components/Board";
import Tile from "./components/Tile";
import GameOver from "./components/GameOver";
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
    if (game.gameStatus === "lost") setStatus("game-over");
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

  function resetGame() {
    game = new Game();
    setStatus(null);
    setBoard(game.board);
    removeKeyboardEvent();
  }

  return (
    <div className="App">
      <header className="header">
        <h1 className="header__title">2048</h1>
      </header>
      <main className="main">
        <Board>
          {status === null && (
            <button className="button" type="button" onClick={startGame}>
              start game
            </button>
          )}
          {board.flat().map((tile, idx) => (
            <Tile value={tile} key={`tile-${idx}`} />
          ))}
          <GameOver reset={resetGame} isOpen={status === "game-over"} />
        </Board>
      </main>
      <footer className="footer">Created by Bar Amit</footer>
    </div>
  );
}

export default App;
