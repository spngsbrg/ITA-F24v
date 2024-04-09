let x = 100;
let y = 150;

const obj = document.getElementById("square");

function pos(dx, dy) {
  x += 10 * dx;
  y += 10 * dy;

  obj.style.top = y + "px";
  obj.style.left = x + "px";
}

function hideSquare() {
  obj.style.display = "none";
}

function showSquare() {
  obj.style.display = "block";
}
