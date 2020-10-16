var bg, monkey, monkeyrunning, ground, Foodgroup, bananaImg, obstaclesgroup, obstacleimg, bgimg, groundimg;
var score = 0;

function preload() {
  bgimg = loadImage("jungle.jpg");

  monkeyrunning = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImg = loadImage("banana.png");
 obstacleimg = loadImage("stone.png");
}


function setup() {
  createCanvas(400, 400);

  bg = createSprite(0, 0);
  bg.addImage(bgimg);
  bg.x = bg.width / 2;
  bg.velocityX = -5;

  ground = createSprite(400, 360, 400, 10);
  ground.x = ground.width / 2;
  ground.velocityX = -4;
  ground.visible = false;

  monkey = createSprite(50, 250);
  monkey.addAnimation("monkeyrunning", monkeyrunning);
  monkey.scale = 0.1;

  score = 0;

  Foodgroup = createGroup();
  obstaclesgroup = createGroup();
  textSize(20);
  fill("white");
}

function draw() {

  if (bg.x < 100) {
    bg.x = bg.width / 2;
  }

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }

  if (Foodgroup.isTouching(monkey)) {
    Foodgroup.destroyEach();
    score = score + 2;
  }


  switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    default:
      break;
  }
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }

  if (obstaclesgroup.isTouching(monkey)) {
    monkey.scale = 0.08;
    score = score - 1;
    obstaclesgroup.destroyEach();
  }

  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);


  food();
  Obstacles();
  drawSprites();
  text("Score: " + score, 300, 30);
}

function food() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(200, random(120, 200));
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 90;
    Foodgroup.add(banana);
  }
}

function Obstacles() {
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(400, 310, 10, 40);
    obstacle.addImage(obstacleimg);
    obstacle.velocityX = -6;
    obstacle.lifetime = 300;
        obstacle.scale = 0.2;
    obstaclesgroup.add(obstacle);
  }
}