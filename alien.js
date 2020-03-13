function preload(){
  alienRed = loadImage("images/Alien_Red.jpg");
  alienBlue = loadImage("images/Alien_Blue.jpg");
  alienGreen = loadImage("images/Alien_Green.jpg");
  alienYellow = loadImage("images/Alien_Yellow.jpg");
  spaceShip = loadImage("images/Spaceship.jpg");
  laserBolt = loadImage("images/Laserbolt.jpg");
  laserBlast = loadSound("sounds/LaserBlast.mp3");
  explosion = loadSound("sounds/Explosion.mp3");
}

function Alien(x, y) {
  
  this.x = x;
  this.y = y;
  this.r = 20;
  this.toDelete = false;
  this.colour = floor(random(4));
  
  this.xdir = 1;
  
  this.show = function(){
    
    if (this.colour == 0){
      alienImage = alienRed;
    } else if (this.colour == 1){
      alienImage = alienBlue;
    } else if (this.colour == 2){
      alienImage = alienGreen;
    } else if (this.colour == 3){
      alienImage = alienYellow;
    }
    
    
    image(alienImage, this.x, this.y, this.r * 2 , this.r * 2);
  }
  
  this.destroy = function(){
    this.toDelete = true;
  }
  
  this.move = function() {
    this.x = this.x + this.xdir;
  }
  
  this.shiftDown = function() {
    this.xdir *= -1;
    this.y += this.r;
  }
  
}