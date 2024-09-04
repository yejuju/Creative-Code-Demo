function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    background(0);
    frameRate(60)
    colorMode(255, 255, 255, 0.5);
}


function draw() {
    if (mouseIsPressed) {
        var z = random(0, 5);
        if (int(z) == 0) {
            fill(random(0, 256), random(0, 256), random(0, 256));
            translate(mouseX - windowWidth / 2, mouseY - windowHeight / 2)
            rotateX(frameCount * 0.01);
            rotateZ(frameCount * 0.01);
            cone(40, 70);
        }
        else if (int(z) == 1) {
            translate(mouseX - windowWidth / 2, mouseY - windowHeight / 2)
            rotateX(frameCount * 0.01);
            rotateY(frameCount * 0.01);
            box(50);
        }
        else if (int(z) == 2) {
            fill(random(0, 256), random(0, 256), random(0, 256));
            translate(mouseX - windowWidth / 2, mouseY - windowHeight / 2)
            rotateX(frameCount * 0.01);
            rotateY(frameCount * 0.01);
            torus(40, 15);
        }
        else if (int(z) == 3) {
            fill(random(0, 256), random(0, 256), random(0, 256));
            translate(mouseX - windowWidth / 2, mouseY - windowHeight / 2)
            rotateX(frameCount * 0.01);
            rotateZ(frameCount * 0.01);
            cylinder(30, 80);
        }
        else {
            fill(random(0, 256), random(0, 256), random(0, 256));
            translate(mouseX - windowWidth / 2, mouseY - windowHeight / 2)
            rotateX(frameCount * 0.01);
            rotateZ(frameCount * 0.01);
            ellipsoid(20, 30, 40);
        }
    }

}