(function() {
  if (typeof Chess === "undefined") {
    window.Chess = {};
  }

  var View = Chess.View = function(board) {
    this.$el = $(".grid");
    this.board = board;
    this.render();
  };


  View.prototype.render = function () {
    this.$el.empty();
    var color = "#EDC9AF";

    _.each(this.board.grid, function(row) {
      $ul = $("<ul>");
      $ul.addClass("group row");
      this.$el.append($ul);
      _.each(row, function(square) {
        $li = $("<li>");
        $li.addClass("square");

        $ul.append($li);

        if (square.type) {

          $li.append('<img src="images/' + square.color.capitalize() +
          square.type + '.png">' );
        }

        $li.css("background", color);

        color = (color === "#EDC9AF") ? "#7B3F00" : "#EDC9AF";
      });

      color = (color === "#EDC9AF") ? "#7B3F00" : "#EDC9AF";
    }.bind(this));

  };


})();
