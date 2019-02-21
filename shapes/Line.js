
/**
    * LINE
**/

function Line(beginPosition, color, thickness) {
    Shape.call(this, beginPosition, color, thickness);
    // We don't know the endPosition at the beginning
    this.endPosition = {
        x: null,
        y: null
    }
    this.type = drawio.availableShapes.LINE;
};

// Assign the prototype
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function() {
    // Reset the current path
    drawio.ctx.beginPath();
    // Set the linewidth to thickness
    drawio.ctx.lineWidth = this.thickness;
    // change the color of the line
    drawio.ctx.strokeStyle = this.color;
    // Starting point (beginPosition)
    drawio.ctx.moveTo(this.position.x, this.position.y);
    // End point (endPosition)
    drawio.ctx.lineTo(this.endPosition.x, this.endPosition.y);
    // Make the line visible
    drawio.ctx.stroke();
};

Line.prototype.resize = function(x, y) {
    // everytime we move we call this function with the new mouse coordinates and update
    // the endPosition coordinates
    this.endPosition.x = x;
    this.endPosition.y = y;
};

// changes the location of the Line
Line.prototype.move = function(position) {
    this.xLength = this.endPosition.x - this.position.x;
    this.yLength = this.endPosition.y - this.position.y;

    this.position = position;

    this.endPosition.x = position.x + this.xLength;
    this.endPosition.y = position.y + this.yLength;
};

Line.prototype.checkSpace = function(x, y) {
    if (this.position.x < x && x < this.endPosition.x && this.position.y < y && y < this.endPosition.y) {
        return true;
    }

    if (x < this.position.x && this.endPosition.x < x && this.position.y < y && y < this.endPosition.y) {
        return true;
    }

    return false;
};
