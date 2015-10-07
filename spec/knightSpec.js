describe("Knight: ", function () {
  beforeEach(function() {
    board = new Chess.Board(8);
    knight = new Chess.Knight("black", [4, 4], board);
  });


  describe("moves correctly: ", function () {
    it("allows L-shaped moves", function () {
      expect(knight.canReachSquare([3, 2])).toBeTruthy();
      expect(knight.canReachSquare([3, 6])).toBeTruthy();
      expect(knight.canReachSquare([5, 6])).toBeTruthy();
      expect(knight.canReachSquare([5, 2])).toBeTruthy();
    });

    it("rejects incorrect moves", function () {
      expect(knight.canReachSquare([5, 5])).toBeFalsy();
      expect(knight.canReachSquare([5, 3])).toBeFalsy();
    });

    it("can 'jump over' other pieces", function () {
      p1 = new Chess.Piece("black", [4, 6], board);
      p2 = new Chess.Piece("black", [4, 5], board);
      p3 = new Chess.Piece("black", [5, 5], board);
      board.grid[4][6] = p1;
      board.grid[4][5] = p2;
      board.grid[5][5] = p3;

      expect(knight.canReachSquare([5, 6])).toBeTruthy();
    });

  });
});
