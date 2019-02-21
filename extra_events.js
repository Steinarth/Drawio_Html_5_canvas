$('#textInput').on('input', function(e) {
    drawio.color = $('#changeColorBtn')[0].style.backgroundColor;
    drawio.selected = false;
    drawio.text = e.target.value;
    if (drawio.selectedElement == null) {
        drawio.selectedElement = new Textt({
            x: 300,
            y: 100
        }, drawio.text, drawio.color, drawio.fontSize + 'px ' + drawio.fontFamily, drawio.fillShape);
        drawio.selectedElement.resize(drawio.text, drawio.color, drawio.fontSize + 'px ' + drawio.fontFamily);
    } else {
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawio.selectedElement.resize(drawio.text, drawio.color, drawio.fontSize + 'px ' + drawio.fontFamily);
    }
    drawCanvas();
});

$('.textContainerBtn').on('click', function(e) {
    if (drawio.text) {
        drawio.selectedElement.message = drawio.text;
        drawio.shapes.push(drawio.selectedElement);
        drawio.selectedElement = null;
        drawio.text = '';
        drawio.selected = false;
        $('#textInput').val('');
    }
});

$('#clearCanvas').on('click', function(e) {
    clearAndEmptyCanvas();
});

// Functionality for redo-ing
$('#redoArrow').on('click', function(e) {
    drawio.selectedElement = null;
    if (drawio.undoStack.length > 0) {
        let i = drawio.undoStack.pop();
        drawio.shapes.push(i);
        i.render();
    }
});

// Functionality when undo-ing
$('#undoArrow').on('click', function(e) {
    if (drawio.shapes.length > 0) {
        let b = drawio.shapes.pop();
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawio.undoStack.push(b);
        for (var i = 0; i < drawio.shapes.length; i++) {
            drawio.shapes[i].render();
        }
    }
});

$('.fillCheckbox').on('click', function() {
    if ($(".fillCheckbox").is(':checked')) {
        drawio.fillShape = true;
    } else {
        drawio.fillShape = false;
    }
});

$('.icon').on('click', function() {
    $('.icon').removeClass('selected');
    $(this).addClass('selected');
    drawio.selectedShape = $(this).data('shape');
    showFillCheckBox();
    showTextBox();
    showWidthBox();
    showFontSize();
    showFontFamily();
});

$('#widthInput').on('change', function() {
    drawio.thickness = $('#widthInput').val();
});

$('#fontSizeInput').on('change', function() {
    drawio.fontSize = $('#fontSizeInput').val();
    if (drawio.selectedElement) {
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawio.selectedElement.resize(drawio.text, drawio.color, drawio.fontSize + 'px ' + drawio.fontFamily);
        drawCanvas();
    }
});

$('#showFontFamily').on('change', function() {
    drawio.fontFamily = $('#showFontFamily').val();
    if (drawio.selectedElement) {
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawio.selectedElement.resize(drawio.text, drawio.color, drawio.fontSize + 'px ' + drawio.fontFamily);
        drawCanvas();
    }

});

$('.fa-save').on('click', function() {
    localStorage.setItem('shapes', JSON.stringify(drawio.shapes));
    clearAndEmptyCanvas();
});

$('.fa-download').on('click', function() {
    var shapes = JSON.parse(localStorage.getItem('shapes'));
    shapes.forEach((shape) => {
        switch (shape.type) {
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({
                    x: shape.position.x,
                    y: shape.position.y
                }, shape.width, shape.height, shape.filled, shape.color, shape.thickness);
                break;
            case drawio.availableShapes.LINE:
                drawio.selectedElement = new Line({
                    x: shape.position.x,
                    y: shape.position.y
                }, shape.color, shape.thickness);
                drawio.selectedElement.resize(shape.endPosition.x, shape.endPosition.y);
                break;
            case drawio.availableShapes.CIRCLE:
                drawio.selectedElement = new Circle({
                    x: shape.position.x,
                    y: shape.position.y
                }, shape.radius, shape.color, shape.thickness, shape.filled);
                break;
            case drawio.availableShapes.TEXT:
                console.log(shape);
                drawio.selectedElement = new Textt({
                    x: shape.position.x,
                    y: shape.position.y
                }, shape.message, shape.color, shape.font, shape.filled);
                break;
            case drawio.availableShapes.PEN:
                drawio.selectedElement = new Drawing({
                    x: shape.position.x,
                    y: shape.position.y
                }, shape.color, shape.thickness);
                drawio.selectedElement.addPoints(shape.points);
                break;
            default:
        }
        drawio.shapes.push(drawio.selectedElement);
        drawCanvas();
        drawio.selectedElement = null;
    });
});
