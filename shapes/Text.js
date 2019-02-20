/**
    * Textt
**/

function Textt(beginPosition, message, color, font, filled) {
    Shape.call(this, beginPosition, color);
    this.message = message;
    this.filled = filled;
    this.type = 'text';
    this.font = font;
    this.beginWidth = -beginPosition.x - drawio.ctx.measureText(message).width;
    this.endWidth = beginPosition.x + drawio.ctx.measureText(message).width;
};

// Assign the prototype
Textt.prototype = Object.create(Shape.prototype);
Textt.prototype.constructor = Textt;

Textt.prototype.render = function() {
    drawio.ctx.font = this.font;

    drawio.ctx.fillStyle = this.color;

    drawio.ctx.fillText(this.message, this.position.x, this.position.y);
};

Textt.prototype.resize = function(text, color, font) {
    this.beginWidth = this.position.x - drawio.ctx.measureText(text).width;
    this.endWidth = this.position.x + drawio.ctx.measureText(text).width;

    this.text = text;
    this.color = color;
    this.font = font;

    drawio.ctx.fillStyle = this.color;
    drawio.ctx.font = this.font;
    drawio.ctx.fillText(this.text, this.position.x, this.position.y);
};

Textt.prototype.move = function(position) {
    this.position = position;
    this.beginWidth = this.position.x - drawio.ctx.measureText(this.text).width;
    this.endWidth = this.position.x + drawio.ctx.measureText(this.text).width;

    drawio.ctx.fillStyle = this.color;
    drawio.ctx.font = this.font;
    drawio.ctx.fillText(this.text, this.position.x, this.position.y);
};

Textt.prototype.checkSpace = function(x, y) {
    console.log(this.position, y);
    lineHeight = drawio.ctx.measureText('M').width;
    console.log(lineHeight);
    // Correct x coordinates
    if (this.beginWidth < x && this.endWidth > x) {
        // Correct y coords
        if (y < this.position.y + lineHeight && this.position.y - lineHeight < y) {
            return true;
        }
    }

}
