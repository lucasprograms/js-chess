Function.prototype.inherits = function (BaseClass) {
  function Surrogate () {}
  Surrogate.prototype = BaseClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
