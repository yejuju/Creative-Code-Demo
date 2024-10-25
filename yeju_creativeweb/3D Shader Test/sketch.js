let theShader;  // Our magic shader
let cam;        // The ever-changing webcam feed
let video;      // Another layer of webcam input for AI
let model;      // BlazeFace machine-learning model
let face;       // Detected face from BlazeFace
let firstFace = true;
let value = 255;

function preload() {
  // Gently load the vertex and fragment shaders
  theShader = loadShader('assets/webcam.vert', 'assets/webcam.frag');
}

function setup() {
  // A canvas born from pixels, prepared for WEBGL wonders
  let canvas = createCanvas(710, 400, WEBGL);
  noStroke();  // Pure visuals, undisturbed by outlines

  // Center the canvas in the window
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  document.body.style.backgroundColor = "black";

  // Initiate webcam for shader effects
  cam = createCapture(VIDEO);
  cam.size(710, 400);
  cam.hide();

  // Initiate video for AI-based face detection
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Load the BlazeFace model for face detection
  loadFaceModel();
}

function draw() {
  // Bind the shader's world to the canvas
  shader(theShader);  // Activate theShader, weaving textures and light
  theShader.setUniform('tex0', cam);  // Feed the webcam stream into the shader's texture
  rect(0, 0, width, height);  // A simple geometry to hold complex beauty

  // Reset the shader to the normal drawing mode to overlay additional visuals
  resetShader();

  // If face model is loaded and video is active, detect face
  if (video.loadedmetadata && model !== undefined) {
    getFace();
  }

  // If a face is detected, overlay additional effects
  if (face !== undefined) {
    image(video, -width / 2, -height / 2, width, height);  // Overlay video onto the canvas

    // If this is the first face we've found, print the info
    if (firstFace) {
      console.log(face);
      firstFace = false;
    }

    // Extract key landmarks of the face
    let rightEye = scalePoint(face.landmarks[0]);
    let leftEye = scalePoint(face.landmarks[1]);
    let nose = scalePoint(face.landmarks[2]);
    let mouth = scalePoint(face.landmarks[3]);
    let rightEar = scalePoint(face.landmarks[4]);
    let leftEar = scalePoint(face.landmarks[5]);

    // Draw a beautiful flower at different facial landmarks
    drawFlower(rightEye.x, rightEye.y); // Right eye
    drawFlower(leftEye.x, leftEye.y);   // Left eye
    drawFlower(nose.x, nose.y);         // Nose
    drawFlower(mouth.x, mouth.y);       // Mouth
    drawFlower(rightEar.x, rightEar.y); // Right ear
    drawFlower(leftEar.x, leftEar.y);   // Left ear

    // A conditional interaction: change color based on face position
    if (mouseX < leftEar.x && mouseX > rightEar.x && mouseY < mouth.y && mouseY > rightEye.y) {
      value = [240, 30, 30];  // Dynamic change when mouse is near the face
    } else {
      value = 255;
    }
  }
}

// Draw an artistic flower at the detected face landmarks
function drawFlower(centerX, centerY) {
  for (let i = 30; i >= 0; i--) {
    let angle = TWO_PI / 8 * i;
    let x = centerX + cos(angle) * 20;
    let y = centerY + sin(angle) * 20;
    let r = map(tan((frameCount + i * 2) / 40), -1, 1, 50, 255);
    let g = map(sin((frameCount + i * 5) / 10), -1, 1, 0, 255);

    noStroke();
    fill(g, r, i * 30, 150);
    ellipse(x, y, 24, 24);  // Petals of the flower
  }

  fill(255, 204, 0);  // Center of the flower
  ellipse(centerX, centerY, 16, 16);
}

// Utility function to scale points from video to canvas dimensions
function scalePoint(pt) {
  let x = map(pt[0], 0, video.width, -width / 2, width / 2); // Adjust for WEBGL coordinates
  let y = map(pt[1], 0, video.height, -height / 2, height / 2); // Adjust for WEBGL coordinates
  return createVector(x, y);
}

// Load the face model in the background
async function loadFaceModel() {
  model = await blazeface.load();  // Load the BlazeFace model asynchronously
}

// Get face predictions asynchronously
async function getFace() {
  const predictions = await model.estimateFaces(document.querySelector("video"), false);
  
  // If no faces are detected, set face to undefined
  if (predictions.length === 0) {
    face = undefined;
  } else {
    face = predictions[0];  // Otherwise, get the first face detected
  }
}
