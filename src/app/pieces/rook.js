(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Rook = Chess.Rook = function(color, pos) {
    Chess.Slideable.call(this, color, pos);
    this.moveDirs = Chess.Slideable.HZ_AND_VT_DIRS;
  };

  Rook.inherits(Chess.Slideable);

})();
