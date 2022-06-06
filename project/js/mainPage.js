$(function() {
    var letsdraw = false;

    var theCanvas = document.getElementById('drawing-board');
    var toolbar = document.getElementById('toolbar');
    var ctx = theCanvas.getContext('2d');
    theCanvas.width = 1200;
    theCanvas.height = 646;

    //For Redo function
    var cStep = -1;
    var cPushArray = new Array();

    //Needed for the eraser tool
    const context = theCanvas.getContext('2d')
    //context.globalCompositeOperation = 'destination-out';

    //Setting initial values
    context.strokeStyle = stroke.value;
    lineWidth = lineWidth.value;
    ctx.lineCap = 'round';

    var canvasOffset = $('#drawing-board').offset();


    //Eraser and pencil tools
    toolbar.addEventListener('click', e => {
        if(e.target.id === 'eraser') {
            context.globalCompositeOperation = 'destination-out';
        }
    });

    toolbar.addEventListener('click', e => {
        if(e.target.id === 'pencil') {
              context.strokeStyle = stroke.value;
              context.globalCompositeOperation = 'source-over' // new
          }
    });

    toolbar.addEventListener('click', e => {
        if(e.target.id === 'fill') {

          }
    });


    //Color Tool
    toolbar.addEventListener('change', e => {
        if(e.target.id === 'stroke') {
            ctx.strokeStyle = e.target.value;
        }
    });


    //Line Width Tool
    toolbar.addEventListener('change', e => {
        if(e.target.id === 'lineWidth') {
            lineWidth = e.target.value;
        }
    })

    //Clear Tools
    toolbar.addEventListener('click', e => {
        if (e.target.id === 'clear') {
            ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
            cPush();
        }

        //pen cap shape (probably not needed)
        if(e.target.id === 'butt') {
            ctx.lineCap = 'butt';
        }
        if(e.target.id === 'square') {
            ctx.lineCap = 'square';
        }
        if(e.target.id === 'round') {
            ctx.lineCap = 'round';
        }
    });

    //Save to stack
    function cPush() {
      cStep++;
      console.log(cStep);
      if (cStep < cPushArray.length) { cPushArray.length = cStep; }
      cPushArray.push(theCanvas.toDataURL());
    }
    cPush();

    //Undo
    toolbar.addEventListener('click', e => {
        if (e.target.id === 'undo') {
          if (cStep > 0) {
              cStep--;
              console.log(cStep);
              var canvasPic = new Image();
              canvasPic.src = cPushArray[cStep];

              //load last stack image
              canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
              ctx.clearRect(0, 0, theCanvas.width, theCanvas.height);
          }
        }
    });

    //Redo
    toolbar.addEventListener('click', e => {
        if (e.target.id === 'redo') {
          if (cStep < cPushArray.length-1) {
              cStep++;
              console.log(cStep);
              var canvasPic = new Image();
              canvasPic.src = cPushArray[cStep];
              //load stack image + 1
              canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
          }
        }
    });


    //Drawing Function
    $('#drawing-board').mousemove(function(e) {
        if (letsdraw === true) {
            //Draw line
            ctx.lineTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
            ctx.stroke();

        }
    });

    $('#drawing-board').mousedown(function(e) {
        letsdraw = true;
        ctx.lineWidth = lineWidth;
        //ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top);
        cPush();
    });

    $('#drawing-board').mouseleave(function() {
      if(letsdraw) {
        letsdraw = false;
      }
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
