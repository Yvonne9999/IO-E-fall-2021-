class Fish{
  constructor(comeFromLeft,y,size){
    this.vel = 5;
    this.CFLeft = comeFromLeft;
    if(comeFromLeft){
      this.pos = new p5.Vector(0 - size,y);
      this.destination = new p5.Vector(width + size,y);
    }else{
      this.pos = new p5.Vector(width + size,y);
      this.destination = new p5.Vector(0 - size,y);
    }
     
    this.isScare = false;
    this.isArrival = false;
    this.size = size;
    this.timer = 0;  
    
  }

  display(){
    this.update();  
    this.drawObject();      
  }

  /**
  Draw the fish
  */
  drawObject(){
    imageMode(CENTER);   
    if(this.CFLeft){
      image(pic,this.pos.x,this.pos.y,this.size*2,this.size);
    }else{
      image(filpPic,this.pos.x,this.pos.y,this.size*2,this.size);
    }
      
  }

  update(){
    if(this.isScare){
      this.vel = 30;
    }else{
      this.vel = 5;
    }
    if(!this.isArrival){
      //moving
      if(this.pos.x > this.destination.x){
        this.pos.x -= this.vel * (deltaTime / 50);
      }else{
        this.pos.x += this.vel * (deltaTime / 50);
      }
    }
    //console.log(deltaTime);
    //this.pos.y += this.vel * (cos(deltaTime * PI /180));
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