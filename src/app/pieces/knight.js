(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var Knight = Chess.Knight = function (color, pos) {
    Chess.Steppable.call(this, color, pos);
    this.moveDirs = Knight.KNIGHT_DIRS;
  };

  Knight.inherits(Chess.Steppable);

  Knight.KNIGHT_DIRS = [
    [ 2,  1],
    [ 2, -1],
    [ 1,  2],
    [ 1, -2],
    [-2,  1],
    [-2, -1],
    [-1,  2],
    [-1, -2]
  ];

})();
