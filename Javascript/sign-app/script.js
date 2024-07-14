document.addEventListener('DOMContentLoaded',()=>{

const textColor = document.getElementById("colorPicker");
const bgcolor = document.getElementById("bgPicker");

const clearbtn = document.getElementById("clearbtn");
const download = document.getElementById("downloadbtn");
const retrieve = document.getElementById("retrievebtn");

const size = document.getElementById("fontsize");

const canvas = document.getElementById("myCanvas");
const can = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;

textColor.addEventListener('change', (e) => {
    can.strokeStyle = e.target.value;
    can.fillStyle = e.target.value;
});

bgcolor.addEventListener('change', (e) => {
    canvas.style.backgroundColor = e.target.value;
});

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        can.beginPath();
        can.moveTo(lastX, lastY);
        can.lineTo(e.offsetX, e.offsetY);
        can.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

clearbtn.addEventListener('click', () => {
    can.clearRect(0, 0, canvas.width, canvas.height);
});

download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

retrieve.addEventListener('click', () => {
    const dataUrl = localStorage.getItem('canvasData');
    if (dataUrl) {
        const img = new Image();
        img.onload = () => {
            can.drawImage(img, 0, 0);
        };
        img.src = dataUrl;
    }
});

window.addEventListener('beforeunload', () => {
    localStorage.setItem('canvasData', canvas.toDataURL());
});

size.addEventListener('change', (e) => {
    can.lineWidth = e.target.value;
});


})