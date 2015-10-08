describe("queen:", function () {
  beforeEach(function () {
    board = new Chess.Board(8);
    queen = new Chess.Queen("black", [4, 3]);
    board.grid[4][3] = queen;
  });

  it("is passed color and position", function() {
    expect(queen.color).toEqual("black");
    expect(queen.pos).toEqual([4, 3]);
  });

  it("accepts diagonal moves", function () {
    expect(queen.canReachSquare([6, 5], board)).toBeTruthy();
    expect(queen.canReachSquare([6, 1], board)).toBeTruthy();
    expect(queen.canReachSquare([2, 5], board)).toBeTruthy();
    expect(queen.canReachSquare([2, 1], board)).toBeTruthy();
  });

  it("accepts horizontal moves", function () {
    expect(queen.canReachSquare([4, 7], board)).toBeTruthy();
  });

  it("accepts vertical moves", function () {
    expect(queen.canReachSquare([0, 3], board)).toBeTruthy();
  });

  it("rejects moves that are both not diagonal, horizontal, or vertical", function () {
    expect(queen.canReachSquare([6, 4], board)).toBeFalsy();
  });

  it("rejects moves that 'go through' another piece", function () {
    oppo_piece = new Chess.Rook("black", [4, 4]);
    board.grid[4][4] = oppo_piece;
    expect(queen.canReachSquare([4, 5], board)).toBeFalsy();
  });

});
