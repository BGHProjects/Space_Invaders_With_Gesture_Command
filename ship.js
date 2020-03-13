function Ship() {
  
  this.x = width/2;
  this.xdir = 0;
  //this.image = img;
  
  this.show = function(){
    image(spaceShip, this.x, height-60, 60, 60);
  }
  
  this.setDir = function(dir){
    this.xdir = dir;
  }
  
  this.move = function(dir){
    if (this.x < 1){
      this.x = 0;
    } else if (this.x > width - 59){
     this.x = width-60; 
    }
    
    this.x += this.xdir*5;
  }
  
}