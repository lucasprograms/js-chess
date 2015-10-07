(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Steppable = Chess.Steppable = function (color, pos, board) {
    Chess.Piece.call(this, color, pos, board);
  };

  Steppable.inherits(Chess.Piece);

  Steppable.prototype.reachableSquares = function () {
    squares = [];

    _.each(this.moveDirs, function(dir) {
      var currentSquare = [this.pos[0] + dir[0], this.pos[1] + dir[1]];

      if (this.canMoveToSquare(currentSquare)) {
        squares.push(currentSquare);
      }
    }.bind(this));

    return squares;
  };

})();
