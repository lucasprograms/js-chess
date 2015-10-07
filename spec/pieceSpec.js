describe("Piece: ", function () {
  beforeEach(function () {
    board = new Chess.Board(8);
    piece = new Chess.Piece("white", [4, 3], board);
    board.grid[4][3] = piece;
    piece.move([4, 7]);
  });

  it("can move from one square to another", function () {
    expect(piece.pos).toEqual([4, 7]);
  });

  describe("by moving it: ", function () {
    it("populates the square it moves to", function () {
      expect(board.grid[4][7]).toEqual(piece);
    });

    it("depopulates the square it moves from", function () {
      expect(board.isEmptyAt([4, 3])).toBeTruthy();
    });
  });

  describe("obeys the rules of piece capture: ", function () {
    it("cannot capture a piece it shares a color with", function () {
      same_color_piece = new Chess.Piece("white", [4, 4], board);
      board.grid[4][4] = same_color_piece;
      expect(piece.canMoveToSquare([4, 4])).toBeFalsy();
    });

    it("can capture a piece of the opposite color", function() {
      opposite_color_piece = new Chess.Piece("black", [4, 4], board);
      board.grid[4][4] = opposite_color_piece;
      expect(piece.canMoveToSquare([4, 4])).toEqual("captureable");
    });
  });


});
