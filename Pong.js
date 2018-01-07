const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 400;


// const rand = function(num) {
//   return Math.floor(Math.random() * num) + 1;
// };

const point = {
  x: (canvas.width/2)-5,
  y: (canvas.height/2)-5,
  width: 10,
  height: 10,
  xDelta: 5,
  yDelta: 5,
  color: '#3E1B3C',
};

const bars = {
  leftBar: {
    x: 0,
    y: (canvas.height/2)-40,
    height: 80,
    width: 10,
    yDelta: 30
  },

  rightBar: {
    x: canvas.width-10,
    y: (canvas.height/2)-40,
    height: 80,
    width: 10,
    yDelta: 30
  }
};

const scoreBoard = {
  leftScore: {
    font: '80px Courier New',
    text: 0,
    x: 100,
    y: 80

  },

  rightScore: {
    font: '80px Courier New',
    text: 0,
    x: canvas.width-150,
    y: 80
  }
};

const gameOver = {
  leftWon: {
    font: '180% Courier New',
    text: 'Game Over, Left Player Won',
    color: '#3E1B3C'
  },

  rightWon: {
    font: '180% Courier New',
    text: 'Game Over, Right Player Won',
    color: '#3E1B3C'
  }
};


const draw = function() {

  leftBar = bars.leftBar;
  rightBar = bars.rightBar;
  leftScore = scoreBoard.leftScore;
  rightScore = scoreBoard.rightScore;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = point.color;
  context.fillRect(point.x, point.y, point.width, point.height);

  context.fillStyle = '#69F4BD';
  context.fillRect((canvas.width/2)-1.5, 0, 3, canvas.height);

  context.fillRect(leftBar.x, leftBar.y, leftBar.width, leftBar.height);
  context.fillRect(rightBar.x, rightBar.y, rightBar.width, rightBar.height);

  context.font = leftScore.font;
  context.fillStyle = '#3E1B3C';
  context.fillText(leftScore.text, leftScore.x, leftScore.y);


  context.font = rightScore.font;
  context.fillStyle = '#3E1B3C';
  context.fillText(rightScore.text, rightScore.x, rightScore.y);

};


const updateData = function() {

  point.x += point.xDelta;
  point.y += point.yDelta;

  if(point.x >= canvas.width-point.width || point.x <= 0 || ((point.x <= leftBar.x + leftBar.width && point.y <= leftBar.y + leftBar.height && point.y >= leftBar.y) || (point.x + point.width >= rightBar.x && point.y <= rightBar.y + rightBar.height && point.y >= rightBar.y))) {
    point.xDelta = -point.xDelta;
  }

  if(point.y >= canvas.height-point.height || point.y <= 0) {
    point.yDelta = -point.yDelta;
  }

  if(point.x >= canvas.width-point.width) {
    scoreBoard.leftScore.text++;
  }

  if(point.x <= 0) {
    scoreBoard.rightScore.text++;
  }

};

const loop = function() {
    if(scoreBoard.rightScore.text === 10) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = gameOver.rightWon.font;
    context.fillStyle = gameOver.rightWon.color;
    context.fillText(gameOver.rightWon.text, 20, canvas.height/2);
    return;
  }

  if(scoreBoard.leftScore.text === 10) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = gameOver.leftWon.font;
    context.fillStyle = '#3E1B3C';
    context.fillText(gameOver.leftWon.text, 25, canvas.height/2);
    return;
  }
  draw();
  updateData();

  requestAnimationFrame(loop);
};


const upKey = 38;
const downKey = 40;
const sKey = 83;
const xKey = 88;

document.addEventListener('keydown', function(event) {
  if(event.keyCode === downKey) {
    bars.rightBar.y = bars.rightBar.y + bars.rightBar.yDelta;
    if(bars.rightBar.y >= canvas.height - bars.rightBar.height) {
      bars.rightBar.y = canvas.height - bars.rightBar.height;
    }
  }

  if(event.keyCode === upKey) {
    bars.rightBar.y = bars.rightBar.y - bars.rightBar.yDelta;
    if(bars.rightBar.y <= 0) {
      bars.rightBar.y = 0;
    }
  }

  if(event.keyCode === xKey) {
  bars.leftBar.y = bars.leftBar.y + bars.leftBar.yDelta;
    if(bars.leftBar.y >= canvas.height - bars.leftBar.height) {
      bars.leftBar.y = canvas.height - bars.leftBar.height;
    }
  }

  if(event.keyCode === sKey) {
    bars.leftBar.y = bars.leftBar.y - bars.leftBar.yDelta;
    if(bars.leftBar.y <= 0) {
      bars.leftBar.y = 0;
    }
  }
}, false);

const welcomePage = function() {
	context.font = '300% Courier New';
  context.fillStyle = '#3E1B3C';
  context.fillText('Welcome to Pong!', 25, canvas.height/2);
};

welcomePage();
