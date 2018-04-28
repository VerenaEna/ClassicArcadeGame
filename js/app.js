// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x - 150;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    this.x = this.x + this.speed * dt;
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemies reaches the end of the canvas, enemies start again from left with random speed
    if(this.x >= 510){
      this.x = -100;
      this.speed = 150 + (Math.floor(Math.random() * 251));
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.player = 'images/char-cat-girl.png';
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemyLoc = [58, 144, 226];

// Ittarate through each enemy located on the y axis
// starting from 0 on the x axis move at a speed of 200
// Until randomly regenerated in the enemy update function above
enemyLoc.forEach(function (locationY) {
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});

const player = new Player(202,405);



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
