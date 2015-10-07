(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Pawn = Chess.Pawn = function (color, pos, board) {
    this.color = color;
    this.pos = pos;
    this.board = board;
    this.hasMoved = false;
    this.moveDirs = this.getMoveDirs();
  };

  Pawn.inherits(Chess.Piece);

  Pawn.prototype.canReachSquare = function (pos) {
    var val = false;

    _.each(this.reachableSquares(), function(square) {
      if (square[0] === pos[0] && square[1] === pos[1]) {
        val = true;
      }
    });

    return val;
  };

  Pawn.prototype.reachableSquares = function () {
    squares = [];

    _.each(this.moveDirs, function(dir) {
      var currentSquare = [this.pos[0] + dir[0], this.pos[1] + dir[1]];

      squareStatus = this.canMoveToSquare(currentSquare);

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
        // if (dir[0] !== 0) {
          dir[0] *= -1;
        // }

        // if (dir[1] !== 0) {
          dir[1] *= -1;
        // }

        newDirs.push(dir);
      });

      moveDirs = newDirs;
    }

    return moveDirs;
  };


})();
