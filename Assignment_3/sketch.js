let count = 0; //Using to control the rabbit appear
let page = 1; // control the page
var x, y, dx, dy;

// Image name
let imgName = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png"
]

//iamge Loading array
let rabbitImg = [];
let img;

//init message in page 1;
var message = "Say something!";

//p5
var myRec = new p5.SpeechRec('en-US', parseResult);
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

var myVoice = new p5.Speech();

var words = [
  "To the Chinese, Mid-Autumn Festival means family reunion and peace. The festival is celebrated when the moon is believed to be the biggest and fullest. To the Chinese, a full moon is a symbol of prosperity, happiness, and family reunion.",
  "Many traditional and meaningful celebrations are held in most households in China, and China's neighboring countries. The main traditions and celebrations include eating mooncakes, having dinner with family, gazing at and worshipping the moon, and lighting lanterns.",
  "Mid-Autumn Festival has a history of over 3,000 years, dating back to moon worship in the Shang Dynasty (1600–1046 BC). It’s such an important festival that many poems were written about it, stories and legends about the festival are widespread, and its origins have been guessed at and explained by generations of Chinese."
];

//modify rabbitposition here
let rabbitPosition = [
  "110", "550",
  "250", "470",
  "570", "170",
  "890", "350",
  "1140", "580"
];

//modify font position here
let fontPosition = [
  "175", "710",
  "630", "360",
  "1090", "705"
]

//juge which rabbit that user click.
let rabbitClick;

function preload() {
    img = loadImage('6.png');

    for (let i = 0; i < imgName.length; i++) {
        rabbitImg[i] = loadImage(imgName[i]);
    }

}


function setup() {
    createCanvas(1280, 800);
    background(255);
    myRec.start(); // start engine

    x = 20;
    y = 200;
    dx = 0;
    dy = 0;
    myVoice.setVoice(2);

}

function draw() {
    background(255);
    switch (page) {
        case 1:
            page1();
            break;
        case 2:
            page2();
            break;
        case 3:
            page3();
            break;
    }
}

function page1() {

    //-------- title part -------
    fill(200, 160, 99);
    noStroke();
    rect(0, 0, width, 100);

    //texting
    fill(255);
    textFont("Raleway");
    textSize(29);
    textAlign(CENTER);
    text(message, width / 2, 60);


    //-------- main part -------

    img.resize(520, 520);
    image(img, (width - 520) / 2, height / 2 - 150);

    //1 Rabbit
    if (count > 1) {
        push();
        translate(rabbitPosition[0], 550);
        rotate(PI / 180 * 0);

        image(rabbitImg[1], 0, 0);
        pop();
    }

    if (count > 5) {
        //2 Rabbit
        push();
        translate(240, 460);
        rotate(PI / 180 * -90);

        image(rabbitImg[0], 0, 0);
        pop();

    }

    if (count > 10) {
        //3 Rabbit
        push();
        translate(width / 2 - 50, 130);
        rotate(PI / 180 * 0);

        image(rabbitImg[4], 0, 0);
        pop();
    }

    if (count > 15) {

        //4 Rabbit
        push();
        translate(920, 350);
        rotate(PI / 180 * 0);

        image(rabbitImg[0], 0, 0);
        pop();
    }

    if (count > 20) {
        //5 Rabbit
        push();
        translate(1120, 570);
        rotate(PI / 180 * 72);

        image(rabbitImg[2], 0, 0);
        pop();
    }

    if (count > 22) {
        page = 2;
    }

}

function page2() {
    //-------- title part -------
    fill(200, 160, 99);
    noStroke();
    rect(0, 0, width, 150);

    //texting
    fill(255);
    textFont("Raleway");
    textStyle(NORMAL);
    textSize(35);
    select('canvas').elt.style.letterSpacing = "1px";
    textAlign(CENTER);
    text("Say up, right, left to find the rabbit", width / 2, 60);


    fill(255);
    textFont("Raleway");
    textSize(15);
    textStyle(NORMAL);
    textAlign(CENTER);
    text("Don't touch other items", width / 2, 130);



    fill(200, 160, 99);
    ellipse(x, y, 20, 20);
    x += dx;
    y += dy;
    if (x < 0) x = width;
    if (y < 0) y = height;
    if (x > width) x = 0;
    if (y > height) y = 0;



    //3 Rabbit
    push();

    translate(width - 250, height - 200);
    rabbitImg[4].resize(150, 150);

    stroke(0);

    image(rabbitImg[4], 0, 0);
    pop();

    if (checkTouch(x, y, width - 250, height - 200, 150, 150)) {
        console.log("true");
        page = 3;
    }

}

function page3() {

    push();
    translate(width / 2 - 549 / 2, 410);
    rotate(PI / 180 * 0);
    image(rabbitImg[8], 0, 0);
    pop();

    push();
    translate(rabbitPosition[0], rabbitPosition[1]);
    rotate(PI / 180 * 0);
    image(rabbitImg[1], 0, 0);
    pop();

    //2 Rabbit
    push();
    translate(rabbitPosition[2], rabbitPosition[3]);
    rotate(PI / 180 * -90);
    image(rabbitImg[0], 0, 0);
    pop();

    //3 Rabbit
    push();
    translate(rabbitPosition[4], rabbitPosition[5]);
    rotate(PI / 180 * 0);
    image(rabbitImg[4], 0, 0);
    pop();



    //4 Rabbit
    push();
    translate(rabbitPosition[6], rabbitPosition[7]);
    rotate(PI / 180 * 0);
    image(rabbitImg[0], 0, 0);
    pop();


    //5 Rabbit
    push();
    translate(rabbitPosition[8], rabbitPosition[9]);
    rotate(PI / 180 * 72);
    image(rabbitImg[2], 0, 0);
    pop();

    //click me 
    fill(255);
    noStroke();
    textFont(" Raleway modified");
    textStyle(NORMAL);
    textSize(40);
    textAlign(CENTER);
    text("Click rabbits !", width / 2, 550);


    //texting
    fill(200, 160, 99);
    textFont(" Raleway modified");
    textSize(20);
    textAlign(CENTER);
    text("Mid-Autumn Festival", fontPosition[0], fontPosition[1]);

    //texting
    fill(200, 160, 99);
    textFont(" Raleway modified");
    textSize(20);
    textAlign(CENTER);
    text("Celebration", fontPosition[2], fontPosition[3]);

    //texting
    fill(200, 160, 99);
    textFont(" Raleway modified");
    textSize(20);
    textAlign(CENTER);
    text("Origin", fontPosition[4], fontPosition[5]);

    if (rabbitClickeCheck(rabbitPosition[0], rabbitPosition[1])) {

        rabbitClick = 0;
    }
    if (rabbitClickeCheck(rabbitPosition[4], rabbitPosition[5])) {
        rabbitClick = 1;
    }
    if (rabbitClickeCheck(rabbitPosition[8], rabbitPosition[9])) {
        rabbitClick = 2;
    }

}

function parseResult() {
    switch (page) {
        case 1:
            pageOneVoiceCheck();
            break;
        case 2:
            pageTwoVoiceCheck();
            break;
    }

}

function pageOneVoiceCheck() {
    if (myRec.resultString != null) {
        count++;
        message = myRec.resultString;
    }

}

function pageTwoVoiceCheck() {
    // recognition system will often append words into phrases.
    // so hack here is to only use the last word:
    var mostrecentword = myRec.resultString.split(' ').pop();
    if (mostrecentword.indexOf("left") !== -1) {
        dx = -1;
        dy = 0;
    } else if (mostrecentword.indexOf("right") !== -1) {
        dx = 1;
        dy = 0;
    } else if (mostrecentword.indexOf("up") !== -1) {
        dx = 0;
        dy = -1;
    } else if (mostrecentword.indexOf("hey") !== -1) {
        dx = 0;
        dy = 1;
    }
}

//130 means rabbit picture size.
function rabbitClickeCheck(x, y) {

    let x2 = x + 130;
    let y2 = y + 130;

    if ((mouseX > x) && (mouseX < x2) && (mouseY > y) && (mouseY < y2))
        return true;

    return false;
}


function mousePressed() {
    myVoice.speak(words[rabbitClick]);
}









//-----------------------Here is some helper function------------------------
function fadeIn(fade) {
    if (fade < 255) {
        return fade + deltaTime / 3;
    } else {
        return 255;
    }
}

function fadeOut(fade) {
    if (fade > 0) {
        return fade - deltaTime / 3;
    } else {
        return 0;
    }
}


function checkTouch(x, y, boxX, boxY, itemWidth, itemHeight) {
    let x1 = boxX;
    let x2 = boxX + itemWidth;
    let y1 = boxY;
    let y2 = boxY + itemHeight;

    if ((x > x1) && (x < x2) && (y > y1) && (y < y2)) {
        return true;
    } else {
        return false;
    }
}
