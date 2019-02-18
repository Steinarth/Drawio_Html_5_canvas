// parent function everyone else inherits
function Shape(position,color,thickness=null) {
    this.position = position;
    this.color = color;
    this.thickness = thickness;
    this.type = "notText";
};

Shape.prototype.render = function() { };

// changes the location of the shape
Shape.prototype.move = function(position) {
    this.position = position;
};

Shape.prototype.checkSpace = function(x,y) {return false;}

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

Rectangle.prototype.checkSpace = function(x,y) {
    if(this.position.x < x && x < this.position.x+this.width &&
        this.position.y < y && y < this.position.y+this.height) {
        return true;
    }
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
    // Starting point (beginPosition)
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

// changes the location of the Line
Line.prototype.move = function(position) {
    this.xLength = this.endPosition.x-this.position.x;
    this.yLength = this.endPosition.y-this.position.y;

    this.position = position;

    this.endPosition.x = position.x + this.xLength;
    this.endPosition.y = position.y + this.yLength;
};

Rectangle.prototype.checkSpace = function(x,y) {
    if(this.position.x < x && x < this.position.x+this.width &&
        this.position.y < y && y < this.position.y+this.height) {
        return true;
    }
};

Line.prototype.checkSpace = function(x,y) {
    console.log(this.position, {x:x,y:y}, this.endPosition);
    if(this.position.x < x && x < this.endPosition.x &&
       this.position.y < y && y < this.endPosition.y) {
           return true;
   }

   if(x < this.position.x  && this.endPosition.x < x &&
      this.position.y < y  && y < this.endPosition.y) {
          return true;
  }
  
   return false;
};

/**
    * Circle
**/

function Circle(beginPosition,color,thickness, filled) {
    Shape.call(this,beginPosition, color, thickness);
    // We don't know the radius at the beginning
    this.radius = null;
    this.filled = filled;
};

// Assign the prototype
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function() {
    drawio.ctx.beginPath();
    // Set the linewidth to thickness
    drawio.ctx.lineWidth  = this.thickness;
    // change the color of the line
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.fillStyle = this.color;

    drawio.ctx.arc(this.position.x, this.position.y, this.radius, (Math.PI/180)*0, (Math.PI/180)*360, true);

    if(this.filled) {
        //filled  circle
        drawio.ctx.fill();
    } else {
        drawio.ctx.stroke();
    }
     drawio.ctx.closePath();
};

Circle.prototype.resize = function(x,y) {
    var oldX = this.position.x;
    var oldY = this.position.y;
    var xLength = x - oldX;
    var yLength = y - oldY;
    this.radius = Math.sqrt(xLength * xLength + yLength * yLength);
};

/**
    * Textt
**/

function Textt(beginPosition,message,color,font, filled) {
    Shape.call(this,beginPosition, color);
    this.message = message;
    this.filled = filled;
    this.type = 'text';
    this.font = font;
    this.beginWidth = beginPosition.x-drawio.ctx.measureText(message).width;
    this.endWidth   = beginPosition.x +drawio.ctx.measureText(message).width;
};

// Assign the prototype
Textt.prototype = Object.create(Shape.prototype);
Textt.prototype.constructor = Textt;

Textt.prototype.render = function() {
    drawio.ctx.font=this.font;

    drawio.ctx.fillStyle = this.color;

    drawio.ctx.fillText (this.message, this.position.x,this.position.y);
};

Textt.prototype.resize = function(text,color,font) {
    this.beginWidth = this.position.x-drawio.ctx.measureText(text).width;
    this.endWidth   = this.position.x +drawio.ctx.measureText(text).width;

    this.text = text;
    this.color = color;
    this.font = font;

    drawio.ctx.fillStyle = this.color;
    drawio.ctx.font = this.font;
    drawio.ctx.fillText (this.text, this.position.x,this.position.y);
};

Textt.prototype.move = function(position) {
    this.position = position;
    this.beginWidth = this.position.x - drawio.ctx.measureText(this.text).width;
    this.endWidth   = this.position.x + drawio.ctx.measureText(this.text).width;

    drawio.ctx.fillStyle = this.color;
    drawio.ctx.font = this.font;
    drawio.ctx.fillText (this.text, this.position.x,this.position.y);
};

/****
  Drawing properties
****/

function Drawing(position, color, thickness) {
    Shape.call(this, position, color,thickness);
      this.points = []; // Keeps track of points we need to draw (x,y) coordinates
    this.type = 'drawing';
  }

  Drawing.prototype = Object.create(Shape.prototype);
  Drawing.prototype.constructor = Drawing;

  // Push new x,y coordinates into our array
  Drawing.prototype.resize = function(x, y) {
      this.points.push({x:x, y:y});
  }

  Drawing.prototype.render = function() {
      drawio.ctx.beginPath();
      drawio.ctx.moveTo(this.position.x, this.position.y);
      drawio.ctx.lineWidth = this.thickness;
      for(var i = 0; i < this.points.length; i++) {
        drawio.ctx.lineTo(this.points[i].x, this.points[i].y);
      }

      drawio.ctx.strokeStyle = this.color;
      drawio.ctx.stroke();
  }
  Drawing.prototype.addPoints = function(points) {
    this.points = points;
  }
