let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
let score = 0;
let lives = 3;
let paddle = new Paddle();
let ball = new Ball(canvas, paddle);
let bricksObject = new Bricks(ball);



//bricksObject.status = 1;
//brick.status = 1;
//console.log(bricksObject.bricks[1][1]);
function drawScore() {

    ctx.font = "16px Arial";
    ctx.fillStyle = '#0095dd';
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16 px Arial";
    ctx.fillStyle = '0095dd';
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        paddle.rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        paddle.leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        paddle.rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        paddle.leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddle.paddleX = relativeX - paddle.paddleWidth / 2;
    }

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.drawBall();
    paddle.drawPaddle();
    bricksObject.drawBricks();
    bricksObject.collisionDetection();
    drawScore();
    drawLives();
    ball.x += ball.dx;
    ball.y += ball.dy;
    requestAnimationFrame(draw);
}
draw();