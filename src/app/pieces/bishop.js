(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Bishop = Chess.Bishop = function(color, pos) {
    Chess.Slideable.call(this, color, pos);
    this.moveDirs = Chess.Slideable.DIAG_DIRS;
  };

  Bishop.inherits(Chess.Slideable);

})();
