window.drawio = {
    shapes: [],
    undoStack: [],
    offsetX: [],
    offsetY: [],
    selectedShape: $('.selected'),
    canvas: document.getElementById('my-canvas'),
    ctx: document.getElementById('my-canvas').getContext('2d'),
    selectedElement: null,
    fillShape: false,
    thickness: 3,
    selected: false,
    text: '',
    fontSize: 25,
    fontFamily: 'Arial',
    color: '#FF0000',
    availableShapes: {
        RECTANGLE: 'rectangle',
        CIRCLE: 'circle',
        LINE: 'line',
        TEXT: 'text',
        SELECT: 'select',
        PEN: 'pen',
        CLEARCANVAS: 'clearCanvas'
    }
};

// Document is loaded and prased
$(function() {
    // Get the default selected from the HTML
    drawio.selectedShape = $('.selected').data('shape');
    // Show the widthBox if pen
    showWidthBox();
    showTextBox();

    // Document is loaded and parsed
    function drawCanvas() {
        if (drawio.selectedElement) {
            drawio.selectedElement.render();
            for (var i = 0; i < drawio.shapes.length; i++) {
                drawio.shapes[i].render();
            }
        }
    };

    // mousedown
    $('#my-canvas').on('mousedown', function(mouseEvent) {
        drawio.color = $('#changeColorBtn')[0].style.backgroundColor;
        switch (drawio.selectedShape) {
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({
                    x: mouseEvent.offsetX,
                    y: mouseEvent.offsetY
                }, 0, 0, drawio.fillShape, drawio.thickness, drawio.color);
                break;
            case drawio.availableShapes.LINE:
                drawio.selectedElement = new Line({
                    x: mouseEvent.offsetX,
                    y: mouseEvent.offsetY
                }, drawio.color, drawio.thickness);
                break;
            case drawio.availableShapes.CIRCLE:
                drawio.selectedElement = new Circle({
                    x: mouseEvent.offsetX,
                    y: mouseEvent.offsetY
                }, drawio.color, drawio.thickness, drawio.fillShape);
                break;
            case drawio.availableShapes.TEXT:
                if (drawio.selectedElement) {
                    if (drawio.selectedElement.beginWidth < mouseEvent.offsetX && drawio.selectedElement.endWidth > mouseEvent.offsetX) {
                        drawio.selected = true;
                    }
                }
                break;
            case drawio.availableShapes.PEN:
                drawio.selectedElement = new Drawing({
                    x: mouseEvent.offsetX,
                    y: mouseEvent.offsetY
                }, drawio.color, drawio.thickness);
                break;
            case drawio.availableShapes.SELECT:
            console.log(mouseEvent.offsetX, mouseEvent.offsetY);
                drawio.shapes.forEach((el, index) => {
                    if (el.checkSpace(mouseEvent.offsetX, mouseEvent.offsetY) == true) {
                        drawio.selected = true;
                        drawio.selectedElement = drawio.shapes[index];
                        console.log(drawio.selectedElement);
                        return;
                    }
                });
                break;
            default:
                drawio.selectedElement = new Rectangle({
                    x: mouseEvent.offsetX,
                    y: mouseEvent.offsetY
                }, drawio.color, drawio.thickness);
                break;
        }
    });

    // mousemove
    $('#my-canvas').on('mousemove', function(mouseEvent) {
        if (drawio.selectedElement) {
            if (drawio.selected) {
                drawio.selectedElement.move({x: mouseEvent.offsetX, y: mouseEvent.offsetY});
                drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            } else {
                if (drawio.selectedElement.type === drawio.availableShapes.TEXT) {
                    return;
                }
                drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
                drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
            }
            drawCanvas();
        }
    });

    // mouseup
    $('#my-canvas').on('mouseup', function(mouseEvent) {
        if (drawio.selectedElement) {
            if (drawio.selectedElement.type == drawio.availableShapes.TEXT && drawio.selectedShape != 'select') {
                drawio.selected = false;
            } else {
                if (drawio.availableShapes.SELECT == drawio.selectedShape) {
                    drawio.selected = false;
                    drawio.selectedElement.position.x = mouseEvent.offsetX;
                    drawio.selectedElement.position.y = mouseEvent.offsetY;
                }
                drawio.txt = '';
                drawio.shapes.push(drawio.selectedElement);
                drawio.selectedElement = null;
            }
        }
        drawCanvas();

    });
})
