(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Piece = Chess.Piece = function (color, pos, board) {
    this.board = board;
    this.color = color;
    this.pos = pos;
  };

  Piece.prototype.move = function (pos) {
    board.grid[this.pos[0]][this.pos[1]] = [];
    this.pos = pos;
    board.grid[pos[0]][pos[1]] = this;
  };

  Piece.prototype.canMoveToSquare = function (pos) {
    if (!this.board.isOnBoard(pos)) {
      return false;
    }

    isEmpty = this.board.isEmptyAt(pos);
    hasOppositeColor = this.board.hasPieceAt(pos).color !== this.color;

    if (isEmpty) {
      return true;
    } else if (hasOppositeColor) {
      return "captureable";
    } else {
      return false;
    }

  };

  Piece.prototype.canReachSquare = function (pos) {
    var val = false;

    _.each(this.reachableSquares(), function(square) {
      if (square[0] === pos[0] && square[1] === pos[1]) {
        val = true;
      }
    });

    return val;
  };

})();
