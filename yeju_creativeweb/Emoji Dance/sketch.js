let clearButton;
let canvas;

let video;
let bodyPose;
let poses = [];
let pose = poses[0];
let connections;

let faceEmojis = ["👶", "👶🏻", "👶🏼", "👶🏽", "👶🏾", "👶🏿", "🧒", "🧒🏻", "🧒🏼", "🧒🏽", "🧒🏾", "🧒🏿", "👦", "👦🏻", "👦🏼", "👦🏽", "👦🏾", "👦🏿", "👧", "👧🏻", "👧🏼", "👧🏽", "👧🏾", "👧🏿", "🧑", "🧑🏻", "🧑🏼", "🧑🏽", "🧑🏾", "🧑🏿", "👱", "👱🏻", "👱🏼", "👱🏽", "👱🏾", "👱🏿", "👨", "👨🏻", "👨🏼", "👨🏽", "👨🏾", "👨🏿", "🧔", "🧔🏻", "🧔🏼", "🧔🏽", "🧔🏾", "🧔🏿", "👨‍🦰", "👨🏻‍🦰", "👨🏼‍🦰", "👨🏽‍🦰", "👨🏽‍🦰", "👨🏾‍🦰", "👨🏿‍🦰", "👨‍🦱", "👨🏻‍🦱", "👨🏼‍🦱", "👨🏽‍🦱", "👨🏾‍🦱", "👨🏿‍🦱", "👨‍🦳", "👨🏻‍🦳", "👨🏼‍🦳", "👨🏽‍🦳", "👨🏾‍🦳", "👨🏿‍🦳", "👨‍🦲", "👨🏻‍🦲", "👨🏼‍🦲", "👨🏽‍🦲", "👨🏾‍🦲", "👨🏿‍🦲", "👩", "👩🏻", "👩🏼", "👩🏽", "👩🏾", "👩🏿", "👩‍🦰", "👩🏻‍🦰", "👩🏼‍🦰", "👩🏽‍🦰", "👩🏾‍🦰", "👩🏿‍🦰", "🧑‍🦰", "🧑🏻‍🦰", "🧑🏼‍🦰", "🧑🏽‍🦰", "🧑🏾‍🦰", "🧑🏿‍🦰", "👩‍🦱", "👩🏻‍🦱", "👩🏼‍🦱", "👩🏽‍🦱", "👩🏾‍🦱", "👩🏿‍🦱", "🧑‍🦱", "🧑🏻‍🦱", "🧑🏼‍🦱", "🧑🏽‍🦱", "🧑🏾‍🦱", "🧑🏿‍🦱", "👩‍🦳", "👩🏻‍🦳", "👩🏼‍🦳", "👩🏽‍🦳", "👩🏾‍🦳", "👩🏿‍🦳", "🧑‍🦳", "🧑🏻‍🦳", "🧑🏼‍🦳", "🧑🏽‍🦳", "🧑🏾‍🦳"];

let heartEmojis = ["💖", "❤️", "🩵", "🧡", "💛", "💚", "💙", "💜", "🤎", "🖤", "🤍", "🩶", "❤️‍🔥", "💥", "💫", "🌈"]

let foodEmojis = ["🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "", "🥝", "🍅", "", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "", "🥒", "🥬", "🥦", "🧄", "🧅", "🍄", "🥜", "🌰", "🍞", "🥐", "🥖", "", "🥨", "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "", "🥙", "🧆", "🥚", "🍳", "🥘", "🍲", "", "🥣", "🥗", "🍿", "🧈", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🦀", "🦞", "🦐", "🦑", "🦪", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "", "🧃", "🧉"]

let handEmojis = ["👋", "👋🏻", "👋🏼", "👋🏽", "👋🏾", "👋🏿", "👌", "👌🏻", "👌🏼", "👌🏽", "👌🏾", "👌🏿", "🤏", "🤏🏻", "🤏🏽", "🤏🏽", "🤏🏿", "✌🏻", "✌🏻", "✌🏽", "✌🏽", "✌🏿", "🤟🏻", "🤟🏻", "🤟🏼", "🤟🏽", "🤟🏾", "🤙🏿", "🤙🏻", "🤙🏼", "🤙🏽", "🤙🏾", "👈", "👈🏻", "👈🏻", "👈🏼", "👈🏽", "👈🏾", "👈🏿", "🖕", "🖕🏻", "🖕🏼", "🖕🏽", "🖕🏾", "🖕🏿", "👏", "👏🏻", "👏🏼", "👏🏽‍", "👏🏾", "👏🏿", "✊", "✊🏻", "✊🏼", "✊🏽", "✊🏾", "✊🏿", "👍", "👍🏻", "👍🏼", "👍🏽", "👍🏾", "👍🏿", "🙌", "🙌🏻", "🙌🏼", "🙌🏽", "🙌🏾", "🙌🏿"];

let footEmojis = ["🦿", "🦵", "🦵🏻", "🦵🏼", "🦵🏽", "🦵🏾", "🦵🏿", "🦶🏻", "🦶🏼", "🦶🏼", "🦶🏽", "🦶🏾", "🦶🏿", "👂", "👂🏻", "👂🏼", "👂🏽", "👂🏾", "👂🏿"]

// Store positions for each body part
let nosePositions = [];
let leftWristPositions = [];
let rightWristPositions = [];
let leftAnklePositions = [];
let rightAnklePositions = [];

// Off-screen graphics
let pg;

function preload() {
    bodyPose = ml5.bodyPose("MoveNet", { flipped: true });
}

function gotPoses(results) {
    poses = results;
}

function setup() {
    canvas = createCanvas(640, 480);
    video = createCapture(VIDEO, { flipped: true });
    video.hide();

    bodyPose.detectStart(video, gotPoses);

    connections = bodyPose.getSkeleton(); 


    pg = createGraphics(640, 480);
    pg.clear();

    clearButton = createButton("clear");
    clearButton.mousePressed(clearCanvas);
}

function windowResized() {
    createCanvas(640, 480);
}

function clearCanvas() {
    nosePositions = [];
    leftWristPositions = [];
    rightWristPositions = [];
    leftAnklePositions = [];
    rightAnklePositions = [];
    pg.clear();
}

function draw() {
    image(video, 0, 0);

    let currentPose = null;

    if (poses.length > 0) {
        currentPose = poses[0]; // Assign pose here

        // Get keypoints
        let kpNose = currentPose.keypoints[0];
        let kpLeftWrist = currentPose.keypoints[9];
        let kpRightWrist = currentPose.keypoints[10];
        let kpLeftAnkle = currentPose.keypoints[15];
        let kpRightAnkle = currentPose.keypoints[16];

        // Track positions if confidence > 0.1
        if (kpNose && kpNose.confidence > 0.1) {
            nosePositions.push({ x: kpNose.x, y: kpNose.y });
        }
        if (kpLeftWrist && kpLeftWrist.confidence > 0.1) {
            leftWristPositions.push({ x: kpLeftWrist.x, y: kpLeftWrist.y });
        }
        if (kpRightWrist && kpRightWrist.confidence > 0.1) {
            rightWristPositions.push({ x: kpRightWrist.x, y: kpRightWrist.y });
        }
        if (kpLeftAnkle && kpLeftAnkle.confidence > 0.1) {
            leftAnklePositions.push({ x: kpLeftAnkle.x, y: kpLeftAnkle.y });
        }
        if (kpRightAnkle && kpRightAnkle.confidence > 0.1) {
            rightAnklePositions.push({ x: kpRightAnkle.x, y: kpRightAnkle.y });
        }

        // Nose (faceEmojis)
        pg.fill(0);
        pg.textSize(random(55, 75));
        for (let i = 0; i < nosePositions.length; i++) {
            let p = nosePositions[i];
            pg.text(faceEmojis[floor(random(0, faceEmojis.length))], p.x, p.y);
        }

        // Left Wrist (heartEmojis)
        pg.fill(0);
        pg.textSize(random(15, 75));
        for (let i = 0; i < leftWristPositions.length; i++) {
            let p = leftWristPositions[i];
            pg.text(heartEmojis[floor(random(0, heartEmojis.length))], p.x, p.y);
        }

        // Right Wrist (foodEmojis)
        pg.fill(0);
        pg.textSize(random(15, 75));
        for (let i = 0; i < rightWristPositions.length; i++) {
            let p = rightWristPositions[i];
            pg.text(foodEmojis[floor(random(0, foodEmojis.length))], p.x, p.y);
        }

        // Left Ankle (handEmojis)
        pg.fill(0);
        pg.textSize(random(45, 75));
        for (let i = 0; i < leftAnklePositions.length; i++) {
            let p = leftAnklePositions[i];
            pg.text(handEmojis[floor(random(0, handEmojis.length))], p.x, p.y);
        }

        // Right Ankle (footEmojis)
        pg.fill(0);
        pg.textSize(random(45, 75));
        for (let i = 0; i < rightAnklePositions.length; i++) {
            let p = rightAnklePositions[i];
            pg.text(footEmojis[floor(random(0, footEmojis.length))], p.x, p.y);
        }

        // Now draw keypoints and connections
        // Draw keypoints
        for (let i = 0; i < currentPose.keypoints.length; i++) {
            let keypoint = currentPose.keypoints[i];
            if (keypoint.confidence > 0.1) {
                fill(0, 0, 255);
                circle(keypoint.x, keypoint.y, 12);
            }
        }

        // Draw skeleton
        for (let j = 0; j < connections.length; j++) {
            let connection = connections[j];
            let a = connection[0];
            let b = connection[1];
            let pointA = currentPose.keypoints[a];
            let pointB = currentPose.keypoints[b];
            stroke(255);
            strokeWeight(3);
            line(pointA.x, pointA.y, pointB.x, pointB.y);
        }
    }

    // Overlay the brush strokes on top of the video
    image(pg, 0, 0);
  }



