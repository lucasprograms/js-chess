describe("bishop:", function () {
  beforeEach(function () {
    board = new Chess.Board(8);
    bishop = new Chess.Bishop("black", [4, 3], board);
    board.grid[4][3] = bishop;
  });

  it("is passed a board, color, and position", function() {
    expect(bishop.board).toEqual(board);
    expect(bishop.color).toEqual("black");
    expect(bishop.pos).toEqual([4, 3]);
  });

  it("accepts diagonal moves", function () {
    expect(bishop.canReachSquare([6, 5])).toBeTruthy();
    expect(bishop.canReachSquare([6, 1])).toBeTruthy();
    expect(bishop.canReachSquare([2, 5])).toBeTruthy();
    expect(bishop.canReachSquare([2, 1])).toBeTruthy();
  });

  it("rejects moves that are not diagonal", function () {
    expect(bishop.canReachSquare([4, 7])).toBeFalsy();
  });

  it("rejects moves that 'go through' another piece", function () {
    oppo_piece = new Chess.Rook("black", [5, 4], board);
    board.grid[5][4] = oppo_piece;
    expect(bishop.canReachSquare([6, 5])).toBeFalsy();
  });

});
