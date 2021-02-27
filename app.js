

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//ボールの位置
var x = canvas.width / 2;
var y = canvas.height - 30;

//微小な変化
var dx = 2;
var dy = -2;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var score = 0;
var lives = 3;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var brick = [];

for(var c = 0; c < brickColumnCount; c++) {
  brick[c] = [];
  for(var r = 0; r < brickRowCount; r++) {
    brick[c][r] = {x: 0, y: 0, status: 1};
  }
}

//衝突検出
function collisionDetection() {
  for(var c = 0; c < brickColumnCount; c++) {
    for(var r = 0; r < brickRowCount; r++) {
      var b = brick[c][r];

      if(b.status == 1) {
        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight){
          dy = -dy;
          b.status = 0;
          score++;

          if(score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score:" + score, 8, 20);
}
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("live:" + lives, canvas.width - 65, 20);
}

function drawBall() {
  //まる
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//下のバー
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}


//上の壊すやつ
function drawBricks() {
  for(var c = 0; c < brickColumnCount; c++) {
    for(var r = 0; r < brickRowCount; r++) {

      if(brick[c][r].status == 1) {
        var bricksX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var bricksY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        brick[c][r].x = bricksX;
        brick[c][r].y = bricksY;
  
        ctx.beginPath();
        ctx.rect(bricksX, bricksY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawBricks();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if(y + dy < ballRadius) {
    dy = -dy;
  }else if(y + dy > canvas.height - ballRadius){

    if(x > paddleX && x < paddleX + paddleWidth) {
      if(y = y - paddleHeight) {
        dy = -dy;
      }
    }
    else {
      lives--;

      if(!lives) {
        alert("GAME OVER");
        document.location.reload();
      }
      else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
      }
    }
  }

  if(x + dx > canvas.width - ballRadius | x + dx < ballRadius) {
    dx = -dx;
  }

  if(rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }


  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressd = true; 
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressd = false; 
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    lefttPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

draw();

