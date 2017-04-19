// Get a random rumber between max and min
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Enemies our player must avoid
var Enemy = function() {
  this.sprite = 'images/enemy-bug.png';
  this.init();
};

Enemy.prototype.init = function() {
  this.x = - 101 * getRandomInt(1, 10);
  this.yUnit = getRandomInt(1, 3);
  this.y = this.yUnit * 83 - 25;
  this.velocity = getRandomInt(100, 400);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if (this.x > 101 * 5) {
    this.x = -101 * getRandomInt(1, 10);
    this.velocity = getRandomInt(100, 300);
  } else {
    this.x += (dt * this.velocity);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check if enemy collid with player
Enemy.prototype.checkCollisions = function() {

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.init();
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  if (!direction) return;
  console.log(direction);
  console.log(this.y);
  if (direction === 'left' && this.x > 0) {
    this.x -= 101;
  } else if (direction === 'right' && this.x < 101 * 4) {
    this.x += 101;
  } else if (direction === 'up' && this.y > 83 * 1 - 83 / 3) {
    this.y -= 83;
  } else if (direction === 'down' && this.y < 83 * 5  - 83 / 3) {
    this.y += 83;
  } else if (direction === 'up' && this.y <= 83 * 1 - 83 / 3) {
    this.reset();
  }
};

Player.prototype.init = function() {
  this.x = 101 * 2;
  this.yUnit = 5;
  this.y = this.yUnit * 83 - 25;
};

Player.prototype.reset = function() {
  console.log('reset')
  this.x = 101 * 2;
  this.yUnit = 5;
  this.y = this.yUnit * 83 - 25;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

for (i = 0; i < 5; i++) {
  var enemy = new Enemy();
  allEnemies.push(enemy);
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
