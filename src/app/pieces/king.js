(function () {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  (function () {
    if (typeof Chess === "undefined") {
      window.Chess = {};
    }

    var King = Chess.King = function (color, pos, type) {
      Chess.Steppable.call(this, color, pos, type);
      this.moveDirs = King.KING_DIRS;
    };

    King.inherits(Chess.Steppable);

    King.KING_DIRS = [
      [ 1,  1],
      [ 1,  0],
      [ 1, -1],
      [ 0,  1],
      [ 0, -1],
      [-1,  1],
      [-1,  0],
      [-1, -1]
    ];

  })();
})();
