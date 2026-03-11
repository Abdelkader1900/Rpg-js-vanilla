const cols = 3;
const rows = 3;
const slotSize = 60;  
const padding = 20;    
const startX = canvas.width/2 - 110;
const startY = canvas.height/4 + 50;

function draw_inventory(){
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(223, 223, 223, 1)";
    ctx.fillRect(canvas.width/2-150, canvas.height/4, 300, 300);
    ctx.font = "30px Arial";
    ctx.fillText("Inventaire", canvas.width/2-150, 148);
    for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const x = startX + col * (slotSize + padding);
        const y = startY + row * (slotSize + padding);
        ctx.fillStyle = "rgba(100, 100, 100, 0.8)";
        ctx.fillRect(x, y, slotSize, slotSize);
        ctx.strokeStyle = "white";
        ctx.strokeRect(x, y, slotSize, slotSize);
    }
}


}