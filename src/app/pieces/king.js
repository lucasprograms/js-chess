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
      var relevantSquares = this.getRelevantSquares(pos);

      if (this.checkCastlingSquare(pos)                     &&
          this.notInCheck(board)                            &&
          this.notCastlingThroughCheck(relevantSquares[0], board) &&
          this.ensureEmptySquares(relevantSquares, board)   &&
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

    King.prototype.notCastlingThroughCheck = function (middleSquare, board) {
      return !board.inCheck(this, middleSquare);
    };

    King.prototype.rookHasNotMoved = function (pos, board) {
      var rook = board.findRook(pos);
      return !rook.hasMoved;
    };

    King.prototype.ensureEmptySquares = function (relevantSquares, board) {
      var middleSquare = relevantSquares[0];
      var endSquare = relevantSquares[1];

      return board.grid[middleSquare[0]][middleSquare[1]].length === 0 &&
             board.grid[endSquare[0]][endSquare[1]].length === 0;
    };

    King.prototype.getRelevantSquares = function (pos) {
      var middleSquare;
      var endSquare;

      if (_.isEqual(pos, [7, 6])) {
        middleSquare = [7, 5];
        endSquare = [7, 6];
      } else if (_.isEqual(pos, [7, 2])) {
        middleSquare = [7, 3];
        endSquare = [7, 2];
      } else if (_.isEqual(pos, [0, 6])) {
        middleSquare = [0, 5];
        endSquare = [0, 6];
      } else {
        middleSquare = [0, 3];
        endSquare = [0, 2];
      }

      return [middleSquare, endSquare];
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
