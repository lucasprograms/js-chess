describe("Pawn: ", function () {
  beforeEach(function () {
    board = new Chess.Board(8);
    pawn = new Chess.Pawn("black", [1, 3]);
  });

  it("cannot move backwards", function () {
    expect(pawn.canReachSquare([0, 3], board)).toBeFalsy();
  });

  describe("on its first move: ", function () {
    it("can move two squares", function () {
      expect(pawn.canReachSquare([3, 3], board)).toBeTruthy();
    });
  });

  describe("after its first move: ", function () {
    beforeEach(function () {
      pawn.hasMoved = true;
      pawn.moveDirs = pawn.getMoveDirs();
    });

    it("cannot move two squares", function () {
      expect(pawn.moveDirs).toEqual([[1, -0], [1, -1], [1, 1]]);
      expect(pawn.canReachSquare([3, 3], board)).toBeFalsy();
    });
  });

  describe("diagonal moves: ", function () {
    beforeEach(function () {
      pawn = new Chess.Pawn("black", [1, 3]);
      oppo_piece = new Chess.Piece("white", [2, 2]);
      board.grid[2][2] = oppo_piece;
    });

    it("can move diagonally when capturing an opposing piece", function () {
      expect(pawn.moveDirs).toEqual([[1, -0], [1, -1], [1, 1], [2, -0]]);
      expect(pawn.canReachSquare([2, 2], board)).toBeTruthy();
    });

    it("cannot move diagonally if the target square is empty", function () {
      expect(pawn.moveDirs).toEqual([[1, -0], [1, -1], [1, 1], [2, -0]]);
      expect(pawn.canReachSquare([2, 4], board)).toBeFalsy();
    });
  });
});
