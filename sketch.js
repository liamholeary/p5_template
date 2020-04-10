
var canvasWidth = 640;
var canvasHeight = 480;

var player = 0;
var playerX = 300;
var playerY = 100;
var sprWidth = 64;
var sprHeight = 64;
var speed = 4;

var monster = 0;
var monsterX = 300;
var monsterY = 300;

var projectile = 0;

var direction = 90;

var ghost = 0;
var ghostX = 100;
var ghostY = 100;

function preload()
{
    bgImg = loadImage("images/background.png");
    playerImg = loadImage("images/player.png");
    monsterImg = loadImage("images/monster.png");
    projectileImg = loadImage("images/projectile.png");
    ghostImg = loadImage ("images/ghost.png");
}
function setup()
{
    createCanvas(canvasWidth, canvasHeight);
    player = createSprite(playerX, playerY, sprWidth, sprHeight);
    player.addImage(playerImg, "images/player.png");
    monster = createSprite(monsterX, monsterY, sprWidth, sprHeight);
    monster.addImage(monsterImg, "images/monster.png");
    ghost = createSprite(ghostX, ghostY, sprWidth, sprHeight);
    ghost.addImage(ghostImg, "images/ghost.png");
    
    projectile = new Group();
    
    enemy = new Group();
    enemy.add(monster);
    
    player.setCollider("rectangle", 0, 0, 40, 40);
    monster.setCollider("rectangle", 0, 0, 40, 40);
}

function playerControls()
{
    if(keyIsDown(RIGHT_ARROW))
  {
        player.position.x += speed;
        if(player.position.x + sprWidth/2 > canvasWidth)
            {
                player.position.x = canvasWidth - sprWidth/2;
            }
  }
    else if(keyIsDown(LEFT_ARROW))
    {
        player.position.x -= speed; 
        if(player.position.x < 0 + sprWidth/2)
        {
            player.position.x = 0 + sprWidth/2;
        }
    }
    else if(keyIsDown(UP_ARROW))
    {
        player.position.y -= speed;
        if(player.position.y < 0 + sprHeight)
            {
                player.position.y = 0 + sprHeight/2;
            }
    }
    else if(keyIsDown(DOWN_ARROW))
    {
        player.position.y += speed;
        {
            if(player.position.y + sprHeight/2 > canvasHeight)
            {
                player.position.y = canvasHeight - sprHeight/2;
            }
        }
    }
}

function enemyMovements() {
    direction += 2;
    monster.setSpeed(3, direction);
}

function collisions() {
    enemy.collide(projectile);
    player.collide(enemy);
}

function mousePressed() {
    projectile = createSprite(player.position.x, player.position.y);
    projectile.addImage(projectileImg);
    projectile.attractionPoint(10+speed, mouseX, mouseY);
    projectile.setCollider("rectangle", 0, 0, 40, 40);
}

function draw()
{
    background(bgImg);
    playerControls();
    drawSprites();
    collisions();
    enemyMovements();
    ghost.attractionPoint(0.2, player.position.x, player.position.y)
    ghost.maxSpeed = 4;
}