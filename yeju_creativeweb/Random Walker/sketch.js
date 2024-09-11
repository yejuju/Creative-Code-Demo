let walker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  walker = new Walker();  
  background(255);  
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  for (let i = 0; i < 9000; i++){
    walker.step(); 
    walker.display();  
  }
}

class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.strokeWeight = random(1, 200);  
  }
  
  step() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
    
    this.r += random(-1, 1);
    this.g += random(-1, 1);
    this.b += random(-1, 1);
    this.r = constrain(this.r, 0, 255);
    this.g = constrain(this.g, 0, 255);
    this.b = constrain(this.b, 0, 255);
    
    this.strokeWeight = map(sin(frameCount * 0.01), -1, 1, 1, 50);
  }
  
  display() {
    strokeWeight(this.strokeWeight);
    stroke(this.r, this.g, this.b);
    point(this.x, this.y);
  }
}
