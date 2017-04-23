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
  this.velocity = 100 * (4 - this.yUnit);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if (this.x > 101 * 5) {
    this.init();
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

Player.prototype.checkSuccess = function() {
  if (this.yUnit === 0) {
    sound.waterSonud.play();
    this.score += 10;
    this.yUnit = 5;
    this.y = this.yUnit * 83 - 25;
  }
};

Player.prototype.update = function(dt) {
  this.checkSuccess();
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  if (!direction) return;
  sound.moveSound.play();
  if (direction === 'left' && this.x > 0) {
    this.x -= 101;
  } else if (direction === 'right' && this.x < 101 * 4) {
    this.x += 101;
  } else if (direction === 'up' && this.yUnit > 0) {
    this.yUnit -= 1;
    this.y -= 83;
  } else if (direction === 'down' && this.yUnit < 5) {
    this.yUnit +=1;
    this.y += 83;
  }
};

Player.prototype.init = function() {
  this.x = 101 * 2;
  this.yUnit = 5;
  this.y = this.yUnit * 83 - 25;
  this.life = 3;
  this.score = 0;
  this.highest = 0;
};

Player.prototype.reset = function() {
  this.x = 101 * 2;
  this.yUnit = 5;
  this.y = this.yUnit * 83 - 25;
};

// Gem
// Player can collect gems to earn scores
var Gem = function(type) {
  this.init(type);
};

Gem.prototype.init = function(type) {
  this.x = 101 * getRandomInt(0, 4);
  this.yUnit = getRandomInt(1, 3);
  this.y = this.yUnit * 83 - 25;
  if (type === 1) {
    this.sprite = 'images/Gem Blue.png';
  } else if (type === 2) {
    this.sprite = 'images/Gem Green.png';
  } else if (type === 3) {
    this.sprite = 'images/Gem Orange.png';
  }
};

Gem.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.checkCollisions = function(player) {
  if (this.yUnit === player.yUnit) {
    this.left = this.x;
    this.right = this.x + 82;
    player.left = player.x;
    player.right = player.x + 50;
    if (this.right > player.left && this.left < player.right) {
      return true;
    }
  }
  return false;
};

// Sound effects
var Sound = function() {
  this.moveSound = new Howl({
    src: ['audios/move.wav']
  });
  this.bugSound = new Howl({
    src: ['audios/bug.wav']
  });
  this.gemSound = new Howl({
    src: ['audios/gem.wav']
  });
  this.waterSonud = new Howl({
    src: ['audios/water.wav']
  });
  this.loseSound = new Howl({
    src: ['audios/lose.flac']
  });
  this.loopSound = new Howl({
    src: ['audios/8-bit-loop.mp3'],
    loop: true
  });
};

var sound = new Sound();

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
  this.spawnGem();
  sound.loopSound.play();
};

Game.prototype.update = function(dt) {
  this.player.update();
  this.allEnemies.forEach(function(enemy) {
    enemy.update(dt);
  });
};

Game.prototype.render = function() {
  this.gem.render();
  this.player.render();
  this.allEnemies.forEach(function(enemy) {
    enemy.render();
  });
};

Game.prototype.checkCollisions = function() {
  var player = this.player;
  $this = this;
  this.allEnemies.forEach(function(enemy) {
    if (enemy.checkCollisions(player)) {
      sound.bugSound.play();
      player.life -= 1;
      player.reset();
      if (player.life === 0) {
        sound.loseSound.play();
        if (player.score > player.highest) {
          player.highest = player.score;
        }
        $this.reset();
      }
    }
  });
  if (this.gem.checkCollisions(player)) {
    sound.gemSound.play();
    this.player.score += 100;
    this.spawnGem();
  }
};

Game.prototype.reset = function() {
  this.player.score = 0;
  this.player.life = 3;
};

Game.prototype.spawnGem = function() {
  var type = getRandomInt(1, 3);
  this.gem = new Gem(type);
}

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
