(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }


  var Rook = Chess.Rook = function(color, pos, board) {
    Chess.Slideable.call(this, color, pos, board);
    this.moveDirs = Chess.Slideable.HZ_AND_VT_DIRS;
  };

  Rook.inherits(Chess.Slideable);



})();
