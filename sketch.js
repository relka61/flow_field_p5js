const density = 110;
const angleMult = 0.005;
var points = [];
var timer = 0;



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  strokeWeight(2);
  frameRate(60);
  
  //angleMode(DEGREES)
  noiseDetail(1);

  var space = width / density;

  for (let x = 0; x < width + 1; x += space) {
    for (let y = 0; y < height + 1; y += space) { 
        points.push(createVector(
          x + random(-height/10, height/10), 
          y + random(-height/10, height/10)));
    }
  }
}



function draw() {
  background(0, 10);

  for (let i = 0; i < points.length; i++) {

    let r = map(points[i].x, 0, width, 50, 255);
    let g = map(points[i].y, 0, height, 50, 255);
    let b = map(points[i].x, 0, width, 255, 50);
    //let circle = map(sq(points[i].x - width/2) + sq(points[i].y - height/2), 0, sq(height/2.2), 255, 0);
    stroke(r, g, b);

    let angle = map(noise(points[i].x * angleMult, points[i].y* angleMult), 0, 1, 0, 360);
    points[i].add(createVector(cos(angle), sin(angle)));

    point(points[i].x, points[i].y);

    let xPos = points[i].x;
    let yPos = points[i].y;
    if (xPos <= 0 || xPos >= width || yPos <= 0 || yPos >= height) {
      points[i] = createVector(random(0, width), random(0, height));
    }
    //if (sq(xPos - width/2) + sq(yPos - height/2) >= sq(height/2)) {
      //points[i] = createVector(random(0, width), random(0, height));
    //} 
  }

  if (millis() >= 10000 + timer) {
    noiseSeed(random(1000));
    timer = millis();
  }
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);

  points = [];
  var space = width / density;

  for (let x = 0; x < width + 1; x += space) {
    for (let y = 0; y < height + 1; y += space) { 
        points.push(createVector(
          x + random(-height/10, height/10), 
          y + random(-height/10, height/10)));
    }
  }
}
