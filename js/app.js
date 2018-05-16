'use strict';
// @description: Enemies our player must avoid
const Enemy = function(x,y,speed) {
  // Variables applied to each of our instances go here,
  this.x = x - 150;
  this.y = y;
  this.speed = speed;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// @description: Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype = {
  update: function(dt) {
    // You should multiply any movement by the dt parameter
    this.x += this.speed * dt;
    // which will ensure the game runs at the same speed for
    // all computers.

    //if enemies reaches the end of the canvas, enemies start again from left with random speed
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
  },

  // @description: Draw the enemy on the screen, required method for game
  render: function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};
// @description: player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x,y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.player = 'images/char-cat-girl.png';
};
Player.prototype = {
  update: function() {
  },
  //method to draw player
  render: function() {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
  },
  // method to reset Player
  reset: function(){
    this.x = 202;
    this.y = 405;
  },
  // @description: method to move with arrow keys
  // @description: method to check player can not move offscreen
  handleInput: function(keypress) {
    if(keypress == 'left' && this.x > 50 || keypress == 'a' && this.x > 50 ){
      this.x = this.x - 100;
    }
    if(keypress == 'right' && this.x < 400 || keypress == 'd' && this.x < 400){
      this.x = this.x + 100;
    }
    if(keypress == 'up' && this.y > 0 || keypress == 'w' && this.y > 0){
      this.y = this.y - 83;
    }
    if(keypress == 'down' && this.y < 400 || keypress == 's' && this.y < 400){
      this.y = this.y + 83;
    }
    // if player reaches the top - water - the player moves on start position with a delay
    if(this.y < 0){
      setTimeout(() => {
        player.reset();
      }, 300);
      score.updateAttempts();
      score.finalScore();
    }
    // if the player reaches the water 10 times - finish game - reset everything to start
    if(score.attempts === 0){
      setTimeout(() => {
        score.message();
        score.reset();
        player.reset();
      }, 300);
    }
  },
};

// method to get the score
const Score = function(){
  this.sucess = 0;
  this.attempts = 10;
  this.missed = 0;
  this.final = 0;
};

Score.prototype = {
  updateMiss: function() {
    this.missed++;
    document.getElementById('score--missed').innerHTML = this.missed;
  },
  difference: function() {
    this.sucess--;
    document.getElementById('score--final').innerHTML = this.final;
  },
  updateAttempts: function() {
    this.attempts--;
    document.getElementById('score--attempts').innerHTML = this.attempts;
  },
  finalScore: function() {
    this.final++;
    document.getElementById('score--final').innerHTML = this.final;
  },
  message: function(){
    alert(`Yeah! You finished the game! You had 10 attempts and ${this.missed} Bugs catched you. So In whole you reached the Water ${this.final} times.`);
  },
  // resets score text after player reached x times water
  reset: function(){
    this.missed = 0;
    this.final = 0;
    this.attempts = 10;
    this.sucess = 0;
    document.getElementById('score--missed').innerHTML = this.missed;
    document.getElementById('score--final').innerHTML = this.final;
    document.getElementById('score--attempts').innerHTML = this.attempts;
    document.getElementById('score--final').innerHTML = this.final;
  },
  // function to show instructor notes
  show: function(){
    let notes = document.getElementById('notes');
    notes.classList.toggle('show');
  },
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies and set the Location
let allEnemies = [];
let enemyLoc = [58, 144, 226];
// Ittarate through each enemy located on the y axis
// starting from 0 on the x axis with a move speed of 200
enemyLoc.forEach(function (locationY) {
  const enemy = new Enemy(0, locationY, 200);
  allEnemies.push(enemy);
});
// Place the player object in a variable called player
const player = new Player(202,405);
// to get the score
const score = new Score();

/* Event Listeners
 */
// This listens for clicks on the instructor notes to show the instructor notes
let iNotes = document.getElementById('instruction');
iNotes.addEventListener('click', function() {
  score.show();
});
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
