// Width and height of the block
const WIDTH = 101;
const HEIGHT = 83;

// Get a random rumber between max and min
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > WIDTH * 5) {
        this.x = -WIDTH * getRandomInt(1, 10);
        this.velocity = getRandomInt(100, 300);
    } else {
        this.x += (dt * this.velocity);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    console.log(direction);
    if (direction === 'left' && this.x > 0) {
        this.x -= WIDTH;
    } else if (direction === 'right' && this.x < WIDTH * 4) {
        this.x += WIDTH;
    } else if (direction === 'up' && this.y > HEIGHT * 1 - HEIGHT / 3) {
        this.y -= HEIGHT;
    } else if (direction === 'down' && this.y < HEIGHT * 5  - HEIGHT / 3) {
        this.y += HEIGHT;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
player.x = WIDTH * 2;
player.y = HEIGHT * 5 - HEIGHT / 3;

for (i = 0; i < 5; i++) {
    var enemy = new Enemy();
    enemy.x = - WIDTH * getRandomInt(1, 10);
    enemy.y = HEIGHT * (i < 3 ? i + 1 : 5 - i) - HEIGHT / 3;
    enemy.velocity = getRandomInt(100, 400);
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
