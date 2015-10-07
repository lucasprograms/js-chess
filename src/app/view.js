(function() {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var View = Chess.View = function() {
    this.canvas = document.getElementById("grid");
    this.board = new Chess.Board(8);
    this.render();
  };

  View.prototype.render = function () {
    var squareSize = 100; //square size

    var ctx = this.canvas.getContext("2d");
    ctx.fillStyle = "#654321";

    var x = 0;
    var y = 0;

    _.each(this.board.grid, function(row) {
      _.each(row, function(square) {
        ctx.fillRect(x, y, squareSize, squareSize);
        // ctx.strokeRect(x, y, squareSize, squareSize);

        x += squareSize;
        ctx.fillStyle = (ctx.fillStyle === "#654321") ? "#cfbea5" : "#654321";
      });

      ctx.fillStyle = (ctx.fillStyle === "#654321") ? "#cfbea5" : "#654321";
      x = 0;
      y += squareSize;
    });
  };



})();

view = new Chess.View();
