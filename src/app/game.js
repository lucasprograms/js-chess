(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Game = Chess.Game = function () {
    this.board = new Chess.Board(8);
    this.board.populateGrid();
    this.view = new Chess.View(this.board);
  };

  Game.prototype.testMove = function (start_pos, end_pos) {

    var piece = this.board.grid[start_pos[0]][start_pos[1]];

    if (piece.canReachSquare(end_pos, this.board)) {
      this.performMove(piece, end_pos);
    }
  };

  Game.prototype.performMove = function (piece, end_pos) {
    piece.move(end_pos, this.board);
    this.view.render();
  };

})();

game = new Chess.Game();
