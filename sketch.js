var ship;
var aliens = [];
var lasers = [];

let cnv;
let score = 0;

let alienImage;
let laserBolt;
let spaceShip;
let laserBlast;
let explosion;

let video;
let poseNet;
let pose;

let brain;

function centerCanvas(){
   var x = (windowWidth - width) / 2;
  var y = (windowHeight - height + 300) / 2;
  cnv.position(x,y);
}

function windowResized(){
  centerCanvas();
}

function setup() {
  
  cnv = createCanvas(800, 500);
  centerCanvas();
  ship = new Ship();
  createAliens(150);
  
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  
  let options = {
    inputs: 34,
    outputs: 4,
    task: 'classification',
    debug: true
  }
  
  brain = ml5.neuralNetwork(options);
  const modelInfo = {
    model: 'models/model.json',
    metadata: 'models/model_meta.json',
    weights: 'models/model.weights.bin',
  };
  brain.load(modelInfo, brainLoaded);
}

function brainLoaded() {
  if (error) {
   console.log(error); 
  }
  console.log('pose classification ready!');
  classifyPose();
}

function classifyPose(){
  if (pose) {
    let inputs = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      inputs.push(x);
      inputs.push(y);
    }
    brain.classify(inputs, gotResult);
  } else {
    setTimeout(classifyPose, 100);
  }
}

function gotResult(error, results) {
  
  if(error) {
   console.log(error); 
  } else if (results[0].confidence > 0.75) {
    console.log(results[0].label);
    gestureMovement(results[0].label);
  }
  classifyPose();
}

function modelLoaded() {
  console.log('poseNet ready');
}

function gotPoses(poses) {
  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function gameLost() {
  textSize(32);
  fill(255,255,255);
  textAlign(CENTER, CENTER);
  text('YOU HAVE LOST THE GAME', width/2, height/2);
}

function gameWon(){
  textSize(32);
  fill(255,255,255);
  textAlign(CENTER, CENTER);
  text('YOU HAVE WON THE GAME', width/2, height/2);
}

function createAliens(position){
  
      let j;
  
  for (var i = 0; i < 24; i++) {
      
    if (i < 8) {
       row = position;
        j = i;
      } else if (i >= 8 && i < 16) {
       row = position - 50;
        j = i - 8;
      } else if (i >= 16) {
       row = position - 100; 
        j = i - 16;
      }
        
    aliens.push(new Alien( (j*80) + 80, row));
    
    }
  
}

function draw() {
  background(0);
  
  select('#score').html('Score: ' + score);
  
  //image(video, 0,0); 
  
  ship.show();
  ship.move();
  
  showAndActuateLasers();
  showAndMoveAliens();
  deleteLasers();
  deleteAliens();
  
  gameOver();
}

function gameOver(){
  if (aliens.length < 1){
    gameWon();
  }
  
  for (var k = 0; k < aliens.length; k++) {
    if (aliens[k].y > 450){
     gameLost(); 
    }
  }
}

function showAndActuateLasers(){
  for (var i = 0; i < lasers.length; i++) {
    lasers[i].show();
    lasers[i].move();
    
    for (var j = 0; j < aliens.length; j++) {
    if (lasers[i].hits(aliens[j])){
        aliens[j].destroy();
        lasers[i].destroy();
        score += 10;
      explosion.play();
        }
    }
  }
}

function showAndMoveAliens(){
  //variable to check if aliens hit the right
  var edge = false;
  
  for (var k = 0; k < aliens.length; k++) {
    aliens[k].show();
    aliens[k].move();
    
    if(aliens[k].x + 40 > width || aliens[k].x < 0) {
      // 40 is Alien's width times 2
     edge = true; 
    }
  }
  
  //changes aliens direction
  if (edge) {
  for (var k = 0; k < aliens.length; k++) {
    aliens[k].shiftDown();
    }    
  }
}

function deleteLasers(){
  //deletes lasers from existence
  for (var i = lasers.length-1; i >= 0; i--) {
    if (lasers[i].toDelete) {
      lasers.splice(i, 1);
    }
  }
}

function deleteAliens(){
  //deletes aliens from existence
  for (var i = aliens.length-1; i >= 0; i--) {
    if (aliens[i].toDelete) {
      aliens.splice(i, 1);
    }
  }
}


function keyReleased(){
  if (key != ' '){
  ship.setDir(0); 
  }
}

function keyPressed(){
  
  if (key === ' ') {
    var laser = new Laser(ship.x, height - 30 );
    lasers.push(laser);
    laserBlast.play();
  }
  
  if (keyCode === RIGHT_ARROW){
    ship.setDir(1); 
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}

function gestureMovement(label) {
  if (label === 'F') {
    var laser = new Laser(ship.x, height - 30 );
    lasers.push(laser);
    laserBlast.play();
  }
  
  if (label === 'R'){
    ship.setDir(1); 
  } else if (label === 'L') {
    ship.setDir(-1);
  } else if (label === 'N') {
    //do nothing
  }
}