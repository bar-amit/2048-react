import TwoThousandFortyEight from "./2048";

function boardEquals(board1, board2) {
  let flatBoard1 = board1.flat();
  let flatBoard2 = board2.flat();

  return flatBoard1.every((tile, idx) => tile === flatBoard2[idx]);
}

function boardEqualsWithOneRandomDeference(board1, board2) {
  let flatBoard1 = board1.flat();
  let flatBoard2 = board2.flat();

  return flatBoard1.reduce((acc, tile, idx) => {
    if (tile === flatBoard2[idx]) return acc;
    if (acc === null) return true;
    return false;
  }, null);
}

var $2048 = new TwoThousandFortyEight();

describe("Module exposes the relevant assets", () => {
  it("imports the module", () => {
    expect(typeof TwoThousandFortyEight).toBe("function");
    expect(typeof $2048).toBe("object");
  });
  it("exposes a board Array", () => {
    expect($2048.board).toBeDefined();
  });
  it("board Array is of type Array[4X4]", () => {
    expect(Array.isArray($2048.board)).toBe(true);
    expect($2048.board.length).toBe(4);
    expect($2048.board.every((row) => row.length === 4)).toBe(true);
  });
  it("exposes gameStatus", () => {
    expect($2048.gameStatus).toBeDefined();
  });
  it("exposes a play method", () => {
    expect(typeof $2048.play).toBe("function");
  });
  it("exposes a initialize method", () => {
    expect(typeof $2048.initialize).toBe("function");
  });
});

describe("The game starts correctly", () => {
  it("initial values are zeros", () => {
    expect($2048.board.flat().every((tile) => tile === 0)).toBe(true);
  });
  it("gameStatus starts with null value", () => {
    expect($2048.gameStatus).toBe(null);
  });
  it("after calling the initialize function there are two non-zero tiles", () => {
    $2048 = new TwoThousandFortyEight();
    $2048.initialize();

    let nonZeroTilesCount = $2048.board
      .flat()
      .reduce((acc, val) => (val === 0 ? acc : acc + 1), 0);

    expect(nonZeroTilesCount).toBe(2);
  });
  it("gameStatus is set to 'playing' after init", () => {
    $2048 = new TwoThousandFortyEight();
    $2048.initialize();

    expect($2048.gameStatus).toBe("playing");
  });
});

describe("Ilegal moves are identified", () => {
  it("All moves are legal", () => {
    $2048.board = [
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { right, left, up, down } = $2048.getLegalMoves();

    expect(right && left && up && down).toBe(true);
  });
  it("right is ilegal", () => {
    $2048.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 2],
      [0, 0, 0, 4],
      [0, 0, 0, 0],
    ];
    const { right, left, up, down } = $2048.getLegalMoves();

    expect(left && up && down).toBe(true);
    expect(right).toBe(false);
  });
  it("left is ilegal", () => {
    $2048.board = [
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [4, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { right, left, up, down } = $2048.getLegalMoves();

    expect(right && up && down).toBe(true);
    expect(left).toBe(false);
  });
  it("up is ilegal", () => {
    $2048.board = [
      [0, 4, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { right, left, up, down } = $2048.getLegalMoves();

    expect(right && left && down).toBe(true);
    expect(up).toBe(false);
  });
  it("down is ilegal", () => {
    $2048.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 2, 4, 0],
    ];
    const { right, left, up, down } = $2048.getLegalMoves();

    expect(right && left && up).toBe(true);
    expect(down).toBe(false);
  });
  it("board is full but mergeable horizontaly", () => {
    $2048.board = [
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 8, 8, 2],
    ];
    const { right, left, up, down } = $2048.getLegalMoves();

    expect(right && left).toBe(true);
    expect(down || up).toBe(false);
  });
  it("board is full but mergeable vertically", () => {
    $2048.board = [
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 8, 2, 4],
      [4, 8, 4, 2],
    ];
    const { right, left, up, down } = $2048.getLegalMoves();

    expect(right || left).toBe(false);
    expect(down && up).toBe(true);
  });
  it("board is full but mergeable all around", () => {
    $2048.board = [
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 2, 2, 4],
      [4, 2, 4, 2],
    ];
    const { right, left, up, down } = $2048.getLegalMoves();

    expect(down && up && right && left).toBe(true);
  });
  it("empty column", () => {
    $2048.board = [
      [2, 4, 0, 8],
      [4, 2, 0, 16],
      [2, 4, 0, 8],
      [4, 2, 0, 16],
    ];
    const { right, left, up, down } = $2048.getLegalMoves();

    expect(right && left).toBe(true);
    expect(down || up).toBe(false);
  });
  it("empty row", () => {
    $2048.board = [
      [8, 16, 8, 16],
      [0, 0, 0, 0],
      [2, 4, 2, 4],
      [4, 2, 4, 2],
    ];
    const { right, left, up, down } = $2048.getLegalMoves();

    expect(right || left).toBe(false);
    expect(down && up).toBe(true);
  });
  it("gap in the middle", () => {
    $2048.board = [
      [8, 16, 8, 16],
      [16, 0, 0, 8],
      [2, 0, 0, 4],
      [4, 2, 4, 2],
    ];
    const { right, left, up, down } = $2048.getLegalMoves();

    expect(right && left && up && down).toBe(true);
  });
  it("no legal move", () => {
    $2048.board = [
      [8, 16, 8, 16],
      [16, 4, 2, 8],
      [2, 16, 8, 4],
      [4, 2, 4, 2],
    ];
    const { right, left, up, down } = $2048.getLegalMoves();

    expect(right || left || up || down).toBe(false);
  });
});

describe("Ilegal move won't change the board", () => {
  it("don't move anywhere", () => {
    let testBoard = [
      [8, 16, 8, 16],
      [16, 4, 2, 8],
      [2, 16, 8, 4],
      [4, 2, 4, 2],
    ];
    $2048.board = testBoard;

    $2048.play("up");
    $2048.play("down");
    $2048.play("left");
    $2048.play("right");

    expect(boardEquals(testBoard, $2048.board)).toBe(true);
  });
});

describe("Makes simple moves", () => {
  it("moves right", () => {
    $2048.board = [
      [0, 2, 0, 0],
      [0, 4, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    $2048.play("right");
    let res = boardEqualsWithOneRandomDeference($2048.board, [
      [0, 0, 0, 2],
      [0, 0, 0, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    expect(res).toBe(true);
  });
  it("moves left", () => {
    $2048.board = [
      [0, 2, 0, 0],
      [0, 4, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    $2048.play("left");
    let res = boardEqualsWithOneRandomDeference($2048.board, [
      [2, 0, 0, 0],
      [4, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    expect(res).toBe(true);
  });
  it("moves up", () => {
    $2048.board = [
      [0, 0, 0, 0],
      [0, 2, 4, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    $2048.play("up");
    let res = boardEqualsWithOneRandomDeference($2048.board, [
      [0, 2, 4, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    expect(res).toBe(true);
  });
  it("moves down", () => {
    $2048.board = [
      [0, 2, 0, 0],
      [0, 4, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    $2048.play("down");
    let res = boardEqualsWithOneRandomDeference($2048.board, [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 4, 0, 0],
    ]);

    expect(res).toBe(true);
  });
});

describe("Merge tiles", () => {
  it("Simple merge down", () => {
    $2048.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
    ];
    $2048.play("down");
    let res = boardEqualsWithOneRandomDeference($2048.board, [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 4, 0, 0],
    ]);

    expect(res).toBe(true);
  });
  it("Simple merge right", () => {
    $2048.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 8, 8, 0],
      [0, 4, 0, 0],
    ];
    $2048.play("right");
    let res = boardEqualsWithOneRandomDeference($2048.board, [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 16],
      [0, 0, 0, 4],
    ]);

    expect(res).toBe(true);
  });
  it("Double merge left", () => {
    $2048.board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 2, 2],
      [0, 2, 0, 0],
    ];
    $2048.play("left");
    let res = boardEqualsWithOneRandomDeference($2048.board, [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 4, 0, 0],
      [2, 0, 0, 0],
    ]);

    expect(res).toBe(true);
  });
  it("Merge up - three tiles", () => {
    $2048.board = [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
      [0, 2, 0, 0],
    ];
    $2048.play("up");
    let res = boardEqualsWithOneRandomDeference($2048.board, [
      [0, 4, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);

    expect(res).toBe(true);
  });
  it("Merge with gap", () => {
    $2048.board = [
      [4, 2, 16, 512],
      [4, 0, 0, 0],
      [8, 2, 0, 512],
      [0, 4, 16, 512],
    ];
    $2048.play("down");
    let res = boardEqualsWithOneRandomDeference($2048.board, [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [8, 4, 0, 512],
      [8, 4, 32, 1024],
    ]);

    expect(res).toBe(true);
  });
});

describe("Game status is changing correctly", () => {
  beforeEach(() => {
    $2048 = new TwoThousandFortyEight();
    $2048.initialize();
  });
  it("Should change to lost if there aren't legal moves", () => {
    $2048.board = [
      [16, 16, 8, 16],
      [16, 4, 2, 16],
      [2, 16, 8, 4],
      [4, 2, 4, 2],
    ];
    $2048.play("right");

    expect($2048.gameStatus).toBe("playing");

    $2048.play("down");

    expect($2048.gameStatus).toBe("lost");
  });
  it("Should change to won if 2048 is achieved", () => {
    $2048.board = [
      [16, 4, 512, 512],
      [16, 4, 2, 1024],
      [2, 16, 8, 4],
      [4, 2, 4, 2],
    ];
    $2048.play("right");

    expect($2048.gameStatus).toBe("playing");

    $2048.play("down");

    expect($2048.gameStatus).toBe("won");
  });
});
