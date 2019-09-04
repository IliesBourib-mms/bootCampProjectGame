let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 5;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = -2;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 50;
let paddleX = (canvas.width-paddleWidth)/2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 5;
let brickColumnCount = 30;
let brickWidth = 20;
let brickHeight = 10;
let brickPadding = 5;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let score = 0;
let lives = 3;

let bricks = [];
for (let columns=0;columns<brickColumnCount;columns++){
    bricks[columns] = [];
    for (let rows=0;rows<brickRowCount;rows++){
     bricks[columns][rows]= {x: 0,y: 0,status:1};
    }
}
function collisionDetection (){
    for (let columns= 0;columns<brickColumnCount;columns++){
        for(let rows=0;rows<brickRowCount;rows++){
            let brick = bricks[columns][rows];
            if(brick.status=== 1){
            if(x>brick.x && x<brick.x+brickWidth && y>brick.y && y<brick.y+brickHeight){
                dy = -dy;
                brick.status = 0;
                score++;
                if(score === brickColumnCount*brickRowCount){
                    alert("You have won!");
                    document.location.reload;
                }
                }
            }
        }
    }
}
function drawScore(){

    ctx.font = "16px Arial";
    ctx.fillStyle = '#0095dd';
    ctx.fillText("Score: "+score,8,20);
}

function drawLives(){
    ctx.font = "16 px Arial";
    ctx.fillStyle = '0095dd';
    ctx.fillText ("Lives: "+lives,canvas.width-65,20);
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove",mouseMoveHandler,false);

function keyDownHandler(e){
    if (e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}
function keyUpHandler(e){
    if (e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}

function mouseMoveHandler(e){
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX> 0 && relativeX< canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }

}

function drawBall() {
    
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#190707";
    ctx.fill();
    ctx.closePath();


}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = "#190707";
    ctx.fill();
    ctx.closePath();
}

function drawBricks(){
    for(let columns=0;columns<brickColumnCount;columns++){
        for(let rows = 0;rows<brickRowCount;rows++){
            if(bricks[columns][rows].status ===1){
            let brickX = (columns*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (rows*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[columns][rows].x = brickX;
            bricks[columns][rows].y=brickY;
            ctx.beginPath();
            ctx.rect(brickX,brickY,brickWidth,brickHeight);
            ctx.fillStyle="#0095dd";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
        
    }
    if (y + dy < ballRadius) {
        dy = -dy;  
    }
    else if (y + dy > canvas.height-ballRadius){
        if(x > paddleX && x < paddleX + paddleWidth){
            dy = -dy;
            

        }
        else{
            lives--;
        if(!lives){
            alert("Game Over");
            document.location.reload();
        }
        else{

        
        x = canvas.width/2;
        y = canvas.height -30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth/2);
            }
        }
    }
    if(rightPressed) {
        paddleX += 7;
        if(paddleX+paddleWidth> canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed){
        paddleX -= 7;
        if (paddleX <0){
            paddleX = 0;
        }
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}


draw();