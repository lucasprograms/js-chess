(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Bishop = Chess.Bishop = function(color, pos, board) {
    Chess.Slideable.call(this, color, pos, board);
    this.moveDirs = Chess.Slideable.DIAG_DIRS;
  };

  Bishop.inherits(Chess.Slideable);

})();
