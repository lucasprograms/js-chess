(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Pawn = Chess.Pawn = function (color, pos, type) {
    this.color = color;
    this.pos = pos;
    this.type = type;
    this.hasMoved = false;
    this.moveDirs = this.getMoveDirs();
  };

  Pawn.inherits(Chess.Piece);

  Pawn.prototype.canReachSquare = function (pos, board) {
    var val = false;

    _.each(this.reachableSquares(board), function(square) {
      if (square[0] === pos[0] && square[1] === pos[1]) {
        val = true;
      }
    });

    return val;
  };

  Pawn.prototype.reachableSquares = function (board) {
    squares = [];

    _.each(this.moveDirs, function(dir) {
      var currentSquare = [this.pos[0] + dir[0], this.pos[1] + dir[1]];

      squareStatus = this.canMoveToSquare(currentSquare, board);

      if (squareStatus === true) {
        if (Math.abs(dir[0]) !== Math.abs(dir[1])) {
          squares.push(currentSquare);
        }
      } else if (squareStatus === "captureable") {
        if (Math.abs(dir[0]) === Math.abs(dir[1])) {
          squares.push(currentSquare);
        }
      }

    }.bind(this));

    return squares;
  };

  Pawn.prototype.getMoveDirs = function () {
    var moveDirs = [[-1, 0], [-1, 1], [-1, -1]];

    if (!this.hasMoved) {
      moveDirs.push([-2, 0]);
    }

    if (this.color === "black") {
      var newDirs = [];

      _.each(moveDirs, function (dir) {
        dir[0] *= -1;
        dir[1] *= -1;

        newDirs.push(dir);
      });

      moveDirs = newDirs;
    }

    return moveDirs;
  };

  Pawn.prototype.promote = function (promotionPiece) {
    return new Chess[promotionPiece](this.color, this.pos, promotionPiece);
  };


})();
