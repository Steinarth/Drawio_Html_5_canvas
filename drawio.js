// 1. Define a function namespace called DrawIO
// 2. Create an array to hold on to the shapes currently drawn;

window.drawio = {
    shapes:[],
    selectedShape: $('.selected'),
    canvas: document.getElementById('my-canvas'),
    ctx: document.getElementById('my-canvas').getContext('2d'),
    selectedElement: null,
    fillShape:false,
    thickness:3,
    selected:false,
    text:'',
    fontSize: 25,
    fontFamily: 'Arial',
    color:'#FF0000',
    availableShapes: {
        RECTANGLE: 'rectangle',
        CIRCLE:'circle',
        LINE:'line',
        TEXT:'text',
        SELECT: 'select'
    }
};

// Document is loaded and prased
$(function() {
    // Get the default selected from the HTML
    drawio.selectedShape = $('.selected').data('shape');
    // Document is loaded and parsed
    function drawCanvas() {
        if(drawio.selectedElement) {
            drawio.selectedElement.render();
            for (var i = 0; i < drawio.shapes.length; i++) {
                drawio.shapes[i].render();
            }
        }
    };

    $('#textInput').on('input', function(e) {
        drawio.color = $('#changeColorBtn')[0].style.backgroundColor;
        drawio.selected = false;
        drawio.text = e.target.value;
        if(drawio.selectedElement == null) {
            console.log(drawio.fontSize + 'px ' + drawio.fontFamily);
            drawio.selectedElement = new Textt({x:300, y:100},drawio.text, drawio.color,drawio.fontSize + 'px ' + drawio.fontFamily, drawio.fillShape);
            drawio.selectedElement.resize(drawio.text, drawio.color, drawio.fontSize + 'px ' + drawio.fontFamily);

        } else {
            drawio.ctx.clearRect(0,0, drawio.canvas.width, drawio.canvas.height);
            drawio.selectedElement.resize(drawio.text, drawio.color, drawio.fontSize + 'px ' + drawio.fontFamily);
        }
        drawCanvas();

    });

    $('.textContainerBtn').on('click', function(e) {
        if(drawio.text) {
            drawio.selectedElement.message = drawio.text;
            drawio.shapes.push(drawio.selectedElement);
            drawio.selectedElement = null;
            drawio.text = '';
            drawio.selected = false;
            $('#textInput').val('');
        }
    });

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


    $('.fillCheckbox').on('click', function() {
        if($(".fillCheckbox").is(':checked')) {
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
        if(drawio.selectedElement) {
            drawio.ctx.clearRect(0,0, drawio.canvas.width, drawio.canvas.height);
            drawio.selectedElement.resize(drawio.text, drawio.color, drawio.fontSize + 'px ' + drawio.fontFamily);
            drawCanvas();
        }
    });

    $('#showFontFamily').on('change', function() {
        drawio.fontFamily = $('#showFontFamily').val();
        if(drawio.selectedElement) {
            drawio.ctx.clearRect(0,0, drawio.canvas.width, drawio.canvas.height);
            drawio.selectedElement.resize(drawio.text, drawio.color, drawio.fontSize + 'px ' + drawio.fontFamily);
            drawCanvas();
        }

    });

    // mousedown
    $('#my-canvas').on('mousedown', function(mouseEvent) {
        drawio.color = $('#changeColorBtn')[0].style.backgroundColor;
        switch (drawio.selectedShape) {
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({x:mouseEvent.offsetX, y:mouseEvent.offsetY}, 0, 0,drawio.fillShape, drawio.thickness, drawio.color);
                break;
            case drawio.availableShapes.LINE:
                drawio.selectedElement = new Line({x:mouseEvent.offsetX, y:mouseEvent.offsetY}, drawio.color, drawio.thickness);
                break;
            case drawio.availableShapes.CIRCLE:
                drawio.selectedElement = new Circle({x:mouseEvent.offsetX, y:mouseEvent.offsetY}, drawio.color, drawio.thickness, drawio.fillShape);
                break;
            case drawio.availableShapes.TEXT:
                if(drawio.selectedElement) {
                    if(drawio.selectedElement.beginWidth < mouseEvent.offsetX && drawio.selectedElement.endWidth > mouseEvent.offsetX) {
                        drawio.selected = true;
                    }
                }
                break;
            case drawio.availableShapes.SELECT:

                break;

            default:
                drawio.selectedElement = new Rectangle({x:mouseEvent.offsetX, y:mouseEvent.offsetY},  drawio.color, drawio.thickness);
                break;
        }
    });

    // mousemove
    $('#my-canvas').on('mousemove', function(mouseEvent) {
        if(drawio.selectedElement) {
            if(drawio.selected) {
                drawio.ctx.clearRect(0,0, drawio.canvas.width, drawio.canvas.height);
                drawio.selectedElement.move({x:mouseEvent.offsetX, y:mouseEvent.offsetY});
            } else {
                if(drawio.selectedElement.type === drawio.availableShapes.TEXT) {return;}
                drawio.ctx.clearRect(0,0, drawio.canvas.width, drawio.canvas.height);
                drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
            }
            drawCanvas();
        }
    });

    // mouseup
    $('#my-canvas').on('mouseup', function(mouseEvent) {
        if(drawio.selectedElement) {
            if(drawio.selectedElement.type == drawio.availableShapes.TEXT) {
                drawio.selected = false;
            } else {
                drawio.txt = '';
                drawio.shapes.push(drawio.selectedElement);
                drawio.selectedElement = null;
            }
        }
        drawCanvas();

    });
})
