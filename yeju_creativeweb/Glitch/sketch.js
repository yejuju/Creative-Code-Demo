// p5.glitch-video
// cc teddavis.org 2020

let glitch, vid, rPosition = 1000; //rPosition: initial random byte position for glitching.
p5.disableFriendlyErrors = true; // disable error

function preload() {
	vid = createVideo('maya-glitch.mp4', function() {
		vid.hide();
		vid.volume(0);
		vid.loop();
	});
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	background(255);
	imageMode(CENTER);

	glitch = new Glitch(); //Initialize the Gltch
    glitch.loadType('jpg');
	glitch.pixelate(1);
    glitch.errors(false);
}

function draw() {
	background(255);

	// one per second, set single random byte position
	if(frameCount % 60 === 0) {     //Every 60 frames (about once per second), a random position in the glitch effect is set.
		rPosition = random(glitch.bytes.length);
	}

	if(frameCount % 3 === 0) { // Every 3 frames

		if(!mouseIsPressed) { //When mouse not pressed 
			glitch.loadImage(vid); // load current video
		}

		glitch.randomByte(rPosition); // single randome byte 
		glitch.limitBytes(.78); // limit bytes to branch // Limits how much of the image can be affected by glitching (78%).
		glitch.randomBytes(10, 2); // Adds 10 random byte glitches with a specific intensity (2).
		glitch.buildImage();
	}

	image(glitch.image, width / 2, height / 2) // Draws the glitched image in the center of the canvas.
}