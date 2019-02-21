// Decides when to show the fill checkbox
function showFillCheckBox() {
    switch (drawio.selectedShape) {
        case drawio.availableShapes.RECTANGLE:
            $('.fillLabel').removeClass('hidden');
            break;
        case drawio.availableShapes.CIRCLE:
            $('.fillLabel').removeClass('hidden');
            break;
        default:
            $('.fillLabel').addClass('hidden');
    }
};

// Decides when to show the text box
function showTextBox() {
    switch (drawio.selectedShape) {
        case drawio.availableShapes.TEXT:
            $('#textInput').removeClass('hidden');
            $('.textContainerBtn').removeClass('buttonNot');
            break;
        default:
            $('#textInput').addClass('hidden');
            $('.textContainerBtn').addClass('buttonNot');
    }
};

// Decides when to show width select box
function showWidthBox() {
    switch (drawio.selectedShape) {
        case drawio.availableShapes.CIRCLE:
            $('#widthLabel').removeClass('hidden');
            break;
        case drawio.availableShapes.RECTANGLE:
            $('#widthLabel').removeClass('hidden');
            break;
        case drawio.availableShapes.LINE:
            $('#widthLabel').removeClass('hidden');
            break;
        case drawio.availableShapes.PEN:
            $('#widthLabel').removeClass('hidden');
            break;
        default:
            $('#widthLabel').addClass('hidden');
    }
};

// Decides when to show fontSize select box
function showFontSize() {
    switch (drawio.selectedShape) {
        case drawio.availableShapes.TEXT:
            $('#fontSizeLabel').removeClass('hidden');
            break;
        default:
            $('#fontSizeLabel').addClass('hidden');
    }
};

// Decides when to show the drop down for font-family
function showFontFamily() {
    switch (drawio.selectedShape) {
        case drawio.availableShapes.TEXT:
            $('#showFontFamily').removeClass('hidden');
            break;
        default:
            $('#showFontFamily').addClass('hidden');
    }
};

// Document is loaded and parsed
function drawCanvas() {
    if (drawio.selectedElement) {
        drawio.selectedElement.render();
        for (var i = 0; i < drawio.shapes.length; i++) {
            drawio.shapes[i].render();
        }
    }
};

// Clears the canvas
function clearCanvas() {
    drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
};

// Clears and emptys canvas
function clearAndEmptyCanvas() {
    drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
    drawio.selectedElement = null;
    drawio.shapes = [];
}
