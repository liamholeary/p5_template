
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
    playerImg = loadImage("images/Dent.png");
    monsterImg = loadImage("images/monster.png");
    projectileImg = loadImage("images/projectile.png");
    ghostImg = loadImage ("images/ghost.png");
}
function setup()
{
    createCanvas(canvasWidth, canvasHeight);
    player = createSprite(playerX, playerY, sprWidth, sprHeight);
    player.addImage(playerImg, "images/Dent.png");
    monster = createSprite(monsterX, monsterY, sprWidth, sprHeight);
    monster.addImage(monsterImg, "images/monster.png");
    ghost = createSprite(ghostX, ghostY, sprWidth, sprHeight);
    ghost.addImage(ghostImg, "images/ghost.png");
    
    projectile = new Group();
    
    enemy = new Group();
    enemy.add(monster);
    enemy.add(ghost);
    
    player.setCollider("rectangle", 0, 0, 40, 40);
    monster.setCollider("rectangle", 0, 0, 40, 40);
    ghost.setCollider("rectangle", 0, 0, 40, 40);
    
     for (var i = 0; i < 8; i++) {
         var ang = random(360);
         var px = random(canvasWidth - sprWidth) + sprWidth/2;
         var py = random(canvasHeight - sprHeight) + sprHeight/2;
         createEnemy(px, py);
     }
    
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
    enemy.overlap(projectile, destroyOther);
    player.collide(enemy, gameOver);
}

function destroyOther (destroyed) {
    destroyed.remove();
    projectile.remove();
}

function gameOver() {
    alert("GAME OVER");
    window.location.reload();
    clearInterval(interval);
}

function mousePressed() {
    projectile = createSprite(player.position.x, player.position.y);
    projectile.addImage(projectileImg);
    projectile.attractionPoint(10+speed, mouseX, mouseY);
    projectile.setCollider("rectangle", 0, 0, 40, 40);
}

function createEnemy(x, y) {
    var newEnemy = createSprite(x,y); 
    var attackImage = loadImage("images/enemy.png")
    newEnemy.addImage(attackImage);
    newEnemy.setSpeed(2.5, random(360));
    newEnemy.setCollider("rectangle", 0, 0, 40, 40);
    enemy.add(newEnemy);
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
    for (var i = 0; i < enemy.length; i++)
        {
            var s = enemy[i];
            if (s.position.x < -40) s.position.x = canvasWidth +40;
            if (s.position.x > canvasWidth + 40) s.position.x = -40;
            if (s.position.y < -40) s.position.y = canvasHeight +40;
            if (s.position.y > canvasHeight + 40) s.position.y = -40;
            
        }
}

setInterval(draw, 10);