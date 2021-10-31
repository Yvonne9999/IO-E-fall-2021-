//Grab body part x,y locations from Posenet, put into an array, call a function to draw those points, to make trails


let video;
let pose;
let img1;
let img2;
let skeleton;
let angle = 0;
let leftWristHistory = [];
let rightWristHistory = [];

function setup() {

    /////////////////////////////////


    frameRate(10);
    createCanvas(1000, 700);
    noStroke();
    video = createCapture(VIDEO);
    video.size(width, height);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
    img1 = loadImage('images/star.png');
    img2 = loadImage('images/cute.png');
    video.hide();


    /////////////////////////////////


    rectMode(CENTER);
    angleMode(DEGREES);


}
////////////////////////////////////////////

function modelLoaded() {
    console.log("modelLoaded function has been called so this work!!!!");
};



function gotPoses(poses) {
    //console.log(poses);
    if (poses.length > 0) {
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }

}

//////////////////////////////////////////////////

/*translate(240, 0, 0);
  push();
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  box(70, 70, 70);
  pop();*/


function draw() {

    ////////////////////////////////////////////////

    image(video, 0, 0, width, height);
    //TRESHOLD 0 is white - 1 is black
    filter(THRESHOLD, 1);


    if (pose) {
        //noStroke();
        noFill();
        stroke(194, 210, 255);




        let d = dist(pose.leftEye.x, pose.leftEye.y, pose.rightEye.x, pose.rightEye.y);

        ellipse(pose.nose.x, pose.nose.y, d * 3);
        //ellipse(pose.leftWrist.x, pose.leftWrist.y, d * 2);
        addHistory(pose.leftWrist.x, pose.leftWrist.y, leftWristHistory);
        addHistory(pose.rightWrist.x, pose.rightWrist.y, rightWristHistory);

        //}

        image(img2, pose.nose.x, pose.nose.y, 50, 50);

        image(img1, ((pose.leftWrist.x) - 50), pose.leftWrist.y, 150, 150);

        //rect(pose.leftWrist.x,pose.leftWrist.y, 150, 150);
        //rect(pose.rightWrist.x,pose.rightWrist.y, 150, 150);

        //////////////////////////////////////////////////////////////

        for (let i = 0; i < pose.keypoints.length; i++) {
            //for(let i=0; i < 5;i++){
            let x = pose.keypoints[i].position.x;
            let y = pose.keypoints[i].position.y;


            rect(x, y, 25, 25);
            //angle+=0.01;

            //pop();
            //ellipse(x,y,120,120);
            //box(x,y,50);

            for (let i = 0; i < skeleton.length; i++) {
                let a = skeleton[i][0];
                let b = skeleton[i][1];
                strokeWeight(2);
                stroke(255);
                line(a.position.x, a.position.y, b.position.x, b.position.y);
                fill(0);
                //rect((a.position.x)/2, (a.position.y)/2,(b.position.x)/2, (b.position.y)/2 );
                //rect(a.position.x,b.position.y,10,10);
            }


        }



    }


}

function addHistory(x, y, historyArray) {
    let v = createVector(x, y);
    historyArray.push(v);
    //console.log("history.length " + history.length);
    let head = historyArray[historyArray.length - 1].copy();
    historyArray.push(head);
    historyArray.shift();
    //if(history.length > 50){

    for (let i = 0; i < historyArray.length - 1; i++) {
        drawHeadSpace(historyArray[i].x, historyArray[i].y, historyArray);
    }
}


function drawHeadSpace(x, y, history) {
    fill(255, 215, 78);
    ellipse(x, y, 100);
    //console.log("drawHeadSpace " + x);
    //history.splice(0,1);
    if (history.length > 10) {
        console.log("more than 10");
        history.splice(0, 1);
    }
}

/////////////////////////////////////////////////////////////
