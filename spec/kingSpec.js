describe("King: ", function () {
  beforeEach(function() {
    board = new Chess.Board(8);
    king = new Chess.King("black", [4, 4], board);
  });


  describe("moves correctly: ", function () {
    it("allows a 1-step move in any direction", function () {
      expect(king.canReachSquare([5, 5])).toBeTruthy();
      expect(king.canReachSquare([5, 4])).toBeTruthy();
      expect(king.canReachSquare([4, 3])).toBeTruthy();
      expect(king.canReachSquare([3, 3])).toBeTruthy();
    });

    it("rejects incorrect moves", function () {
      expect(king.canReachSquare([5, 6])).toBeFalsy();
      expect(king.canReachSquare([1, 1])).toBeFalsy();
    });
  });

});
