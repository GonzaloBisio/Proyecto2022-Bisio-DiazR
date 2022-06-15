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
  is_drawing= true
  context.beginPath()
  context.moveTo(event.clientX - canvas.offsetLeft,
    event.clientY - canvas.offsetTop)
  event.preventDefault()
}

function draw(event) {
  if (is_drawing) {
    context.lineTo(event.clientX - canvas.offsetLeft,event.clientY - canvas.offsetTop)
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

image_array = ["ben10.png", "bob.png", "caillou.png", "gaturro.png", "goku.png", "homer.png", "marge.png", "morty.png", "patricio.png", "pikachu.png", "rick.png", "shrek.png", "stitch.png", "timmy.png"];
const string_array = ["Ben 10", "Bob Esponja", "Caillou", "Gaturro", "Goku", "Homero", "Marge", "Morty", "Patricio", "Pikachu", "Rick", "Shrek", "Stitch", "Timmy Turner"];

function get_random_image() {
  random_index = Math.floor(Math.random() * image_array.length)
  selected_image = image_array[random_index];
  selected_name = string_array[random_index];
  document.getElementById("string_shower").innerHTML = selected_name
  context.fillStyle = start_background_color;
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillRect(0, 0, canvas.width, canvas.height)

  restore_array = [];
  index = -1;
}

const btn = document.getElementById('play');

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

async function tiempo(){
  document.getElementById("image_shower").src = "./img/a.png";
  btn.style.visibility = 'hidden';
  for (var i = 59; i > -1; i--) {
    await delay(1000);
    n = i;
    console.log(i);
    if (i<10){
      n = "0" + n;
    }
    document.getElementById('countdown').innerHTML = "00:" + n;
 }
 btn.style.visibility= 'visible';
 document.getElementById('countdown').innerHTML = "01:00";
 document.getElementById("image_shower").src = "./characters/" + selected_image;
 is_drawing = false;
}

