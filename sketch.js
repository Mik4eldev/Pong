let leftPaddle, rightPaddle;
let ball;
let leftScore = 0;
let rightScore = 0;

function setup() {
  createCanvas(600, 400);
  
  // Criando as raquetes
  leftPaddle = new Paddle(true);
  rightPaddle = new Paddle(false);
  
  // Criando a bola
  ball = new Ball();
}

function draw() {
  background(0);
  
  // Desenhando as raquetes
  leftPaddle.show();
  rightPaddle.show();
  
  // Movendo as raquetes
  leftPaddle.move();
  rightPaddle.move();
  
  // Desenhando a bola
  ball.show();
  ball.move();
  
  // Verificando colisões da bola com as raquetes
  if (ball.hitsPaddle(leftPaddle) || ball.hitsPaddle(rightPaddle)) {
    ball.reverseX();
  }
  
  // Verificando colisões com as bordas superior e inferior
  if (ball.hitsTop() || ball.hitsBottom()) {
    ball.reverseY();
  }
  
  // Verificando se a bola saiu pela esquerda ou direita
  if (ball.hitsLeft()) {
    rightScore++;
    ball.reset();
  } else if (ball.hitsRight()) {
    leftScore++;
    ball.reset();
  }
  
  // Exibindo a pontuação
  textSize(32);
  fill(255);
  text(leftScore, width / 4, 50);
  text(rightScore, width * 3 / 4, 50);
}

class Paddle {
  constructor(isLeft) {
    this.w = 10;
    this.h = 80;
    this.y = height / 2 - this.h / 2;
    this.speed = 5;
    if (isLeft) {
      this.x = 20;
    } else {
      this.x = width - 20 - this.w;
    }
  }
  
  show() {
    fill(255);
    rect(this.x, this.y, this.w, this.h);
  }
  
  move() {
    if (keyIsDown(UP_ARROW) && this.y > 0) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW) && this.y < height - this.h) {
      this.y += this.speed;
    }
  }
}

class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.radius = 10;
    this.xSpeed = random(3, 5) * (random() > 0.5 ? 1 : -1);
    this.ySpeed = random(3, 5) * (random() > 0.5 ? 1 : -1);
  }
  
  show() {
    fill(255);
    ellipse(this.x, this.y, this.radius * 2);
  }
  
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  
  reverseX() {
    this.xSpeed *= -1;
  }
  
  reverseY() {
    this.ySpeed *= -1;
  }
  
  hitsPaddle(paddle) {
    return this.x + this.radius > paddle.x &&
           this.x - this.radius < paddle.x + paddle.w &&
           this.y + this.radius > paddle.y &&
           this.y - this.radius < paddle.y + paddle.h;
  }
  
  hitsTop() {
    return this.y - this.radius < 0;
  }
  
  hitsBottom() {
    return this.y + this.radius > height;
  }
  
  hitsLeft() {
    return this.x - this.radius < 0;
  }
  
  hitsRight() {
    return this.x + this.radius > width;
  }
  
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random(3, 5) * (random() > 0.5 ? 1 : -1);
    this.ySpeed = random(3, 5) * (random() > 0.5 ? 1 : -1);
  }
}
