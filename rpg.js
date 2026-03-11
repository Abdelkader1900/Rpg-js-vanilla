const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const keys = {};
const ennemySprite = new Image();
ennemySprite.src = "src/tungtungtung.png";
const playerSprite = new Image();
playerSprite.src = "src/player.png";
const bg = new Image();
bg.src = "src/bg.jpg";

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

const inventory = [];
let isInventoryOpen = false;


function draw_entity(entity){
    if (entity.sprite) {
        ctx.drawImage(entity.sprite, entity.x, entity.y, entity.width, entity.height);
    } else {
        ctx.fillStyle = entity.color;
        ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
    }
}

window.addEventListener("keydown", function(e){
    keys[e.key] = true;
});
window.addEventListener("keyup", function(e){
    keys[e.key] = false;
});


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function update(){
    if (keys["ArrowDown"]){
        player.facing = "down";
        if (player.y + player.height >= canvas.height){
            player.y = canvas.height - player.height;
        }  else player.y += player.speed};
    if (keys["ArrowUp"]){
        player.facing = "up";
        if (player.y <= 0){
            player.y = 0;
        }  else player.y -= player.speed};
    if (keys["ArrowRight"]){
        player.facing = "right";
        if (player.x + player.width >= canvas.width ){
            player.x = canvas.width - player.width;
        }  else player.x += player.speed};
    if (keys["ArrowLeft"]){
        player.facing = "left";
        if (player.x <= 0 ){
            player.x = 0;
        }  else player.x -= player.speed};
}


function attack (){
    if (keys[" "]){
        player.isAttacking = true;
    } else { 
        player.isAttacking = false;
    }
}

function draw_attack_hitbox(){
    ctx.fillStyle = "rgba(255, 220, 0, 0.45)";
    if (player.isAttacking){
        if (player.facing == "right"){
            ctx.fillRect(player.x + player.width ,player.y, player.attackRange, player.height);
        } else if (player.facing == "left"){
            ctx.fillRect(player.x - player.attackRange  ,player.y, player.attackRange, player.height);
        } else if (player.facing == "up"){
            ctx.fillRect(player.x  ,player.y - player.attackRange, player.width , player.attackRange);
        } else {         
            ctx.fillRect(player.x, player.y + player.height, player.width, player.attackRange);
        } 
    }
}


function move_ennemy(){
    const dx = player.x - ennemy.x;
    const dy = player.y - ennemy.y;
    const distance = Math.sqrt(dx*dx + dy*dy);

    if (distance < 200) {
        if (ennemy.x < player.x) ennemy.x += ennemy.speed-1;
        if (ennemy.x > player.x) ennemy.x -= ennemy.speed-1;
        if (ennemy.y < player.y) ennemy.y += ennemy.speed-1;
        if (ennemy.y > player.y) ennemy.y -= ennemy.speed-1;
    }
}

let lastHit = 0;

function check_collision(){
    if(player.x < ennemy.x + ennemy.width &&
       player.x + player.width > ennemy.x &&
       player.y < ennemy.y + ennemy.height &&
       player.y + player.height > ennemy.y){
        const now = Date.now();

        const overlapLeft   = (ennemy.x + ennemy.width)  - player.x;
        const overlapRight  = (player.x + player.width)  - ennemy.x;
        const overlapTop    = (ennemy.y + ennemy.height) - player.y;
        const overlapBottom = (player.y + player.height) - ennemy.y;

        const minX = Math.min(overlapLeft, overlapRight);
        const minY = Math.min(overlapTop, overlapBottom);

        if (minX < minY) {
            if (overlapLeft < overlapRight) ennemy.x = player.x - ennemy.width;
            else ennemy.x = player.x + player.width;
        } else {
            if (overlapTop < overlapBottom) ennemy.y = player.y - ennemy.height;
            else ennemy.y = player.y + player.height;
        }

        if (now - lastHit > 100) {
            player.hp -= ennemy.attack;
            lastHit = now;
        }
    }
}

function death(){
    if (player.hp <= 0){
        ctx.fillStyle = "rgba(0,0,150,0.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "60px Arial";
        ctx.fillText("GAME OVER", canvas.width/2 - 165, canvas.height/2);
        return true;
    }
    return false;
}

let isPaused = false;
window.addEventListener("keydown", function(e){
    if (e.key === "Escape") {
        isPaused = !isPaused;
        if (isPaused) draw_pause();
        else loop();
    }
    if (e.key === "i") {
        isInventoryOpen = !isInventoryOpen;
        if (isInventoryOpen) draw_inventory();
        else loop();
    }
});


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height, );
    ctx.drawImage(bg,0,0,canvas.width,canvas.height);
    update();
    attack();
    move_ennemy();
    check_collision();
    draw_entity(player);
    draw_attack_hitbox();
    draw_entity(ennemy);
    draw_hud();
    if (death()) return;
    if(isInventoryOpen){
        draw_inventory();
    }
    if (isPaused) { 
        draw_pause();
        return;

    }
    requestAnimationFrame(loop);
}

loop();
