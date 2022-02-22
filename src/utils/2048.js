class TwoThousandFourtyEight {
  constructor() {
    this.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    this.gameStatus = null;
  }
  printBoard() {
    this.board.forEach((row) => console.log(row));
  }
  initialize() {
    this.gameStatus = "playing";
    var [tile1, tile2] = [
      {
        index: getRandomIndex(),
        value: getRandomTileValue(),
      },
      {
        index: getRandomIndex(),
        value: getRandomTileValue(),
      },
    ];
    while (tile1.index == tile2.index) tile2.index = getRandomIndex();
    this.board = setTile(this.board, tile1.index, tile1.value);
    this.board = setTile(this.board, tile2.index, tile2.value);

    return this.board;
  }
  play(direction) {
    if (this.gameStatus != "playing") return this.board;

    switch (direction) {
      case "left":
        this.moveLeft();
        break;
      case "right":
        this.moveRight();
        break;
      case "up":
        this.moveUp();
        break;
      case "down":
        this.moveDown();
        break;
      default:
        return this.board;
    }
    this.addNewTile();
    this.updateGameStatus();

    return this.board;
  }
  moveLeft() {
    this.board = this.board.map(squeezLeft);
  }
  moveRight() {
    this.board = this.board.map((row) => squeezLeft(row.reverse()).reverse());
  }
  moveUp() {
    var newBoard = Array.from(this.board);
    for (let i = 0; i < 4; i++) {
      let column = newBoard.map((row) => row[i]);
      column = squeezLeft(column);
      column.forEach(
        (tile, idx) => (newBoard = setTile(newBoard, idx * 4 + i, tile))
      );
    }
    this.board = newBoard;
  }

  moveDown() {
    var newBoard = Array.from(this.board);
    for (let i = 0; i < 4; i++) {
      let column = newBoard.map((row) => row[i]);
      column = squeezLeft(column.reverse()).reverse();
      column.forEach(
        (tile, idx) => (newBoard = setTile(newBoard, idx * 4 + i, tile))
      );
    }
    this.board = newBoard;
  }

  addNewTile() {
    var emptyTiles = this.findEmptyTiles();
    var tileIndex = getRandomIndex(emptyTiles.length - 1);
    var tileValue = getRandomTileValue();

    this.board = setTile(this.board, emptyTiles[tileIndex], tileValue);
  }
  findEmptyTiles() {
    var res = [];

    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        if (this.board[i][j] == 0) res.push(i * 4 + j);
    return res;
  }

  getLegalMoves() {
    let isLeftMoveLegal = this.board.some((row) => row[0] == 0);
    let isRightMoveLegal = this.board.some((row) => row[3] == 0);
    let isUpMoveLegal = this.board[0].some((tile) => tile == 0);
    let isDownMoveLegal = this.board[3].some((tile) => tile == 0);

    let isHorizontalMergeable = this.board.some(isMergeable);
    let isVerticalMergeable = [0, 1, 2, 3].some((idx) =>
      isMergeable([
        this.board[0][idx],
        this.board[1][idx],
        this.board[2][idx],
        this.board[3][idx],
      ])
    );

    return {
      left: isLeftMoveLegal || isHorizontalMergeable,
      right: isRightMoveLegal || isHorizontalMergeable,
      up: isUpMoveLegal || isVerticalMergeable,
      down: isDownMoveLegal || isVerticalMergeable,
    };
  }
  updateGameStatus() {
    const { left, right, up, down } = this.getLegalMoves();

    if (this.board.flat().some((tile) => tile == 2048)) this.gameStatus = "won";
    else if (!left && !right && !up && !down) this.gameStatus = "lost";
  }
}

function setTile(board, tileNumber, value) {
  var newArray = Array.from(board);
  var row = Math.floor(tileNumber / 4);
  var column = tileNumber % 4;
  newArray[row][column] = value;
  return newArray;
}

function isMergeable(arr) {
  return arr[0] == arr[1] || arr[1] == arr[2] || arr[2] == arr[3];
}
function getRandomTileValue() {
  return Math.random() <= 0.1 ? 4 : 2;
}
function getRandomIndex(max = 15) {
  return Math.round(Math.random() * max);
}
function squeezLeft(arr) {
  var res = [];

  let values = arr.filter((tile) => tile != 0);
  let i = 0;
  for (let j = 0; j < 4; j++) {
    if (values[i] == values[i + 1] && i < values.length) {
      res[j] = values[i] + values[i + 1];
      i += 2;
    } else {
      res[j] = values[i] || 0;
      i++;
    }
  }
  return res;
}

export default TwoThousandFourtyEight;

//////////////////////
// tests
//////////////////////

// let game = new TwoThousandFourtyEight();
// console.log(game.board);
// game.initialize();
// console.log(game.board);
// game.moveLeft();
// console.log(game.board);
// game.moveRight();
// console.log(game.board);
// game.play("left");
// console.log(game.board);
// game.play("right");
// console.log(game.board);
// game.play("up");
// console.log(game.board);
// game.play("down");
// console.log(game.board);
// console.log(squeezLeft([0, 4, 4, 8]));
// console.log(squeezLeft([0, 4, 4, 4]));
// console.log(squeezLeft([4, 4, 4, 4]));
// console.log(squeezLeft([2, 2, 4, 4]));
// console.log(squeezLeft([2, 8, 4, 2]));
