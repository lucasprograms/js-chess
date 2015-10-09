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
    var row_val = 0;
    var col_val = 0;

    _.each(this.board.grid, function(row) {

      $ul = $("<ul>");
      $ul.addClass("group row");
      this.$el.append($ul);

      _.each(row, function(square) {
        $li = $("<li>");
        $li.addClass("square");
        $li.data("pos", {row: row_val, col: col_val});

        $li.droppable({
          tolerance: "pointer",
          accept: "img"
        });

        $li.bind("drop", function (e, ui) {

          startingSquare = ui.draggable.parent().data('pos');
          targetSquare = $(e.target).data('pos');

          this.getMoveValidity(startingSquare, targetSquare, e, ui);
        }.bind(this));

        $ul.append($li);

        if (square.type) {

          $img = $('<img src="images/' + square.color.capitalize() +
          square.type + '.png">');
          $img.draggable({
            containment: ".grid"
          });

          $li.append($img);
        }

        $li.css("background", color);

        color = this.switchBackground(color);
        col_val += 1;
      }.bind(this));

      color = this.switchBackground(color);
      row_val += 1;
      col_val = 0;
    }.bind(this));

  };

  View.prototype.getMoveValidity = function (startingSquare, targetSquare, e, ui) {
    boardStatus = this.board.evaluateMove(startingSquare, targetSquare);

    if (boardStatus) {
      $(e.target).empty();
      $(e.target).append(ui.draggable);
      ui.draggable.css({
        top: 0,
        left: 0
      });

    } else {

      ui.draggable.parent().append(ui.draggable);
      ui.draggable.css({
        top: 0,
        left: 0
      });
      var color = $(e.target).css("background");
      $(e.target).css("background", "#ff4d4d");

      window.setTimeout(function() {$(e.target).css("background", color);}, 1000);
    }
  };

  View.prototype.switchBackground = function (color) {
    return (color === "#EDC9AF") ? "#7B3F00" : "#EDC9AF";
  };


})();
