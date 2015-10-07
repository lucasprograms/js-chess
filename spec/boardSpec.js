describe("board:", function () {
  var board, grid;

  beforeEach(function () {
    board = new Chess.Board(8);
  });

  describe("new grid:", function () {
    beforeEach(function () {
      grid = board.makeGrid();
    });

    it("makes an array", function () {
      expect(Array.isArray(grid)).toBeTruthy();
    });

    it("makes an 8 x 8 array", function () {
      expect(Array.isArray(grid[0][0])).toBeTruthy();
      expect(Array.isArray(grid[7][7])).toBeTruthy();
      expect(grid[8]).toBe(undefined);
      expect(grid[7][8]).toBe(undefined);
    });
  });
});
