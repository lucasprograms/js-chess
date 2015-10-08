Function.prototype.inherits = function (BaseClass) {
  function Surrogate () {}
  Surrogate.prototype = BaseClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.deepClone = function () {
  var arrClone = [];

  _.each(this, function(innerObj) {
    if (Array.isArray(innerObj)) {
      arrClone.push(innerObj.deepClone());
    } else {
      arrClone.push(_.clone(innerObj));
    }
  });

  return arrClone;
};
