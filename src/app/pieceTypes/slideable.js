(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Slideable = Chess.Slideable = function (color, pos, type) {
    Chess.Piece.call(this, color, pos, type);
  };

  Slideable.inherits(Chess.Piece);

  Slideable.HZ_AND_VT_DIRS = [
    [ 1,  0],
    [-1,  0],
    [ 0,  1],
    [ 0, -1]
  ];

  Slideable.DIAG_DIRS = [
    [ 1,  1],
    [ 1, -1],
    [-1,  1],
    [-1, -1]
  ];

  Slideable.prototype.reachableSquares = function (board) {
    
    squares = [];

    _.each(this.moveDirs, function(dir) {
      var dirDup = _.clone(dir);

      while (board.isOnBoard([this.pos[0] + dirDup[0],
                                   this.pos[1] + dirDup[1]])) {

        var currentSquare = [this.pos[0] + dirDup[0],
                                      this.pos[1] + dirDup[1]];

        if (this.canMoveToSquare(currentSquare, board) === true) {
          squares.push(currentSquare);

          dirDup[0] += dir[0];
          dirDup[1] += dir[1];
        } else if (this.canMoveToSquare(currentSquare, board) === "captureable") {
          squares.push(currentSquare);
          dirDup[0] += 8;
        } else {
          dirDup[0] += 8;
        }
      }
    }.bind(this));

    return squares;
  };

})();
