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

    King.prototype.canCastleTo = function (pos, board) {
      if (this.hasMoved) {
        return false;
      }

      var canCastle = false;

      if (this.checkCastlingSquare(pos)             &&
          this.notInCheck(board)                    &&
          this.notCastlingThroughCheck(pos, board) &&
          this.rookHasNotMoved(pos, board))
          {
        canCastle = true;
      }

      return canCastle;
    };

    King.prototype.checkCastlingSquare = function (pos) {
      return (pos[0] === 7 && pos[1] === 6) ||
             (pos[0] === 7 && pos[1] === 2) ||
             (pos[0] === 0 && pos[1] === 6) ||
             (pos[0] === 0 && pos[1] === 2);
    };

    King.prototype.notInCheck = function (board) {
      return !board.inCheck(this, this.pos);
    };

    King.prototype.notCastlingThroughCheck = function (pos, board) {
      var middleSquare;

      if (_.isEqual(pos, [7, 6])) {
        middleSquare = [7, 5];
      } else if (_.isEqual(pos, [7, 2])) {
        middleSquare = [7, 3];
      } else if (_.isEqual(pos, [0, 6])) {
        middleSquare = [0, 5];
      } else {
        middleSquare = [0, 3];
      }

      return !board.inCheck(this, middleSquare);
    };

    King.prototype.rookHasNotMoved = function (pos, board) {
      rookPos = null;

      if (_.isEqual(pos, [7, 6])) {
        rookPos = [7, 7];
      } else if (_.isEqual(pos, [7, 2])) {
        rookPos = [7, 0];
      } else if (_.isEqual(pos, [0, 6])) {
        rookPos = [0, 7];
      } else {
        rookPos = [0, 0];
      }

      return !board.grid[rookPos[0]][rookPos[1]].hasMoved;
    };

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

  })();
})();
