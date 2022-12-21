var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4;
  edges=createEdgeSprites();
  doorG=createGroup();
  climberG=createGroup();
  blockG=createGroup()
  ghost.setCollider("circle", -13, 20, 120)
}

function draw() {
  background(200);
  
  if (gameState==="play") {
    if(tower.y > 400){
      tower.y = 300
    }
    
    if (keyDown("SPACE")) {
      ghost.velocityY = -6
    }

    ghost.velocityY = ghost.velocityY + 0.3
   
    ghost.velocityX = 0
    
    if (keyDown("left")) {
      ghost.velocityX = -3
    }
    
    if (keyDown("right")) {
      ghost.velocityX = 3
    }
    
    ghost.collide(edges[2]);
    ghost.collide(edges[0]);
    ghost.collide(edges[1]);
     
    doors()

    ghost.collide(climberG)

    if (ghost.isTouching(blockG)||ghost.y > 600) {
      gameState = "end"
    }
  }

  if(gameState === "end") {
    tower.destroy()
    ghost.destroy()
    doorG.destroyEach()
    climberG.destroyEach()
    blockG.destroyEach()
    textSize(30)
    fill("yellow")
    text("Game Over", 230, 280)
   
  }
  drawSprites();
}

function doors() {
  
  if (frameCount%200===0){
    door=createSprite(random(100, 500), -50)
    door.addImage(doorImg);
    door.velocityY = 1 
    climber=createSprite(door.x, 0)
    climber.addImage(climberImg);
    climber.velocityY = 1 
    ghost.depth = door.depth + 1
    block=createSprite(door.x, 10, 50, 10)
    block.velocityY = 1 
    block.visible = false
    doorG.add(door)
    climberG.add(climber)
    blockG.add(block)
  }

}
