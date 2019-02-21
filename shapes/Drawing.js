/****
  Drawing properties
****/

function Drawing(position, color, thickness) {
    Shape.call(this, position, color, thickness);
    this.points = []; // Keeps track of points we need to draw (x,y) coordinates
    this.type = drawio.availableShapes.PEN;
}

Drawing.prototype = Object.create(Shape.prototype);
Drawing.prototype.constructor = Drawing;

// Push new x,y coordinates into our array
Drawing.prototype.resize = function(x, y) {
    this.points.push({x: x, y: y});
}

Drawing.prototype.render = function() {
    drawio.ctx.beginPath();
    drawio.ctx.lineWidth = this.thickness;
    for (var i = 0; i < this.points.length; i++) {
        drawio.ctx.lineTo(this.points[i].x, this.points[i].y);
    }

    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.stroke();
}
Drawing.prototype.addPoints = function(points) {
    this.points = points;
}

Drawing.prototype.checkSpace = function(x, y) {
    // Hard to hit exactly point.x, added 25 for easier clicking.
    if (this.points.some((point) => {
        return (x <= (point.x + 25) && x >= (point.x - 25) && y <= (point.y + 25) && y >= (point.y - 25));
    })) {
        this.points.forEach((point) => {
            drawio.offsetX.push(x - point.x);
            drawio.offsetY.push(y - point.y);
        });
        return true;
    }
    return false;
}

Drawing.prototype.move = function({x, y}) {
    var newPoints = new Array;
    this.points.forEach((point, index) => {
        point.x = x - drawio.offsetX[index];
        point.y = y - drawio.offsetY[index];
    })
}
