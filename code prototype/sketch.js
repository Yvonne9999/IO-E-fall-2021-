var myRec = new p5.SpeechRec();
var fishes = [];
var oldSpeech;
function setup() {
  createCanvas(800, 800);
  pic = loadImage("1.1.png");
  for(let i = 0; i < 2;i ++){
    fishes.push(new Fish(round(random(0, height - 20)),round(random(0, height - 20)),100));
  }
  myRec.continuous = true; // do continuous recognition
  myRec.interimResults = true;
  oldSpeech = myRec.resultString;
  myRec.start();
}



function draw() {
  background(220);
  textFont("MonoSpace");
  stroke(100);
  noFill();
  textSize(100);
  text("Keep quiet",width*0.2,height*0.5);
  
  for(let i = 0; i< fishes.length; i++){
    fishes[i].display();
    fishes[i].update;
    if(myRec.resultString != oldSpeech){
      fishes[i].speedUp();
      oldSpeech = myRec.resultString;
    }
  }
  
}