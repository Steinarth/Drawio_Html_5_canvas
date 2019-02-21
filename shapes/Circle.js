/**
    * Circle
**/

function Circle(beginPosition, radius, color, thickness, filled) {
    Shape.call(this, beginPosition, color, thickness);
    // We don't know the radius at the beginning
    // this.radius = null;
    this.radius = radius;
    this.filled = filled;
    this.type = drawio.availableShapes.CIRCLE;
};

// Assign the prototype
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function() {
    drawio.ctx.beginPath();
    // Set the linewidth to thickness
    drawio.ctx.lineWidth = this.thickness;
    // change the color of the line
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.fillStyle = this.color;

    drawio.ctx.arc(this.position.x, this.position.y, this.radius, (Math.PI / 180) * 0, (Math.PI / 180) * 360, true);

    if (this.filled) {
        //filled  circle
        drawio.ctx.fill();
    } else {
        drawio.ctx.stroke();
    }
    drawio.ctx.closePath();
};

Circle.prototype.resize = function(x, y) {
    var oldX = this.position.x;
    var oldY = this.position.y;
    var xLength = x - oldX;
    var yLength = y - oldY;
    this.radius = Math.sqrt(xLength * xLength + yLength * yLength);
};

Circle.prototype.checkSpace = function(x, y) {
    move = false;
    // Right side of circle
    if (this.position.x < x && x < this.position.x + this.radius) {
        // Lower side of right side of circle
        if (this.position.y < y && y < this.position.y + this.radius) {
            move = true;
        }
        // Upper side of right side of circle
        if (y < this.position.y && this.position.y - this.radius < y) {
            move = true;
        }
    }
    // Left side of Circle
    if (x < this.position.x && this.position.x - this.radius < x) {
        // Lower left side of Circle
        if (this.position.y < y && y < this.position.y + this.radius) {
            move = true;
        }
        // Upper left side of Circle
        if (y < this.position.y && this.position.y - this.radius < y) {
            move = true;
        }
    }
    return move;
};
