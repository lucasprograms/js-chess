(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Bishop = Chess.Bishop = function(color, pos, type) {
    Chess.Slideable.call(this, color, pos, type);
    this.moveDirs = Chess.Slideable.DIAG_DIRS;
  };

  Bishop.inherits(Chess.Slideable);

})();
