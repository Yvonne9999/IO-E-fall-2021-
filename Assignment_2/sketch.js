// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let osc, playing, freq, amp;
let mySound;

function preload() {
    soundFormats('mp3', 'ogg');

    mySound = loadSound('dash.mp3');
}

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    //    osc = new p5.Oscillator('sine');

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, {
        outputStride: 8,
        quantBytes: 4
    }, modelReady);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function (results) {
        poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
}

function modelReady() {
    select('#status').html('Model Loaded');
}

function mousePressed() {
    console.log(JSON.stringify(poses))
}

var tempx = 0;
var tempy = 0;

function draw() {
    //    freq = constrain(map(nose.x, 0, width, 100, 500), 100, 500);
    //    amp = constrain(map(nose.y, height, 0, 0, 1), 0, 1);
    //    osc.freq(freq, 0.1);
    //    osc.amp(amp, 0.1);
    //    osc.start();

    image(video, 0, 0, width, height);
    strokeWeight(2);

    // For one pose only (use a for loop for multiple poses!)
    if (poses.length > 0) {
        const pose = poses[0].pose;
        console.log(pose);

        // Create a pink ellipse for the nose
        fill(255, 0, 0);
        const nose = pose.nose;
        ellipse(nose.x, nose.y, 20, 20);

        // Create a yellow ellipse for the right eye
        fill(255, 215, 0);
        const rightEye = pose.rightEye;
        ellipse(rightEye.x, rightEye.y, 20, 20);

        // Create a yellow ellipse for the right eye
        fill(255, 215, 0);
        const leftEye = pose.leftEye;
        ellipse(leftEye.x, leftEye.y, 20, 20);

        fill(0, 255, 0);
        const rightShoulder = pose.rightShoulder;
        ellipse(rightShoulder.x, rightShoulder.y, 20, 20);

        fill(0, 255, 0);
        const leftShoulder = pose.leftShoulder;
        ellipse(leftShoulder.x, leftShoulder.y, 20, 20);

        fill(43, 54, 65);
        const rightElbow = pose.rightElbow;
        ellipse(rightElbow.x, rightElbow.y, 20, 20);

        fill(43, 54, 65);
        const leftElbow = pose.leftElbow;
        ellipse(leftElbow.x, leftElbow.y, 20, 20);

        fill(43, 54, 65);
        const leftWrist = pose.leftWrist;
        ellipse(leftWrist.x, leftWrist.y, 20, 20);

        if (leftWrist.y > 100) {
            mySound.play();
        }
        stroke(255);
        line(tempx, tempy, nose.x, nose.y);

        tempx = nose.x;
        tempy = nose.y;

        //document.getElementById("status").innerText = "The position of nose point is (" + nose.x + " , " + nose.y + ")";

    }
}
