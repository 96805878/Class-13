var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score = 0;
var cloud, cloudsGroup, cloudImage;
var ob1,ob2,ob3,ob4,ob5,ob6;


var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  ob1 = loadImage("obstacle1.png")
  ob2 = loadImage("obstacle2.png")
  ob3 = loadImage("obstacle3.png")
  ob4 = loadImage("obstacle4.png")
  ob5 = loadImage("obstacle5.png")
  ob6 = loadImage("obstacle6.png")

  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  
}

function draw() {
  background(180);
  
  textSize(15)
  
  text("score: "+score,500,50)
  score=Math.round(frameCount/4)
  
  if(keyDown("space") && trex.y>=100) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  spawnClouds();
  spawnCacti();
  drawSprites();
}

function spawnCacti() {
    
    if(frameCount % 60 === 0){
      var cactus=createSprite(600,160,10,10)
      var ranNum=Math.round(random(1,6));
      cactus.velocityX=-4 
      switch(ranNum){
          case 1: cactus.addImage(ob1)
              break;
          case 2: cactus.addImage(ob2)
              break;
          case 3: cactus.addImage(ob3)
              break;
          case 4: cactus.addImage(ob4)
              break;
          case 5: cactus.addImage(ob5)
              break;
           case 6: cactus.addImage(ob6)
              break;
          default:break;
      }
      cactus.lifetime=155
     cactus.scale=0.6
      console.log(cactus.lifetime)
    }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    //solution of the memory leak
    cloud.lifetime=210
    }
}

