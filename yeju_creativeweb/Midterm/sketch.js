let cols, rows;
let current, previous;
let dampening = 0.99; // between 0 and 1.

// Particle System variables
let colorInc = 0.5; // the color changing speed could be adjusted.
let sat = 100; // saturation max 100
let brt = 100; // brightness max 100
let alph = 10; // alpha max 100
let numbPart = 200; //number of particles; how many individual lines gonna move? (default number: 300?)
let partStroke = 1; // line width, ;thickness
let angMult = 25; //0.1 = straighter lines; 25+ = sharp curves, being more curvy. -> ex) var angle = 45, and if, var angMult = 2, then the new angle becomes 90 degrees.
let angTurn = 4; // adjust angle for straight lines (after adjusting angMult)
let zOffInc = 0.0003; // (z offset increment), speed of vactor changes
let inc = 0.09; // the more increment, the more noise changes, more noise detail
let sclX = 2.5;  // Cell width
let sclY = 2.5;  // Cell height
let zoff = 0;
let particles = []; 
let flowfield; // how particles move.
let hu = 0; // hue = 0: red;
let p = 1;

function setup() {
  createCanvas(1000, 562.5);
  colorMode(HSB, 359, 100, 100, 100);  // HSB: hue, saturation, brightness; hue ranges to 0 to 359 (red)
  background(255);
  
  cols = floor(width / sclX);  // Number of columns; floor could get rid of the decimal place
  rows = floor(height / sclY); // Number of rows

  // 'current' and 'previous' are buffers 
  current = new Array(cols).fill(0).map(n => new Array(rows).fill(0));  // cols = how many columns (vertical boxes) there are on the grid
  previous = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
  
  flowfield = new Array(cols * rows);

  for (let i = 0; i < numbPart; i++) {
    particles[i] = new Particle();
  }
  
}

function windowResized() {
  resizeCanvas(1000, 562.5);
  background(255);
  cols = floor(width / sclX);  // Number of columns; floor could get rid of the decimal place
  rows = floor(height / sclY); // Number of rows
  // 'current' and 'previous' are buffers 
  current = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
  previous = new Array(cols).fill(0).map(n => new Array(rows).fill(0));
  
  flowfield = new Array(cols * rows);
}

function draw() {
  background(0, 0.1); // Transparent background for smooth blending
  
 
  loadPixels();
  for (let i = 1; i < cols - 1; i++) { // looping non edge element
    for (let j = 1; j < rows - 1; j++) { // looping non edge element
      
      current[i][j] =
        (previous[i - 1][j] +
         previous[i + 1][j] +
         previous[i][j - 1] +
         previous[i][j + 1] +
         previous[i - 1][j - 1] + 
         previous[i + 1][j + 1] + 
         previous[i - 1][j + 1] + 
         previous[i + 1][j - 1]) / 4 - 
        current[i][j];
      current[i][j] *= dampening; // can't memorize this formula. 
      
      // Drawing the ripple effect
      let x = i * sclX;
      let y = j * sclY;
      let rippleValue = current[i][j];
      
      // Apply coloring to the ripple effect
      let hue = map(rippleValue, -100, 100, 0, 359); // if the ripple is weak (like -100), use color 0(red). Strong (100), use color 359(red).
      let brightness = map(rippleValue, -100, 100, 50, 100); // -100 to 100, and 50 to 100. 
      let rippleColor = color(hue, 100, brightness, 100); // Full saturation, variable brightness
      
      // Draw ripple
      noStroke();
      fill(rippleColor);
      rect(x, y, sclX, sclY); 
    }
  }
  
  let temp = previous;
  previous = current;
  current = temp;
  
  // Perlin Noise Flow Field for Particles
  if (p > 0) {
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
      let xoff = 0;
      for (let x = 0; x < cols; x++) {
        let index = x + y * cols;
        let angle = noise(xoff, yoff, zoff) * angMult * angTurn; // creates a random angle using Perlin noise, which will decide the direction 
        let v = p5.Vector.fromAngle(angle); // create a 'vector'(direction and speed), based on that angle
        v.setMag(0.5); // speed (magnitude) of the vector
        flowfield[index] = v; // v(vector) = direction of the flowfield
        xoff += inc; //increace
      }
      yoff += inc;
      zoff += zOffInc;
    }
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield);
      particles[i].update();
      particles[i].edges();
      particles[i].show();  // Ensure this is drawn after the ripple effect
    }
    
    hu += colorInc; // smooth slow color changing (0 to 359)
    if (hu > 359) { hu = 0; }
  }
}

function mouseDragged() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    previous[floor(mouseX / sclX)][floor(mouseY / sclY)] = 2500;  // Water ripple on mouse drag
  }
}
// mouseX > 0 : not to the left
// mouseX < width : not to the right of the canvas
// mouseY > 0 : not above the canvas
// mouseY < height : not below the canvas

function mousePressed() {
  p *= -1;  // p=-1 means pause, p=1 means start
}
