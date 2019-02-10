// parent function everyone else inherits
function Shape(position,color,thickness) {
    this.position = position;
    this.color = color;
    this.thickness = thickness
};

Shape.prototype.render = function() { };

// changes the location of the shape
Shape.prototype.move = function(position) {
    this.position = position;
};

Shape.prototype.resize = function() { };

function Rectangle(position, width, height, filled,thickness, color) {
    Shape.call(this, position,color, thickness);
    this.width = width;
    this.height = height;
    this.filled = filled;
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

/**
    * LINE
**/

function Line(beginPosition,color,thickness) {
    Shape.call(this,beginPosition, color, thickness);
    // We don't know the endPosition at the beginning
    this.endPosition = {
        x: null,
        y: null
    }
};

// Assign the prototype
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function() {
    // Reset the current path
    drawio.ctx.beginPath();
    // Set the linewidth to thickness
    drawio.ctx.lineWidth  = this.thickness;
    // change the color of the line
    drawio.ctx.strokeStyle = this.color;
    // Staring point (beginPosition)
     drawio.ctx.moveTo(this.position.x,this.position.y);
    // End point (endPosition)
    drawio.ctx.lineTo(this.endPosition.x,this.endPosition.y);
    // Make the line visible
    drawio.ctx.stroke();
};

Line.prototype.resize = function(x,y) {
    // everytime we move we call this function with the new mouse coordinates and update
    // the endPosition coordinates
    this.endPosition.x = x;
    this.endPosition.y = y;
};
