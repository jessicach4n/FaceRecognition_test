let width = window.innerWidth;
let height = window.innerHeight;
let positions = [];
let time = 0;

function setup() {
    createCanvas(width, height);
  }
  
function draw() {
    background(220);
    fill(0);

    positions.push({x: mouseX, y: mouseY});

    if (positions.length > 50) {
      positions.shift();
    }

    for (let i = 0; i < positions.length; i++) {
      ellipse(positions[i].x, positions[i].y, i, i);      
    }
    

    

}

function windowResized() {
  resizeCanvas(width, height, false);
}