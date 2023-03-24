let walls = [];
let numOfWalls = 10;
let ray;
let particle;

function setup() {
  createCanvas(1024, 800);
  label = createDiv('Number of rays per particle: ');
  label.position(30, height + 30);
  label.style.fontSize = "x-large";
  slider = createSlider(10, 360, 1);
  slider.parent(label);

  for (let i = 0; i < numOfWalls; i += 1) {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);
    console.log(x1, y1, x2, y2);
    walls[i] = new Boundry(x1, y1, x2, y2);
  }
  walls.push(new Boundry(0, 0, 0, height));
  walls.push(new Boundry(0, 0, width, 0));
  walls.push(new Boundry(width, height, 0, height));
  walls.push(new Boundry(width, height, width, 0));

  console.log(walls.length)
  particle = new Particle(100, 200, 360);
}

function draw() {
  background(51);

  numOfRays = slider.value();
  particle.setNumOfRays(numOfRays);

  particle.setPos(mouseX, mouseY);
  particle.show();
  for (let wall of walls)
    wall.show();
  particle.castAt(walls);
}
