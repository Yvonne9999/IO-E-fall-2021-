var myRec = new p5.SpeechRec();
var testFish;
var testFish2;
var oldSpeech;
var timer = 0;
//210 
function setup() {
  createCanvas(800, 800);
  pic = loadImage("fish.png");
  filpPic = loadImage("fish3.png")

  testFish = new Fish(true,650,200);
  testFish2= new Fish(false,100,200);
  myRec.continuous = true; // do continuous recognition
  myRec.interimResults = true;
  oldSpeech = myRec.resultString;
  myRec.start();
}



function draw() {
  background(209,220,226);
  textFont("MonoSpace");
  stroke(100);
  fill(100);
  textSize(100);
  text("Keep quiet",width*0.2,height*0.5);
  if(myRec.resultString != oldSpeech){
    console.log("Fish is scare for " + timer + "sec");
    timer = 5;
    oldSpeech = myRec.resultString;
  }
  
  
  
  if(testFish.isArrival){
    testFish = new Fish(true,round(random(0, height - 20)),200);
  }else{
    testFish.isScare = timer != 0 ? true : false;
    testFish.display();
  }
  
  if(testFish2.isArrival){
    testFish2 = new Fish(false,round(random(0, height - 20)),200);
  }else{
    testFish2.isScare = timer != 0 ? true : false;
    testFish2.display();
  }
  
  
  
  
  if ((frameCount % 60 == 0) && (timer > 0)) {
    
    timer = timer - 1;
  }
}

