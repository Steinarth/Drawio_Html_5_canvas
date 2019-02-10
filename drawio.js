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
    color:'#FF0000',
    availableShapes: {
        RECTANGLE: 'rectangle',
        CIRCLE:'circle',
        LINE:'line'
    }
};

// Document is loaded and prased
$(function() {
    // Get the default selected from the HTML
    drawio.selectedShape = $('.selected').data('shape');

    // Document is loaded and parsed
    function drawCanvas() {
        if(drawio.selectedElement) {
            console.log('here with:', drawio.selectedElement);
            drawio.selectedElement.render();
            for (var i = 0; i < drawio.shapes.length; i++) {
                drawio.shapes[i].render();
            }
        }
    };

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

    $('.fillCheckbox').on('click', function() {
        if($(".fillCheckbox").is(':checked')) {
            console.log('true');
            drawio.fillShape = true;
        } else {
            drawio.fillShape = false;
        }
    });

    $('.icon').on('click', function() {
        $('.icon').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedShape = $(this).data('shape');
        console.log(drawio.selectedShape);
        showFillCheckBox();
    });

    $('#widthInput').on('change', function() {
        drawio.thickness = $('#widthInput').val();
        console.log('changed width TO:::', $('#widthInput').val());
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
            default:
                drawio.selectedElement = new Rectangle({x:mouseEvent.offsetX, y:mouseEvent.offsetY}, 0, 0,drawio.fillShape, drawio.thickness, drawio.color);
                break;
        }
    });

    // mousemove
    $('#my-canvas').on('mousemove', function(mouseEvent) {
        if(drawio.selectedElement) {
            drawio.ctx.clearRect(0,0, drawio.canvas.width, drawio.canvas.height);
            drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
            drawCanvas();
        }
    });

    // mouseup
    $('#my-canvas').on('mouseup', function(mouseEvent) {
        drawio.shapes.push(drawio.selectedElement);
        drawio.selectedElement = null;
    });
})
