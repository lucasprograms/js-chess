(function() {

  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Board = Chess.Board = function(dim, grid) {
    this.dim = dim;
    if (grid) {
      this.grid = grid;
    } else {
      this.grid = this.makeGrid();
    }

  };

  Board.prototype.makeGrid = function (callback) {
    var grid = new Array(0);

    _.times(this.dim, function() {
      var row = new Array(0);
      grid.push(row);

      _.times(this.dim, function() {
        col = new Array(0);
        row.push(col);
      });
    }.bind(this));

    return grid;
  };

  Board.prototype.populateGrid = function () {
    this.placePieces();
    this.placePawns();
  };

  Board.prototype.placePieces = function () {
    var colors = ["white", "black"];
    var pieces = [[Chess.Rook, "Rook"], [Chess.Knight, "Knight"],
                  [Chess.Bishop, "Bishop"], [Chess.Queen, "Queen"],
                  [Chess.King, "King"], [Chess.Bishop, "Bishop"],
                  [Chess.Knight, "Knight"], [Chess.Rook, "Rook"]];

    var row = 7;
    var col = 0;

    _.each(colors, function(color) {
      _.each(pieces, function(piece) {
        this.grid[row][col] = new piece[0](color, [row, col], piece[1]);
        col += 1;
      }.bind(this));

      row = 0;
      col = 0;
    }.bind(this));
  };

  Board.prototype.placePawns = function () {
    var colors = ["white", "black"];
    var row = 6;
    var col = 0;

    _.each(colors, function(color) {
      _.times(8, function(piece) {
        this.grid[row][col] = new Chess.Pawn(color, [row, col], "Pawn");
        col += 1;
      }.bind(this));

      row = 1;
      col = 0;
    }.bind(this));
  };

  Board.prototype.isEmptyAt = function (pos) {
    return this.grid[pos[0]][pos[1]].length === 0;
  };

  Board.prototype.hasPieceAt = function(pos) {
    if (this.isEmptyAt(pos)) {
      return false;
    } else {
      return this.grid[pos[0]][pos[1]];
    }
  };

  Board.prototype.isOnBoard = function (pos) {
    return (pos[0] > -1 && pos[0] < 8) &&
           (pos[1] > -1 && pos[1] < 8);
  };

  Board.prototype.evaluateMove = function (startPos, endPos) {
    var initialSquare = [startPos.row, startPos.col];
    var targetSquare = [endPos.row, endPos.col];

    var piece = this.grid[initialSquare[0]][initialSquare[1]];

    if (piece.color !== game.currentColor) {
      return false;
    }

    if (piece.canReachSquare(targetSquare, this)) {
      if (!this.inCheck(piece, targetSquare)) {
        piece.move(targetSquare, this);
        if (this.isCheckmate()) {
          console.log('checkmate!');
        }
        game.switchColors();
        return this;
      }
    } else {
      return false;
    }
  };

  Board.prototype.inCheck = function (piece, targetSquare) {
    var boardClone = new Chess.Board(8, this.grid.deepClone());

    _.clone(piece).move(targetSquare, boardClone);

    var oppColor = (game.currentColor === "white") ? "black" : "white";
    var king = this.findKing(game.currentColor, boardClone);
    var opposingPieces = this.findPieces(oppColor, boardClone);

    return this.lookForCheck(king, opposingPieces, boardClone);
  };

  Board.prototype.findKing = function (color, board) {
    var king = "undefined";

    _.each(board.grid, function(row) {
      _.each(row, function(square) {
        if (square.color === color && square.type === "King") {
          king = square;
        }
      });
    });

    return king;
  };

  Board.prototype.findPieces = function (color, board) {
    var opposingPieces = [];

    _.each(board.grid, function(row) {
      _.each(row, function(square) {
        if (square.color && square.color === color) {
          opposingPieces.push(square);
        }
      });
    });

    return opposingPieces;
  };

  Board.prototype.lookForCheck = function (king, opposingPieces, board) {

    var inCheck = false;

    _.each(opposingPieces, function(piece) {
      if (piece.canReachSquare(king.pos, board)) {
        inCheck = true;
        return;
      }
    });

    return inCheck;
  };

  Board.prototype.isCheckmate = function () {
    oppColor = (game.currentColor === "white") ? "black" : "white";

    var isCheckmate = true;

    var boardClone = new Chess.Board(8, _.clone(this.grid.deepClone()));

    var oppKing = this.findKing(oppColor, boardClone);
    var oppPieces = this.findPieces(oppColor, boardClone);
    var myPieces = this.findPieces(game.currentColor, boardClone);

    _.each(oppPieces, function(piece) {
      _.each(piece.reachableSquares(boardClone), function(square) {

        var pieceClone = _.clone(piece);
        pieceClone.move(square, boardClone);

        if (pieceClone.type === "King") {
          if (!boardClone.lookForCheck(pieceClone, myPieces, boardClone)) {
            isCheckmate = false;
          }
        } else {
          if (!boardClone.lookForCheck(oppKing, myPieces, boardClone)) {
            isCheckmate = false;
          }
        }

        pieceClone.move([piece.pos[0], piece.pos[1]], boardClone);
      });
    });

    return isCheckmate;
  };
})();
