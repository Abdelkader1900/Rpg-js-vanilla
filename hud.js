function draw_pause(){
    ctx.fillStyle = "rgba(78, 78, 78, 0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "60px Comic Sans MS bold";
    ctx.fillText("PAUSE", canvas.width/2 - 90, canvas.height/2);
}

function draw_hud(){
    ctx.fillStyle = "rgba(49, 49, 49, 0.4)";
    ctx.fillRect(600, 500,200,100);
    ctx.fillRect(750, 10, 40, 40);
    ctx.font = "14px Comic Sans MS bold";
    ctx.fillStyle = "White";
    ctx.fillText("Arme", 750 , 60); 
    ctx.fillText("Level : " + player.level,610, 520);
    ctx.fillText("Hp : " + player.hp,610, 540);
    ctx.fillText("Attack : " + player.attack,610, 560);
    ctx.fillText("Defence : " + player.defence,610, 580);
    ctx.fillStyle = "black";
    ctx.fillRect(670, 530, 100 ,10);
    ctx.fillStyle = "red";
    ctx.fillRect(670, 530, player.hp ,10);
    ctx.fillRect(ennemy.x-25, ennemy.y-20, ennemy.hp ,5);
    ctx.fillStyle = "black";
    ctx.fillRect(670, 510, 100 ,10);
    ctx.fillStyle = "blue";
    ctx.fillRect(670, 510, player.xp ,10);
}