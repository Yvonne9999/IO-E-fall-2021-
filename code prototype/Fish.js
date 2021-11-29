

class Fish{
    constructor(x,y,size){
    this.pos = new p5.Vector(x,y);
    this.destination = new p5.Vector(round(random(0, width - 20)),round(random(0, height - 20)));
    this.vel = 5;
    this.isArrival = false;
    this.size = size;
    this.needToDisappear = false;
    this.timer = 0;  
    this.scaleCount = 0;
    
  }

  display(){
    this.drawObject();
    this.update();
    //this.checkStatus();
  }

  drawObject(){
    // noFill();
    // ellipse(this.pos.x,this.pos.y,this.size,this.size);
    imageMode(CENTER);         
    image(pic,this.pos.x,this.pos.y,this.size+20,this.size+20);
  }

  update(){
    if(this.isArrival){
      let x = round(random(0, width - 20));
      let y = round(random(0, height - 20));
      this.destination = new p5.Vector(x,y);
      this.isArrival = false;
    }
    if (frameCount % 60 == 0 && this.timer > 0) {
        this.timer --;
      }
    if(this.timer > 0){
      this.vel = 10;
    }else{
      this.vel = 1;
    }
    this.moving();
  }

  checkStatus(){
    if (this.pos.y > height) {
      this.disappear = 2;
    }
  }

  moving(){
    
    if(!this.isArrival){
      if(this.pos.x > this.destination.x){
        this.pos.x -= this.vel * (deltaTime / 50);
      }else{
        this.pos.x += this.vel * (deltaTime / 50);
      }
      if(this.pos.y > this.destination.y){
        this.pos.y -= this.vel * (deltaTime / 50);
      }else{
        this.pos.y += this.vel * (deltaTime / 50);
      }
    }
    if(dist(this.pos.x, this.pos.y, this.destination.x, this.destination.y) < this.vel+2){
      this.isArrival = true;
    }
  }
  
  setDestination(newPos){
    this.destination = newPos;
    this.isArrival = false;
  }
  
  
  checkCollision(other){
   if((this.size + this.pos.y > other.getPointL().y) && (this.pos.y - this.size < other.getPointL().y) ){
    if((this.pos.x + this.size >  other.getPointL().x ) && (this.pos.x - this.size < other.getPointR().x)){
      this.disappear = 1;
       }
   }
  }
  

  speedUp(){
    this.timer = 2;
  }
}