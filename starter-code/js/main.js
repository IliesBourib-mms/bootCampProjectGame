

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let score = 0;
let lives = 3;
let paddle = new Paddle();
let ball = new Ball(canvas, paddle);
let bricksObject = new Bricks();
console.log(bricksObject);
bricksObject.status = 1;
let brick =bricksObject;
console.log(brick);

function collisionDetection (){
  console.log(brick.status);
    for (let columns= 0;columns<bricksObject.brickColumnCount;columns++){
        for(let rows=0;rows<bricksObject.brickRowCount;rows++){
            if(brick.status=== 1){
            if(ball.x>brick.x && ball.x<brick.x+brick.brickWidth && ball.y>brick.y && ball.y<brick.y+bricks.brickHeight){
                console.log(bricksObject.bricks[columns][rows]);
                dy = -dy;
                brick.status = 0;
                score++;
                if(score === bricksObbject.brickColumnCount*bricksObject.brickRowCount){
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
//document.addEventListener("mousemove",mouseMoveHandler,false);

function keyDownHandler(e){
    if (e.key == "Right" || e.key == "ArrowRight"){
        paddle.rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft"){
        paddle.leftPressed = true;
    }
}
function keyUpHandler(e){
    if (e.key == "Right" || e.key == "ArrowRight"){
        paddle.rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft"){
        paddle.leftPressed = false;
    }
}

/*function mouseMoveHandler(e){
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX> 0 && relativeX< canvas.width){
        this.paddleX = relativeX - paddleWidth/2;
    }

}*/







function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle();
    bricksObject.drawBricks();
    collisionDetection();
    drawScore();
    drawLives();   
   ball.x += ball.dx;
   ball.y += ball.dy;
    requestAnimationFrame(draw);
}


draw();