// Enemies our player must avoid
var Enemy = function(x,y,speed) {
  // Variables applied to each of our instances go here,
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
  //checks for collision of player with enemy
  if (player.x < this.x + 50 &&
   player.x + 50 > this.x &&
   player.y < this.y + 50 &&
   50 + player.y > this.y) {
     player.reset();
     score.updateAttempts();
     score.updateMiss();
     score.difference();
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

Player.prototype.update = function() {
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
};
// method to reset Player
Player.prototype.reset = function(){
  player.x = 202;
  player.y = 405;
};
// method to move with arrow keys
// method to check player can not move offscreen
Player.prototype.handleInput = function(keypress) {
  if(keypress == 'left' || keypress == 'a' && this.x > 50 ){
    this.x = this.x - 100;
  };
  if(keypress == 'right' || keypress == 'd' && this.x < 400){
    this.x = this.x + 100;
  };
  if(keypress == 'up' || keypress == 'w' && this.y > 0){
    this.y = this.y - 83;
  };
  if(keypress == 'down' || keypress == 's' && this.y < 400){
    this.y = this.y + 83;
  }
  // if player reaches the top - water - the player moves on start position with a delay
  if(this.y < 0){
    setTimeout(() => {
      this.x = 202;
      this.y = 405;
      alert("You've reached the water");
    }, 300);
    score.updateAttempts();
    score.finalScore();
  }
};
// method to get the score
const Score = function(){
  this.sucess = 0;
  this.attempts = 0;
  this.missed = 0;
  this.final = 0;
}
Score.prototype.updateMiss = function() {
  this.missed++;
  document.getElementById('score--missed').innerHTML = this.missed;
};
Score.prototype.difference = function () {
  this.sucess--;
  document.getElementById('score--final').innerHTML = this.final;
};
Score.prototype.updateAttempts = function() {
  this.attempts++;
  document.getElementById('score--attempts').innerHTML = this.attempts;
};
Score.prototype.finalScore = function() {
  this.final++;
  document.getElementById('score--final').innerHTML = this.final;
};


// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies and set the Location
let allEnemies = [];
let enemyLoc = [58, 144, 226];
// Ittarate through each enemy located on the y axis
// starting from 0 on the x axis with a move speed of 200
enemyLoc.forEach(function (locationY) {
  enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});
// Place the player object in a variable called player
const player = new Player(202,405);
// to get the score
const score = new Score();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      65: 'a',
      68: 'd',
      87: 'w',
      83: 's'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
