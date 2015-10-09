(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  (function () {
    if (typeof Chess === "undefined") {
      window.Chess = {};
    }

    var King = Chess.King = function (color, pos, type) {
      Chess.Steppable.call(this, color, pos, type);
      this.hasMoved = false;
      this.moveDirs = King.KING_DIRS;
    };

    King.inherits(Chess.Steppable);

    King.KING_DIRS = [
      [ 1,  1],
      [ 1,  0],
      [ 1, -1],
      [ 0,  1],
      [ 0, -1],
      [-1,  1],
      [-1,  0],
      [-1, -1]
    ];

    King.prototype.canCastleKingside = function (board) {
      if (board.grid[7][5] === [] &&
          board.grid[7][6] === [] &&
          board.grid[7][7].type === "Rook" &&
          board.grid[7][7].hasMoved === false) {
        return [7, 6];
      } 
    };

  })();
})();
