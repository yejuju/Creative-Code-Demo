let shapes = [];
let maxShapes = 300; // Increased limit for shape trail
let cam; // For 3D camera control
let camSpeed = 0.01;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    cam = createCamera();  // Create a 3D camera
    setCamera(cam);
    frameRate(60);
    colorMode(HSB, 360, 100, 100, 1);  // HSB for smooth color transitions
}

function draw() {
    background(0, 0.05);  // Subtle trail effect
    ambientLight(30);  // Soft ambient light for shadows
    directionalLight(255, 255, 255, 0.25, 0.25, -1);  // Directional light

    // Dynamically control the camera
    camMove();

    // Display all shapes
    for (let i = 0; i < shapes.length; i++) {
        shapes[i].display();
        shapes[i].update();
    }

    // Add new shapes based on user input
    if (mouseIsPressed) {
        addShape(mouseX, mouseY);
    }

    // Control for excessive shapes
    if (shapes.length > maxShapes) {
        shapes.splice(0, 1);  // Remove oldest shape to limit total shapes
    }
}

// Function to handle window resizing
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);  // Resizes canvas when window changes size
}

function addShape(x, y) {
    let z = random(0, 6);  // Increased shape variety
    let shapeType = int(z);
    
    // Pastel colors have high saturation but lower brightness (80-100 range)
    let colorHue = map(x + y + frameCount, 0, width + height + frameCount, 0, 360);
    let pastelSaturation = random(60, 80);  // High saturation for pastel effect
    let pastelBrightness = random(80, 100);  // Lower brightness for soft look

    let newShape = {
        xPos: x - width / 2,
        yPos: y - height / 2,
        zPos: random(-500, 500),  // Random z-depth for more 3D variety
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        size: random(20, 120),  // Expanded size variation
        type: shapeType,
        hue: colorHue,
        saturation: pastelSaturation,
        brightness: pastelBrightness,
        display: function() {
            push();
            translate(this.xPos, this.yPos, this.zPos);  // 3D translation
            rotateX(this.rotationX);
            rotateY(this.rotationY);
            rotateZ(this.rotationZ);
            fill(this.hue, this.saturation, this.brightness, 0.8);  // Soft, pastel-like colors

            // Generate random shapes based on shape type
            switch (this.type) {
                case 0:
                    cone(this.size, this.size * 1.5);
                    break;
                case 1:
                    box(this.size);
                    break;
                case 2:
                    torus(this.size * 0.6, this.size * 0.3);
                    break;
                case 3:
                    cylinder(this.size * 0.7, this.size * 1.2);
                    break;
                case 4:
                    ellipsoid(this.size * 0.7, this.size, this.size * 0.5);
                    break;
                case 5:
                    sphere(this.size * 0.7);  // Added new sphere shape
                    break;
            }
            pop();
        },
        update: function() {
            this.rotationX += 0.01;  // Slow continuous rotation on X axis
            this.rotationY += 0.02;  // Different rotation speeds
            this.rotationZ += 0.03;  
            this.xPos += sin(frameCount * 0.01) * random(0.2, 1);  // More dynamic movement
            this.yPos += cos(frameCount * 0.01) * random(0.2, 1);
            this.zPos += sin(frameCount * 0.01) * random(0.2, 1);  // Z movement for depth
            
            // Continuous dynamic color change
            this.hue = (this.hue + 1) % 360;  // Gradually rotate hue for color change
        }
    };

    shapes.push(newShape);
}

// Camera control function to move around 3D space
function camMove() {
    if (keyIsDown(LEFT_ARROW)) {
        cam.pan(camSpeed);  // Pan the camera to the left
    }
    if (keyIsDown(RIGHT_ARROW)) {
        cam.pan(-camSpeed);  // Pan the camera to the right
    }
    if (keyIsDown(UP_ARROW)) {
        cam.tilt(camSpeed);  // Tilt the camera upward
    }
    if (keyIsDown(DOWN_ARROW)) {
        cam.tilt(-camSpeed);  // Tilt the camera downward
    }
    if (keyIsDown(87)) { // W key
        cam.move(0, 0, -5);  // Move the camera forward
    }
    if (keyIsDown(83)) { // S key
        cam.move(0, 0, 5);  // Move the camera backward
    }
}
