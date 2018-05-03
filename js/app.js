/*TODO: creative extra!
  - the player has 3 lives from start - if player collide he loose one live - if he lost all lives - modal appears?
  - collectable items - if all items found - modal appears
  - timer?
  - counter! missed attempt // found the water
*/

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

    //TODO: chech for collision of player with enemy
    // research: https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detection
      // TODO: add reset();
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
// method to move with arrow keys
// method to check player can not move offscreen
Player.prototype.handleInput = function(keypress) {
    if(keypress == 'left' && this.x > 50){
      this.x = this.x - 100;
    };
    if(keypress == 'right' && this.x < 400){
      this.x = this.x + 100;
    };
    if(keypress == 'up' && this.y > 0){
      this.y = this.y - 83;
    };
    if(keypress == 'down' && this.y < 400){
      this.y = this.y + 83;
    }
    // if player reaches the top - water - the player moves on start position
    if(this.y < 0){
      setTimeout(() => {
        this.x = 202;
        this.y = 405;
      }, 300);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemyLoc = [58, 144, 226];

// Ittarate through each enemy located on the y axis
// starting from 0 on the x axis with a move speed of 200
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
