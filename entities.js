const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const ennemySprite = new Image();
ennemySprite.src = "src/tungtungtung.png";
const playerSprite = new Image();
playerSprite.src = "src/player.png";
const bg = new Image();
bg.src = "src/bg.jpg";

function draw_entity(entity){
    if (entity.sprite) {
        ctx.drawImage(entity.sprite, entity.x, entity.y, entity.width, entity.height);
    } else {
        ctx.fillStyle = entity.color;
        ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const player = {
    hp : 100,
    level : 1,
    attack : 2,
    defence : 2,
    speed : 3,
    xp : 10,
    x: 400,
    y: 300,
    width : 60,
    height : 60,
    sprite : playerSprite,
    facing : "right",
    attackRange : 100,
    isAttacking : false,
}

const ennemy = {
    hp : 100,
    attack : 2,
    defence : 2,
    speed : 2,
    x: getRandomInt(canvas.width-30),
    y: getRandomInt(canvas.height-30),
    width : 30,
    height: 60,
    color: "red",
    sprite: ennemySprite,
}
