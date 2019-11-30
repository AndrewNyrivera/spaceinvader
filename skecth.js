//calling the img 
var img;
var img1;
//loading the image
function preload() {
    
    //img of spaceship
    img = loadImage("https://raw.githubusercontent.com/AndrewNyrivera/spaceinvader/master/babyyoda.png");
    //Alien 1
    img1 = loadImage("https://raw.githubusercontent.com/AndrewNyrivera/spaceinvader/master/stormtrooper.jpg");
    //Don't forget about alien 2 and set up a server

    //explosion image
    img3 = "https://d30y9cdsu7xlg0.cloudfront.net/png/900185-200.png"
}
//starting Part 
function setup() {
    createCanvas(800,600);
}


// where ship starts at
var shipY = 490;
//X-axis of the spaceship
var shipX = 362;
//where laser starts at
var laserY = 480
//laser x-axis
var laserX = 400;

// bullets is a list of [x,y] coordinates
let bullets = [];

// aliens is a list of [x,y,alive], where x,y are coordinates, and alive is a boolean value
let aliens = [];
for(let i = 4; i<=72; i+=4){
    const x = 10*i;
    aliens.push([x, 25, true]);
    aliens.push([x, 75, true]);
}

var laserSpeed = 2;


function draw(){
    //background color 
    background(0);
    // redraw the scene
    drawScene();
    // update the game
    nextStep();
}

function drawScene(){
    // draw aliens
    for(let i = 0; i < aliens.length; i++){
        const thisAlien = aliens[i];
        if(thisAlien[2]){ // only if it's alive
            image(img1, thisAlien[0], thisAlien[1], 30, 50);
        }
   }

   //image draws spaceship
   image(img, shipX,500,75,75);

   // draw the laser
    stroke(0,255,0)
    strokeWeight(2);
    for(let i = 0; i < bullets.length; i++) {
        const laserX = bullets[i][0];
        const laserY = bullets[i][1];
        line(laserX, laserY, laserX, laserY-5);
    }
}

function nextStep(){
    if(shipX>=720){
        shipX=720;
    }
    if(shipX<=10){
        shipX=10;
    }
   if(keyIsDown(LEFT_ARROW)) {
       shipX-= 10;
   }
   if(keyIsDown(RIGHT_ARROW)) {
       shipX+= 10;
   }
   // A and D keys
   if(keyIsDown(65)){
       shipX-= 10;
   }
   if(keyIsDown(68)){
       shipX+= 10;
   }
   // SPACE bar fires
   if(keyIsDown(32)){
       let coordinates = [shipX+37.5, shipY+10];
       // .push adds to the end of an array
       bullets.push(coordinates);
   }
   // add to the bullets y coordinates
   for(let i = 0; i < bullets.length; i++){
       bullets[i][1] -= laserSpeed;
   }

   // loop over each alien, and if it is alive, check if any bullet hit it, if so, set alive to false
   // (hint: loop over the bullets, and check if the x,y of the bullet is inside the alien box)
   for(let i = 0; i < aliens.length; i++) {
       aliens[i][1] += 0.1;
       let thisAlien = aliens[i];
       let alienX = thisAlien[0];
       let alienY = thisAlien[1];
       let alienWidth = 30;
       let alienHeight = 50;
       for(let j = 0; j < bullets.length; j++) {
           let thisBullet = bullets[j];
           let bulletX = thisBullet[0];
           let bulletY = thisBullet[1];
           const isInYRange = bulletY>alienY && bulletY<(alienY+alienHeight);
           const isInXRange = bulletX>alienX && bulletX<(alienX+alienWidth);
           const wasHit = isInYRange && isInXRange;
           if(wasHit){
               aliens[i][2] = false;
           }
       }
    }
}





