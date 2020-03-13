function Laser(x, y) {
  
  this.x = x;
  this.y = y;
  this.r = 8;
  this.toDelete = false;
  
  this.show = function(){
    image(laserBolt,this.x + 25, this.y, this.r, this.r * 3); 
  }
  
  this.hits = function(alien){
    var d = dist(this.x, this.y, alien.x, alien.y);
    
    if (d < this.r + alien.r){
     return true; 
    } else {
      return false;
    }
  } 
  
  this.move = function(){
    this.y = this.y - 2;
  }
  
  this.destroy = function(){
    this.toDelete = true;
  }
  
}