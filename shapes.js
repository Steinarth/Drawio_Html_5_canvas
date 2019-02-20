// parent function everyone else inherits
function Shape(position, color, thickness = null) {
    this.position = position;
    this.color = color;
    this.thickness = thickness;
    this.type = "notText";
};

Shape.prototype.render = function() {};

// changes the location of the shape
Shape.prototype.move = function(position) {
    this.position = position;
};

Shape.prototype.checkSpace = function(x, y) {
    return false;
}

Shape.prototype.resize = function() {};
