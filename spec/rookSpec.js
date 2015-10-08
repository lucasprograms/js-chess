describe("rook:", function () {
  beforeEach(function () {
    board = new Chess.Board(8);
    rook = new Chess.Rook("black", [4, 3]);
    board.grid[4][3] = rook;
  });

  it("is passed a color and position", function() {
    expect(rook.color).toEqual("black");
    expect(rook.pos).toEqual([4, 3]);
  });

  it("accepts horizontal moves", function () {
    expect(rook.canReachSquare([4, 7], board)).toBeTruthy();
  });

  it("accepts vertical moves", function () {
    debugger
    expect(rook.canReachSquare([0, 3], board)).toBeTruthy();
  });

  it("rejects moves that are both horizontal and vertical", function () {
    expect(rook.canReachSquare([5, 4], board)).toBeFalsy();
  });

  it("rejects moves that 'go through' another piece", function () {
    oppo_piece = new Chess.Rook("black", [4, 4]);
    board.grid[4][4] = oppo_piece;
    expect(rook.canReachSquare([4, 5], board)).toBeFalsy();
  });

});
