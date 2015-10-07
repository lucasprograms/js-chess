(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Queen = Chess.Queen = function(color, pos, board) {
    Chess.Slideable.call(this, color, pos, board);
    this.moveDirs = Chess.Slideable.DIAG_DIRS.concat(Chess.Slideable.HZ_AND_VT_DIRS);
  };

  Queen.inherits(Chess.Slideable);

})();
