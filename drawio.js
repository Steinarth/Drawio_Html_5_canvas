// 1. Define a function namespace called DrawIO
// 2. Create an array to hold on to the shapes currently drawn;

window.drawio = {
    shapes:[],
    selectedShape: 'rectangle',
    canvas: document.getElementById('my-canvas'),
    ctx: document.getElementById('my-canvas').getContext('2d'),
    selectedElement: null,
    fillShape:false,
    thickness:3,
    color:'#FF0000',
    availableShapes: {
        RECTANGLE: 'rectangle',
        CIRCLE:'Circle'
    }
};

// Document is loaded and prased
$(function() {
    // Document is loaded and parsed
    function drawCanvas() {
        if(drawio.selectedElement) {
            drawio.selectedElement.render();
            for (var i = 0; i < drawio.shapes.length; i++) {
                drawio.shapes[i].render();
            }
        }
    };

    function showFillCheckBox() {
        switch (drawio.selectedShape) {
            case drawio.availableShapes.RECTANGLE:
                $('.fillLabel').removeClass('hidden');
                break;
            case drawio.availableShapes.CIRCLE:
                $('.fillLabel').removeClass('hidden');
            default:
                $('.fillLabel').addClass('hidden');
        }
    };

    $('.fillLabel').on('click', function() {
        if($(".fillCheckbox").is(':checked')) {
            drawio.fillShape = true;
        } else {
            drawio.fillShape = false;
        }
    });

    $('.icon').on('click', function() {
        console.log($(this).data('shape'));
        $('.icon').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedShape = $(this).data('shape');
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
