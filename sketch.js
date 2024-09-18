const density = 80; //How many points per area
const scale = 0.001; //Scale for noise, higher is less noisy
var points = []; //Array of all points
var time = 0; //Time; used to change flow field over time
const timeScale = 0.0002; 
var img; //Image used for colour lookup


//Runs before draw function
function setup() {
  //Setup the canvas
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  noStroke();
  
  //Noise settings
  angleMode(DEGREES);
  noiseDetail(100);

  //Create all points
  reset();

  //Load and resize image
  img = loadImage('images/garchomp.png');
}


//Main loop
function draw() {
  //Background each frame
  //background(0, 10);

  //Load the image for colour lookup
  img.loadPixels();
  
  for (let i = 0; i < points.length; i++) {
    //Move the points based on noise
    points[i].add(updatePoint(points[i].x, points[i].y));

    //Draw each point to the screen
    drawPoint(points[i].x, points[i].y);

    //Reset points if offscreen
    if (checkBoundaries(points[i].x, points[i].y)) {
      points[i] = createVector(random(0, width), random(0, height));
    }
  }
}


//Save the current canvas if "s" is pressed
function keyPressed() {
  if (key == "s" || key == "S") {
    saveCanvas()
  }
}





//Move a point based on the noise at its location
function updatePoint(x, y) {
  let angle = map(noise(x * scale, y* scale, frameCount * timeScale), 0, 1, 0, 720);
  return createVector(cos(angle), sin(angle));
}


//Draw a point to the screen
function drawPoint(x, y) {
  //Determine index for colour lookup in pixels
  let xToGet = floor(map(x, 0, width, 0, img.width));
  let yToGet = floor(map(y, 0, height, 0, img.height));
  let startingIndex = 4 * (yToGet * img.height + xToGet);

  //Set fill colour for this point
  fill(img.pixels[startingIndex], img.pixels[startingIndex+1], img.pixels[startingIndex+2], 255);

  //Draw the point
  ellipse(x, y, 1);
}


//Determine if a point is offscreen
function checkBoundaries(x, y) {
  return (x <= 0 || x >= width || y <= 0 || y >= height);
}


//Resets the background and all points
function reset()  {
  //Reset canvas
  resizeCanvas(windowWidth, windowHeight);
  background(0);

  //Create all points
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


//Reset if window is resized
function windowResized() {
  reset();
}
