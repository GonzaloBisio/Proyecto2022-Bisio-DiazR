const canvas = document.getElementById("canvas")
canvas.width = 500
canvas.height = 350

let context = canvas.getContext("2d")
let start_background_color = "white"
context.fillStyle = start_background_color
context.fillRect(0, 0, canvas.width, canvas.height)

let draw_color = "black"
let draw_width = "2"
let is_drawing = false

let restore_array = []
let index = -1

function change_color(element) {
  draw_color = element.style.background
}

canvas.addEventListener("touchstart", start, false)
canvas.addEventListener("touchmove", draw, false)
canvas.addEventListener("mousedown", start, false)
canvas.addEventListener("mousemove", draw, false)

canvas.addEventListener("touchend", parar, false)
canvas.addEventListener("mouseup", parar, false)
canvas.addEventListener("mouseout", parar, false)

function start(event) {
  is_drawing = true
  context.beginPath()
  context.moveTo(event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop)
  event.preventDefault()
}

function draw(event) {
  if (is_drawing) {
    context.lineTo(event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop)
    context.strokeStyle = draw_color
    context.lineWidth = draw_width
    context.lineCap = "round"
    context.lineJoin = "round"
    context.stroke()
  }
  event.preventDefault()
}

function parar(event) {
  if (is_drawing) {
    context.stroke()
    context.closePath()
    is_drawing = false
  }
  event.preventDefault()

  if (event.type != 'mouseout') {
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1
  }

}

function clear_canvas() {
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillRect(0, 0, canvas.width, canvas.height)

  restore_array = [];
  index = -1;
}

function undo_line() {
  if (index <= 0) {
    clear_canvas()
  } else {
    index -= 1
    restore_array.pop()
    context.putImageData(restore_array[index], 0, 0)
  }
}

image_array = ["acuatico.png", "bestia.png", "cannonbolt.png", "cuatrobrazos.png", "diamante.png", "fantasmatico.png", "fuego.png", "insectoide.png", "materiagris.png", "ultrat.png", "xlr8.png"];
const string_array = ["Acuático", "Bestia", "Cannonbolt", "Cuatrobrazos", "Diamante", "Fantasmático", "Fuego", "Insectoide", "Materia Gris", "Ultra T", "XLR-8"];

function get_random_image() {
  random_index = Math.floor(Math.random() * image_array.length)
  selected_image = image_array[random_index];
  document.getElementById("image_shower").src = "./characters/" + selected_image
  selected_name = string_array[random_index];
  document.getElementById("string_shower").innerHTML = selected_name
}

/*

let time = 1

const count = document.getElementById("countdown")

function empezar(){
  let refreshIntelvalId =setInterval(updateTimer,1000)
}


function updateTimer() {
  let seconds = time * 60

  seconds = seconds < 10 ? '0' + seconds : seconds

  count.innerHTML = `00:${seconds}`
  time --

  if (time < 0) { //stop the setInterval whe time = 0 for avoid negative time
    clearInterval(refreshIntervalId);
}

}

*/

document.getElementById('countdown').innerHTML ="0"+2 + ":" + 0+"0";


function empezar() {
  var presentTime = document.getElementById('countdown').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  if(m<0){
    return
  }
  
  document.getElementById('countdown').innerHTML =
    m + ":" + s;
  console.log(m)
  setTimeout(empezar, 1000);
    
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

const btn = document.getElementById('play');

function ocultar(){
{
    btn.style.display = 'none';
}}

