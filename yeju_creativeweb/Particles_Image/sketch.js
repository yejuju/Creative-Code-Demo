const particleSize = 10;
const RESOLUTION = 10;
const MAX_FORCE = 10;
const MIN_FORCE = 0;
const MAX_AGE = 255;  // Maximum age of the particle

let imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Claude_Monet_-_Water_Lilies%2C_1917-1919.JPG/2880px-Claude_Monet_-_Water_Lilies%2C_1917-1919.JPG';
let img;
let particles = [];

function preload() {
  img = loadImage(imgUrl);
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

        // Remove particles that exceed max age (optional if you want them to disappear over time)
        if (particle.age <= 0) {
            particles.splice(index, 1);
        }
    });
}

function spawnParticles() {
    for (let i = 0; i < width; i += RESOLUTION) {
        for (let j = 0; j < height; j += RESOLUTION) {
            // Map canvas coordinates to image coordinates
            let x = map(i, 0, width, 0, img.width);
            let y = map(j, 0, height, 0, img.height);
            
            // Get color from image at mapped coordinates
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
        
        // Color of the particle (preserved from the image)
        this.color = color;
        
        // Age of the particle (starts from the maximum)
        this.age = MAX_AGE;
        
        // Size factor based on age
        this.size = particleSize;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        let mouseVector = createVector(mouseX, mouseY);

        // Calculate vectors to determine forces
        let fromMouseToParticle = p5.Vector.sub(this.pos, mouseVector);
        let distanceToMouse = fromMouseToParticle.mag();
        let fromParticleToTarget = p5.Vector.sub(this.target, this.pos);
        let distanceToTarget = fromParticleToTarget.mag();

        let totalForce = createVector(0, 0);

        // Repulsive force from the mouse if within 100 pixels
        if (distanceToMouse < 100) {
            let repulsionForce = map(distanceToMouse, 0, 100, MAX_FORCE, MIN_FORCE);
            fromMouseToParticle.setMag(repulsionForce);
            totalForce.add(fromMouseToParticle);
        }

        // Attractive force towards the particle's target
        let attractionForce = map(distanceToTarget, 0, 100, MIN_FORCE, MAX_FORCE);
        fromParticleToTarget.setMag(attractionForce);
        totalForce.add(fromParticleToTarget);

        // Apply total force to acceleration
        this.applyForce(totalForce);
        
        // Update velocity based on acceleration
        this.vel.add(this.acc);
        
        // Update position based on velocity
        this.pos.add(this.vel);
        
        // Dampen velocity slightly (for smoother stopping)
        this.vel.mult(0.95);
        
        // Reset acceleration for the next frame
        this.acc.mult(0);
        
        // Age the particle and decrease its size as it gets older
        this.age -= 1;
        
        // Size grows and then shrinks based on age
        let sizeFactor = map(this.age, MAX_AGE, 0, 1.5, 0);  // Grow then shrink
        this.size = particleSize * sizeFactor;
    }

    draw() {
        // Draw the particle with the original color and modified size
        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size);
    }
}
