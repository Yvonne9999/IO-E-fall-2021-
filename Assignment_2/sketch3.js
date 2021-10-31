// this is a very simple sketch that demonstrates how to place a video cam image into a canvas

let video;
let pose;
let cloudPic;
let starR;
let starG;
let starB;
let ghostPic;
let sunPic;



let filterKeyW = [
  "GRAY",
  "OPAQUE"
]

function setup() {
    createCanvas(1000, 480);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

    cloudPic = loadImage('images/black.svg');
    sunPic = loadImage('images/sun.svg');
    ghostPic = loadImage('images/ghost.png');

}

function modelLoaded() {
    console.log("modelLoaded function has been called so this work!!!!");
};

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
    }
}

function draw() {
    image(video, 0, 0);

    if (pose) {
        if (pose.nose.x < 300) {
            filter(GRAY);
            image(cloudPic, pose.nose.x + 130, pose.nose.y, -300, -300);
        } else if (pose.nose.x > 700) {
            filter(THRESHOLD, 1);

            image(ghostPic, pose.nose.x + 90, pose.nose.y - 70, -150, -150);

            fill(255, 255, 255);
            ellipse(pose.leftEye.x, pose.leftEye.y, 25);
            fill(255, 255, 255);
            ellipse(pose.rightEye.x, pose.rightEye.y, 25);

            fill(0, 0, 0);
            ellipse(pose.leftEye.x, pose.leftEye.y, 10);
            fill(0, 0, 0);
            ellipse(pose.rightEye.x, pose.rightEye.y, 10);



        } else {
            image(sunPic, pose.nose.x + 100, pose.nose.y - 90, -180, -180);
        }
        fill(255, 0, 0);
        ellipse(pose.nose.x, pose.nose.y, 30);


        starR = pose.leftWrist.x;
        starG = random(255);
        starB = random(176);

        star(pose.leftWrist.x, pose.leftWrist.y, 15, 35, 5);
        star(pose.rightWrist.x, pose.rightWrist.y, 15, 35, 5);
    }
}

function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    fill(starR, starG, starB);
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}
