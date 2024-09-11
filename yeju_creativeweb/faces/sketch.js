let eyeBall;

function preload() {
    eyeBall = loadImage("eyeball.png")

  
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  //background(220);
  
  let f = new Face();
  f.display();
  
}

// blueprint for a Face object
class Face {
  
  // properties
  constructor() {
    this.size = random(30, 60);
    this.x = random(width);
    this.y = random(height);
    this.skinColor = color(random(256), random(256), random(256));
    
    this.eyeColor = color(random(256), random(256), random(256))
    this.eyeSize = random(8, 20);
    this.eyeDistance = random(10, 30);
    this.eyeHeight = random(4, 10);

  }
  
  // methods
  display() {
    // draw the face
    fill(this.skinColor);
    ellipse(this.x, this.y, this.size);
    
    // draw the eyes
    fill(this.eyeColor);
    
    // left eye
    image(eyeBall,this.x - this.eyeDistance / 2, this.y - this.eyeHeight, this.eyeSize)
    
    // right eye
    image(eyeBall, this.x + this.eyeDistance / 2, this.y - this.eyeHeight, this.eyeSize)
  }
  
  
  
}