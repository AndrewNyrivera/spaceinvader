//calling the img 
var img;
var img1;
//loading the image
function preload() {
    
    //img of spaceship
    img = loadImage("https://cdn0.iconfinder.com/data/icons/video-games-ultra-color/60/050_-_Space_Invaders-512.png");
    //Alien 1
    img1 = loadImage("https://c1.staticflickr.com/3/2076/2527259678_cd753771e6_o.gif");
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
let bullets = []


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
    for(let i = 4; i<=72; i+=4){
    image(img1,10*i,25,30,50);
    image(img1,10*i,25*3,30,50);
   }

   //image draws spaceship
   image(img, shipX,500,75,75);

   // draw the laser
    stroke(0,255,0)
    strokeWeight(2);
    for(let i = 0; i < bullets.length; i++) {
        const laserX = bullets[i][0] + 37.5;
        const laserY = bullets[i][1]+10;
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
       let coordinates = [shipX, shipY];
       // .push adds to the end of an array
       bullets.push(coordinates);
   }
   // add to the bullets y coordinates
   for(let i = 0; i < bullets.length; i++){
       bullets[i][1] -= laserSpeed;
   }
}





