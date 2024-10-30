// p5.glitch-video
// cc teddavis.org 2020

let glitch, vid, rPosition = 1000;
p5.disableFriendlyErrors = true;

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

	glitch = new Glitch();
    glitch.loadType('jpg');
	glitch.pixelate(1);
    glitch.errors(false);
}

function draw() {
	background(255);

	// one per second, set single random byte position
	if(frameCount % 60 === 0) {
		rPosition = random(glitch.bytes.length);
	}

	if(frameCount % 3 === 0) {

		if(!mouseIsPressed) {
			glitch.loadImage(vid);
		}

		glitch.randomByte(rPosition); // single randome byte
		glitch.limitBytes(.78); // limit bytes to branch
		glitch.randomBytes(10, 2); // set 10 random bytes
		glitch.buildImage();
	}

	image(glitch.image, width / 2, height / 2)
}