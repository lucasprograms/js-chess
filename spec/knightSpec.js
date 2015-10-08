describe("Knight: ", function () {
  beforeEach(function() {
    board = new Chess.Board(8);
    knight = new Chess.Knight("black", [4, 4]);
  });


  describe("moves correctly: ", function () {
    it("allows L-shaped moves", function () {
      expect(knight.canReachSquare([3, 2], board)).toBeTruthy();
      expect(knight.canReachSquare([3, 6], board)).toBeTruthy();
      expect(knight.canReachSquare([5, 6], board)).toBeTruthy();
      expect(knight.canReachSquare([5, 2], board)).toBeTruthy();
    });

    it("rejects incorrect moves", function () {
      expect(knight.canReachSquare([5, 5], board)).toBeFalsy();
      expect(knight.canReachSquare([5, 3], board)).toBeFalsy();
    });

    it("can 'jump over' other pieces", function () {
      p1 = new Chess.Piece("black", [4, 6]);
      p2 = new Chess.Piece("black", [4, 5]);
      p3 = new Chess.Piece("black", [5, 5]);
      board.grid[4][6] = p1;
      board.grid[4][5] = p2;
      board.grid[5][5] = p3;

      expect(knight.canReachSquare([5, 6], board)).toBeTruthy();
    });

  });
});
