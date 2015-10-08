(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Rook = Chess.Rook = function(color, pos, type) {
    Chess.Slideable.call(this, color, pos, type);
    this.moveDirs = Chess.Slideable.HZ_AND_VT_DIRS;
  };

  Rook.inherits(Chess.Slideable);

})();
