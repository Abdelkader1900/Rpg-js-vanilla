let lastHit = 0;

function attack (){
    if (keys[" "]){
        player.isAttacking = true;
    } else { 
        player.isAttacking = false;
    }
}

function draw_attack_hitbox(){
    ctx.fillStyle = "rgba(255, 221, 0, 0.27)";
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

function damage(){
     if( player.facing == "right"){
       if(ennemy.x < player.x + player.width + player.attackRange/2 && 
          ennemy.x + ennemy.width > player.x + player.width){
        if(player.isAttacking){
            ennemy.hp -= player.attack ;
            ennemy.x += 2;
        } 
       }
     }

     if( player.facing == "left"){
       if(ennemy.x > player.x - player.width - player.attackRange/2 && 
          ennemy.x + ennemy.width < player.x + player.width){
        if(player.isAttacking){
            ennemy.hp -= player.attack ;
            ennemy.x -= 2;
        } 
       }
     }

     if( player.facing == "down"){
       if(ennemy.y <= player.y + player.height + player.attackRange/2 && 
          ennemy.y > player.y + player.height){
        if(player.isAttacking){
            ennemy.hp -= player.attack ;
            ennemy.y += 2;
        } 
       }
     }

     if( player.facing == "up"){
       if(ennemy.y > player.y - player.height - player.attackRange/2 && 
          ennemy.y + ennemy.height < player.y + player.height){
        if(player.isAttacking){
            ennemy.hp -= player.attack ;
            ennemy.y -= 2;
        } 
       }
     }
    }
         

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
