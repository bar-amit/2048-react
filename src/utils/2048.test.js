import TwoThousandFortyEight from "./2048";

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
  it("after calling the initialize function there are two non-zero tiles", () => {
    $2048 = new TwoThousandFortyEight();
    $2048.initialize();

    let nonZeroTilesCount = $2048.board
      .flat()
      .reduce((acc, val) => (val === 0 ? acc : acc + 1), 0);

    $2048.printBoard();
    expect(nonZeroTilesCount).toBe(2);
  });
});
