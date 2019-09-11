let pongCanvas;
let pongCanvasContext;
let ballX = 50;
let ballSpeedX = 10;
let ballY = 50;
let ballSpeedY = 4;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
let player1Score = 0;
let player2Score = 0;

function calculateMousePosition(evt) {
    let rect = pongCanvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientx - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

window.onload = function () {
    pongCanvas = document.getElementById('pongGame');
    pongCanvasContext = pongCanvas.getContext('2d');
    let framesPerSecond = 30;
    setInterval(function () {
        move();
        draw();
    }, 1000 / framesPerSecond);
    pongCanvas.addEventListener('mousemove', function (evt) {
        let mousePos = calculateMousePosition(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    });
}


function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = pongCanvas.width / 2;
    ballY = pongCanvas.height / 2;

}

function move() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
        }
            else {
                player2Score++;
            ballReset();
        }
    }

    if (ballX > pongCanvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX;
        }
            else {
                player1Score++;
            ballReset();
        }
        

    }


    if (ballY > pongCanvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}


function draw() {
    // next line draws the canvas
    colorRect(0, 0, pongCanvas.width, pongCanvas.height, 'black');
    // this is the left paddle
    colorRect(0, paddle1Y, 10, PADDLE_HEIGHT, 'white');
// this the right paddle
    colorRect(pongCanvas.width -PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    // next line draws the ball
    colorCircle(ballX, ballY, 10, 'white');

    pongCanvasContext.fillText("Score Player 1:" +player1Score,100,100);
    pongCanvasContext.fillText("Score Player 2:"+player2Score,pongCanvas.width - 200,100);



}

function colorCircle(centerX, centerY, radius, drawColor) {
    pongCanvasContext.fillStyle = drawColor;
    pongCanvasContext.beginPath();
    pongCanvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2);
    pongCanvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    pongCanvasContext.fillStyle = drawColor;
    pongCanvasContext.fillRect(leftX, topY, width, height);
}