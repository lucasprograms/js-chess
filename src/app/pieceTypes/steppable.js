(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Steppable = Chess.Steppable = function (color, pos, type) {
    Chess.Piece.call(this, color, pos, type);
  };

  Steppable.inherits(Chess.Piece);

  Steppable.prototype.reachableSquares = function (board) {
    squares = [];

    _.each(this.moveDirs, function(dir) {
      var currentSquare = [this.pos[0] + dir[0], this.pos[1] + dir[1]];

      if (this.canMoveToSquare(currentSquare, board)) {
        squares.push(currentSquare);
      }
    }.bind(this));

    if (this.type === "King" && this.hasMoved === false) {
      debugger
      if (this.canCastleKingside(board)) {
        debugger
        squares.push(this.canCastleKingside(board));
      }
    }

    return squares;
  };

})();
