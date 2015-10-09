(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Piece = Chess.Piece = function (color, pos, type) {
    this.color = color;
    this.pos = pos;
    this.type = type;
  };

  Piece.prototype.move = function (pos, board, castling) {
    if (castling) {
      var rook = board.findRook(pos);
      var rookPos = board.getRookPosForCastling(rook);
      rook.move(rookPos, board);
    }

    board.grid[this.pos[0]][this.pos[1]] = [];
    this.pos = pos;
    board.grid[pos[0]][pos[1]] = this;

    if (castling) {
      game.view.render();
    }

    if (this.hasMoved === false) {
      this.hasMoved = true;
      if (this.type === "Pawn") {
        this.moveDirs = this.getMoveDirs();
      }

    }
  };

  Piece.prototype.canMoveToSquare = function (pos, board) {
    if (!board.isOnBoard(pos)) {
      return false;
    }

    isEmpty = board.isEmptyAt(pos);
    hasOppositeColor = board.hasPieceAt(pos).color !== this.color;

    if (isEmpty) {
      return true;
    } else if (hasOppositeColor) {
      return "captureable";
    } else {
      return false;
    }

  };

  Piece.prototype.canReachSquare = function (pos, board) {
    var val = false;

    reachableSquares = this.reachableSquares(board);

    if (this.type === "King" && board === game.board) {
      if (this.canCastleTo(pos, board)) {
        reachableSquares.push(pos);
      }
    }

    _.each(reachableSquares, function(square) {
      if (square[0] === pos[0] && square[1] === pos[1]) {
        val = true;
      }
    });

    return val;
  };

})();
