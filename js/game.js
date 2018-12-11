'use strict'

class Game {
  constructor () {
    this.lifes = 0;
    this.points = 0;
    this.emojes = ['🐭', '🐼'];
    // this.emojes = ['🐭', '🐼', '🐻', '🦊', '🐱', '🐮', '🦁', '🐽', '🐨', '🐰', '🐯'];
    this.holes = document.querySelectorAll('.zones__emoji');
    this.lastHole;
    this.speed = 2100;
  }
  setAllLifes() {
    let lifesElements = document.querySelectorAll('.bar__health-item');
    lifesElements.forEach((life) => life.classList.add('bar__health-item--on'));
    this.lifes = lifesElements.length;
  }
  setRemoveLife() {
    let availableLifes = document.querySelectorAll('.bar__health-item--on');
    this.lifes = availableLifes.length;
    availableLifes[availableLifes.length - 1].classList.remove('bar__health-item--on');
    this.lifes = this.lifes - 1;
  }
  getRandomHole() {
    const indexHole = Math.floor (Math.random() * this.holes.length);
    const hole = this.holes[indexHole];
    if (hole === this.lastHole) {
      return this.getRandomHole();
    }
    this.lastHole = hole;
    return hole;
  }
  getRandomEmoje() {
    const indexEmoje = Math.floor (Math.random() * this.emojes.length);
    const emoje = this.emojes[indexEmoje];
    return emoje;
  }
  setStartPoints() {
    this.points = 0
    this.pointsElement = document.querySelector('.bar__points-text');
    this.pointsElement.innerHTML = this.points;
  }
  setPlusPoints(num) { 
    this.points = this.points + num;
    this.pointsElement = document.querySelector('.bar__points-text');
    this.pointsElement.innerHTML = this.points;
  }
  setMoreSpeed(num) {
    this.speed = this.speed - num;
  }
  appearingOfEmoje() {
    let holeCurrent = this.getRandomHole();
    holeCurrent.addEventListener('click', this.emojeClickHandler);
    holeCurrent.innerHTML = this.getRandomEmoje();
    holeCurrent.classList.add('animation');
    setTimeout(()=> {
      holeCurrent.classList.remove('animation');
      holeCurrent.removeEventListener('click', this.emojeClickHandler, false);
    }, this.speed);
  }
  emojeClickHandler(evt) {
    console.log('click')
    if (evt.target.innerHTML === '🐭') {
      game.setPlusPoints.call(game, 10); // сколько добавлять очков, можно поменять
      if (game.points % 10 === 0) {
      game.setMoreSpeed.call(game, 300); // на сколько убавлять скорость
      console.log(game.speed);
      }
    } else {
      game.setRemoveLife.call(game);
    }
  }
  startGame() {
    this.setAllLifes();
    this.setStartPoints();
    setInterval(() => this.appearingOfEmoje(), this.speed);
  }
}

// стартуем!
let game = new Game;
game.startGame();
