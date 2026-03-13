const cols = 3;
const rows = 3;
const slotSize = 60;  
const padding = 20;    
const startX = canvas.width/2 - 110;
const startY = canvas.height/4 + 50;
 //  le nombre de slots dans l'inventaire

function draw_inventory(){
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(223, 223, 223, 1)";
    ctx.fillRect(canvas.width/2-150, canvas.height/4, 300, 300);
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("Inventaire", canvas.width/2-150, 148);
    for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const i = row * cols + col;
        const x = startX + col * (slotSize + padding);
        const y = startY + row * (slotSize + padding);
        ctx.fillStyle = "rgba(100, 100, 100, 0.8)";
        ctx.fillRect(x, y, slotSize, slotSize);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x, y, slotSize, slotSize);
        if (inventory[i]) {
            ctx.drawImage(inventory[i].sprite, x, y, slotSize, slotSize);
            }
        }  
    }
}

function use_item(i){
    if(!inventory[i]){
        return
    }
    if (inventory[i].name === "cookie"){
        player.hp = Math.min(100, player.hp + 5);
        inventory.splice(i, 1);
    }
}

canvas.addEventListener("click", function(e){
    if (!isInventoryOpen){
        return
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const x = startX + col * (slotSize + padding);
        const y = startY + row * (slotSize + padding);
        const i = row * cols + col;
        if (mouseX > x && mouseX < x + slotSize &&
                mouseY > y && mouseY < y + slotSize) {
                use_item(i);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
                draw_entity(player);
                draw_entity(ennemy);
                if (cookieItem.visible) draw_entity(cookieItem);
                draw_hud();
                draw_inventory();
        }
    }
    }

});



