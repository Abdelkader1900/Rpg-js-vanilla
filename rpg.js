const keys = {};
const inventory = [];
let isInventoryOpen = false;


window.addEventListener("keydown", function(e){
    keys[e.key] = true;
});
window.addEventListener("keyup", function(e){
    keys[e.key] = false;
});


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

function death(){
    if (player.hp <= 0){
        ctx.fillStyle = "rgba(0,0,150,0.4)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "60px Comic Sans MS";
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
    check_cookie_pickup();
    draw_entity(player);
    draw_attack_hitbox();
    draw_entity(ennemy);
    if (cookieItem.visible) draw_entity(cookieItem);
    draw_hud();
    if (death()) return;
    if(isInventoryOpen){
        draw_inventory();
        return;
    }
    if (isPaused) { 
        draw_pause();
        return;

    }
    requestAnimationFrame(loop);
}

loop();
