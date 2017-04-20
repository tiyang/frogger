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
Enemy.prototype.checkCollisions = function(player) {
  if (this.yUnit === player.yUnit) {
    this.left = this.x;
    this.right = this.x + 80;
    player.left = player.x;
    player.right = player.x + 50;
    if (this.right > player.left && this.left < player.right) {
      return true;
    }
  }
  return false;
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
  } else if (direction === 'up' && this.yUnit > 1) {
    this.yUnit -= 1;
    this.y -= 83;
  } else if (direction === 'down' && this.yUnit < 5) {
    this.yUnit +=1;
    this.y += 83;
  } else if (direction === 'up' && this.yUnit === 1) {
    this.reset();
  }
};

Player.prototype.init = function() {
  this.x = 101 * 2;
  this.yUnit = 5;
  this.y = this.yUnit * 83 - 25;
};

Player.prototype.reset = function() {
  this.x = 101 * 2;
  this.yUnit = 5;
  this.y = this.yUnit * 83 - 25;
};

// Use Game to control the game
var Game = function() {
  this.init();
};

Game.prototype.init = function() {
  this.player = new Player();
  this.allEnemies = [];
  for (var i = 0; i <5; i++) {
    var enemy = new Enemy();
    this.allEnemies.push(enemy);
  }
};

Game.prototype.update = function(dt) {
  this.player.update();
  this.allEnemies.forEach(function(enemy) {
    enemy.update(dt);
  });
};

Game.prototype.render = function() {
  this.player.render();
  this.allEnemies.forEach(function(enemy) {
    enemy.render();
  });
};

Game.prototype.checkCollisions = function() {
  var player = this.player;
  this.allEnemies.forEach(function(enemy) {
    if (enemy.checkCollisions(player)) {
      player.reset();
    }
  });
};

var game = new Game();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  game.player.handleInput(allowedKeys[e.keyCode]);
});
