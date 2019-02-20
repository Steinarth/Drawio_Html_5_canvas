/****
  Drawing properties
****/

function Drawing(position, color, thickness) {
    Shape.call(this, position, color, thickness);
    this.points = []; // Keeps track of points we need to draw (x,y) coordinates
    this.type = 'drawing';
}

Drawing.prototype = Object.create(Shape.prototype);
Drawing.prototype.constructor = Drawing;

// Push new x,y coordinates into our array
Drawing.prototype.resize = function(x, y) {
    this.points.push({x: x, y: y});
}

Drawing.prototype.render = function() {
    drawio.ctx.beginPath();
    drawio.ctx.moveTo(this.position.x, this.position.y);
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

Drawing.prototype.checkSpace = function(x,y) {
    console.log('points:', this.points);
    return true;
}

Drawing.prototype.move = function({x,y}) {
    console.log(this.points);
    this.points.forEach((el) => {
        el.x += 10;
        el.y += 10;
    });
    console.log(this.points);
}
