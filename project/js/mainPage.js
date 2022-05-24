$(function() {
    var letsdraw = false;

    var theCanvas = document.getElementById('drawing-board');
    var toolbar = document.getElementById('toolbar');
    var ctx = theCanvas.getContext('2d');
    theCanvas.width = 1200;
    theCanvas.height = 646;

    var canvasOffset = $('#drawing-board').offset();

    toolbar.addEventListener('change', e => {
        if(e.target.id === 'stroke') {
            ctx.strokeStyle = e.target.value;
        }
    });
    toolbar.addEventListener('change', e => {
        if(e.target.id === 'lineWidth') {
            lineWidth = e.target.value;
        }
    })
    toolbar.addEventListener('click', e => {
        if (e.target.id === 'clear') {
            ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
        }
    });

    $('#drawing-board').mousemove(function(e) {
        if (letsdraw === true) {
            ctx.lineTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
            ctx.stroke();
        }
    });

    $('#drawing-board').mousedown(function() {
        letsdraw = true;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
    });

    $(window).mouseup(function() {
        letsdraw = false;
    });
});

$("#showPopUp").on("click", function () {
    $(".center").show();
    $(this).hide();
})

$("#closePopUp").on('click', function () {
    $(".center").hide();
    $("#showPopUp").show();
})

function toggle() {
  var blur = document.getElementById('blur');
  blur.classList.toggle('active');
  var popup = document.getElementById('#showPopUp');
}




// ------------------------------------------------------------
// Old code

// const canvas = document.getElementById('drawing-board');
// const toolbar = document.getElementById('toolbar');
// const ctx = canvas.getContext('2d');
// canvas.height = 420;
// canvas.width = 300;
//
// const canvasOffsetX = canvas.offsetLeft;
// const canvasOffsetY = canvas.offsetTop;
//
// canvas.width = window.innerWidth - canvasOffsetX;
// canvas.height = window.innerHeight - canvasOffsetY;
//
// let isPainting = false;
// let lineWidth = 5;
// let startX;
// let startY;
//
// toolbar.addEventListener('click', e => {
//     if (e.target.id === 'clear') {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//     }
// });
//
// toolbar.addEventListener('change', e => {
//     if(e.target.id === 'stroke') {
//         ctx.strokeStyle = e.target.value;
//     }
//
//     if(e.target.id === 'lineWidth') {
//         lineWidth = e.target.value;
//     }
//
// });
//
// const draw = (e) => {
//     if(!isPainting) {
//         return;
//     }
//
//     ctx.lineWidth = lineWidth;
//     ctx.lineCap = 'round';
//
//     ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
//     ctx.stroke();
// }
//
// canvas.addEventListener('mousedown', (e) => {
//     isPainting = true;
//     startX = e.clientX;
//     startY = e.clientY;
// });
//
// canvas.addEventListener('mouseup', e => {
//     isPainting = false;
//     ctx.stroke();
//     ctx.beginPath();
// });
//
// canvas.addEventListener('mousemove', draw);
