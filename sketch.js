var dumpsterImg
var coinImg
var dumpster
var thief
var invisground
var Ground;
var road
var coin;
var coins = 0;
var PLAY;
var END;
var coinSound;
var gameState = PLAY;






function preload(){
  thief_running = loadImage("thief13.png");
  dumpsterImg = loadImage("dumpster.png");
  coinImg = loadImage("coinImg1.png");
  road = loadImage("Background.png");
  coinSound = loadSound("coinSound.wav");
}

function setup() {
 createCanvas(1000,500);
  
 Ground = createSprite(830,100,500,100);
 Ground.addImage(road);
Ground.velocityX = -5;
Ground.scale=0.5


 thief = createSprite(80,450,20,20);
  thief.addImage("thief",thief_running);
  thief.setCollider('circle',0,0,1000)
  thief.scale=0.05;
  

 dumpsterGroup = new Group;
 coinGroup = new Group;
  
 invisground = createSprite(75,450,500,20);
 
 invisground.visible=false;

}

function draw() {
 background(135, 206, 235);
  
  if(gameState==PLAY){

   if(Ground.x<500){
   Ground.x=Ground.width/4
 }

  //thief.debug=true

  invisground.velocityX= 5;


  if(invisground.x<1){
    invisground.x=invisground.width/2;
  }

 thief.collide(invisground);
 thief.velocityY = thief.velocityY + 0.8;
  
  spawnDumpster();
  spawnCoin();
  
if(keyDown("space")&& thief.y >=250){
  thief.velocityY = -15;
}

  if (thief.isTouching(coinGroup)) {
    coins=coins+1;
    coinSound.play();
    coinGroup.destroyEach();
  }

  

}

  
  
if(gameState == END){
   


  if(thief.isTouching(dumpsterGroup)){
    gameState = END;
    textSize(20);
     stroke("black");
     text("GameOver",250,250);
     console.log(theif.position)
     
  } 
  thief.velocityX=0;
  road.velocityX=0;
  invisground.velocityX= 0;

}
drawSprites();
  textSize(20);
  stroke("red");
  text("COINS:"+coins,250,250);
 

    
}


function spawnDumpster(){
  if(frameCount %300 === 0){
    dumpster = createSprite(400,410,10,10);
    dumpster.addImage(dumpsterImg);
  dumpster.scale = 0.01;
  dumpster.velocityX=-5;
  dumpster.x = Math.round(random(1000,20));
  dumpster.lifetime = 860;
    dumpsterGroup.add(dumpster);
   
  }
  
}



function spawnCoin(){
  if(frameCount%120 === 0){
    coin = createSprite(150,400,5,5);
    coin.addImage("coin",coinImg);
   coin.velocityX=-5
   coin.x = Math.round(random(1000,25));
   coin.lifetime = 150;
    coinGroup.add(coin);
  }
 
} 


function reset(){
  if(keyDown("space")){
  gameState=PLAY;
  }
}


