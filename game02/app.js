const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const fill = document.getElementById("jsFill");
const paint = document.getElementById("jsPaint");
const reset = document.getElementById("jsReset");
const btnSave = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect (0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting () {
    painting = true;
}

function stopPainting () {
    painting = false;
}

function onMouseMove (event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick (event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    for (var i = 0; i < colors.length; i++) {
        colors[i].classList.remove('on');
      }

    this.classList.add('on');
    }

function handleRangeChange (event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleFillClick () {
    filling = false;
    fill.classList.add('on');
    paint.classList.remove('on');
}

function handlePaintClick () {
    filling = true;    
    paint.classList.add('on');
    fill.classList.remove('on');
}

function handleCanvasClick () {
    if (filling) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);   
}

function handleResetClick () {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleCM (event) {
    event.preventDefault();
}

function handleSaveClick () {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mousedown", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);


if (range) {
    range.addEventListener("input", handleRangeChange)
}

if (fill) {
    fill.addEventListener("click", handleFillClick)
}

if (paint) {
    paint.addEventListener("click", handlePaintClick)
}

if (reset) {
    reset.addEventListener("click", handleResetClick)
}

if (btnSave) {
    btnSave.addEventListener("click", handleSaveClick)
}