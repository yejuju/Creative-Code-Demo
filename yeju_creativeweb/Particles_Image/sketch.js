const particleSize = 8;
const RESOLUTION = 10;
const MAX_FORCE = 3;
const MIN_FORCE = 0;
const MAX_AGE = 255;  // Maximum age of the particle

let imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Claude_Monet_-_Water_Lilies%2C_1917-1919.JPG/2880px-Claude_Monet_-_Water_Lilies%2C_1917-1919.JPG';
let img;
let particles = [];
let sound;


function preload() {
    img = loadImage(imgUrl);
    sound = loadSound("Hit2.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    spawnParticles();
}

function draw() {
    background(40);

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // disappear over time
        if (particle.age <= 0) {
            particles.splice(index, 1);
        }
    });
}

function spawnParticles() {
    for (let i = 0; i < width; i += RESOLUTION) {
        for (let j = 0; j < height; j += RESOLUTION) {
            
            let x = map(i, 0, width, 0, img.width);
            let y = map(j, 0, height, 0, img.height);

            
            const color = img.get(x, y);

            particles.push(
                new Particle(i + particleSize / 2, j + particleSize / 2, color)
            );
        }
    }
}


class Particle {
    constructor(x, y, color) {
        // Initial position
        this.pos = createVector(x, y);
        this.target = createVector(x, y);

        // Initial velocity and acceleration set to zero
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);

        // Color 
        this.color = color;

        // Age 
        this.age = MAX_AGE;

        // Size based on age
        this.size = particleSize;
        this.played = false;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        let mouseVector = createVector(mouseX, mouseY);
    
        
        let fromMouseToParticle = p5.Vector.sub(this.pos, mouseVector);
        let distanceToMouse = fromMouseToParticle.mag();
        let fromParticleToTarget = p5.Vector.sub(this.target, this.pos);
        let distanceToTarget = fromParticleToTarget.mag();
    
        let totalForce = createVector(0, 0);
    
        
        let randomBrushSize = random(0, 150);
    
        if (distanceToMouse < randomBrushSize) {
            let repulsionForce = map(distanceToMouse, 0, randomBrushSize, MAX_FORCE, MIN_FORCE);
            fromMouseToParticle.setMag(repulsionForce);
            totalForce.add(fromMouseToParticle);

            if(this.played == false) {
                sound.play();
                this.played = true;
            }

        }
    
        let attractionForce = map(distanceToTarget, 0, 100, MIN_FORCE, MAX_FORCE);
        fromParticleToTarget.setMag(attractionForce);
        totalForce.add(fromParticleToTarget);
    
        this.applyForce(totalForce);
    
        this.vel.add(this.acc);
    
        this.pos.add(this.vel);
    
        this.vel.mult(0.95);
    
        this.acc.mult(0);
    
        this.age -= 0.25;
    
        let sizeFactor = map(this.age, MAX_AGE, 0, 1.5, 0);  
        this.size = particleSize * sizeFactor;
    }
    

    draw() {
        
        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}