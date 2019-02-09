// parent function everyone else inherits
function Shape(position,color) {
    this.position = position;
    this.color = color;
};

Shape.prototype.render = function() { };

// changes the location of the shape
Shape.prototype.move = function(position) {
    this.position = position;
};

Shape.prototype.resize = function() { };

function Rectangle(position, width, height, filled,thickness, color) {
    Shape.call(this, position,color);
    this.width = width;
    this.height = height;
    this.filled = filled;
    this.thickness = thickness;
};

// Assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function() {
    drawio.ctx.lineWidth  = this.thickness;
    // If filled render with fillRect else with strokeRect
    if(this.filled) {
        drawio.ctx.fillStyle = this.color;
        drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    } else {
        drawio.ctx.strokeStyle = this.color;
        drawio.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);

    }
};

Rectangle.prototype.resize = function(x,y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
};
