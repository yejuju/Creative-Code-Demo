const particleSize = 10;
const RESOLUTION = 20;  // Increased to reduce the number of particles
const MAX_FORCE = 10;
const MIN_FORCE = 0;
const MAX_AGE = 255;  // Maximum age of the particle

let imgUrl = "Particles_Image/water.png";
let img;
let particles = [];
let spawnIndex = 0;  // Used for incremental particle spawning

function preload() {
    img = loadImage(imgUrl, img => img.resize(100, 100));  // Resize to a smaller size for better performance
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(40);

    // Incrementally spawn particles instead of all at once
    if (spawnIndex < width * height / (RESOLUTION * RESOLUTION)) {
        spawnParticlesBatch();
    }

    // Update and draw particles
    particles.forEach((particle, index) => {
        // Remove offscreen particles for better performance
        if (particle.isOffScreen()) {
            particles.splice(index, 1);
            return;
        }

        particle.update();
        particle.draw();

        // Remove particles that have reached 0 age
        if (particle.age <= 0) {
            particles.splice(index, 1);
        }
    });
}

// Incrementally spawn a batch of particles
function spawnParticlesBatch() {
    const batchSize = 50;  // Spawn 50 particles per frame to reduce initial load

    for (let i = 0; i < batchSize && spawnIndex < width * height / (RESOLUTION * RESOLUTION); i++, spawnIndex++) {
        let x = (spawnIndex % (width / RESOLUTION)) * RESOLUTION + particleSize / 2;
        let y = floor(spawnIndex / (width / RESOLUTION)) * RESOLUTION + particleSize / 2;

        // Map canvas coordinates to image coordinates
        let imgX = map(x, 0, width, 0, img.width);
        let imgY = map(y, 0, height, 0, img.height);

        // Get color from image at mapped coordinates
        const color = img.get(imgX, imgY);

        // Push a new particle to the array
        particles.push(new Particle(x, y, color));
    }
}

class Particle {
    constructor(x, y, color) {
        this.pos = createVector(x, y);
        this.target = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.color = color;
        this.age = MAX_AGE;
        this.size = particleSize;
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

        // Apply the forces
        this.applyForce(totalForce);
        
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.mult(0.95);  // Dampen velocity slightly for smoother motion
        this.acc.mult(0);

        // Age the particle and modify its size
        this.age -= 1;
        let sizeFactor = map(this.age, MAX_AGE, 0, 1.5, 0);
        this.size = particleSize * sizeFactor;
    }

    draw() {
        // Draw the particle
        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    // Check if the particle has moved offscreen
    isOffScreen() {
        return this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height;
    }
}
