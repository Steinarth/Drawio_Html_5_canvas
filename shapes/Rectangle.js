function Rectangle(position, width, height, filled, thickness, color) {
    Shape.call(this, position, color, thickness);
    this.width = width;
    this.height = height;
    this.filled = filled;
    this.type = drawio.availableShapes.RECTANGLE;
};

// Assign the prototype
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function() {
    drawio.ctx.lineWidth = this.thickness;
    // If filled render with fillRect else with strokeRect
    if (this.filled) {
        drawio.ctx.fillStyle = this.color;
        drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    } else {
        drawio.ctx.strokeStyle = this.color;
        drawio.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);
    }
};

Rectangle.prototype.resize = function(x, y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
};

Rectangle.prototype.checkSpace = function(x, y) {
    if (this.position.x < x && x < this.position.x + this.width && this.position.y < y && y < this.position.y + this.height) {
        return true;
    }
    return false;
};
