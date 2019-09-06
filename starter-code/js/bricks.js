class Bricks {

    constructor() {
        this.brickRowCount = 8;
        this.brickColumnCount = 58;
        this.brickWidth = 20;
        this.brickHeight = 10;
        this.brickPadding = 5;
        this.brickOffsetTop = 30;
        this.brickOffsetLeft = 30;
        this.bricks = [];
    }

    drawBricks() {

        for (let columns = 0; columns < this.brickColumnCount; columns++) {
            this.bricks[columns] = [];
            for (let rows = 0; rows < this.brickRowCount; rows++) {
                this.bricks[columns][rows] = {
                    x: 0,
                    y: 0,
                    status: 1
                };
            }
        }

        for (let columns = 0; columns < this.brickColumnCount; columns++) {
            for (let rows = 0; rows < this.brickRowCount; rows++) {

                let brickX = (columns * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                let brickY = (rows * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                this.bricks[columns][rows].x = brickX;
                this.bricks[columns][rows].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                ctx.fillStyle = "#0095dd";
                ctx.fill();
                ctx.closePath();

            }
        }
    }

}