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
    this.emojeClickHandler = this.emojeClickHandler.bind(this);
    this.appearingOfEmoje = this.appearingOfEmoje.bind(this);
    this.timerId = setTimeout(this.appearingOfEmoje, this.speed);
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
    holeCurrent.classList.remove('disappearing');
    holeCurrent.innerHTML = this.getRandomEmoje();
    holeCurrent.classList.add('animation');
    holeCurrent.addEventListener('click', this.emojeClickHandler);
    setTimeout(()=> {
      holeCurrent.classList.remove('animation');
      holeCurrent.removeEventListener('click', this.emojeClickHandler, false)
    }, this.speed);
    if (this.lifes > 0) {
      this.timerId = setTimeout(this.appearingOfEmoje, this.speed);
    }
  }
  emojeClickHandler(evt) {
    evt.target.classList.add('disappearing');
    console.log(evt);
    if (evt.target.innerHTML === '🐭') {
      this.setPlusPoints(10);
      // увеличение скорости игры после 5 мыши
      if (this.points % 50 === 0) {
      // на сколько убавлять скорость
      this.setMoreSpeed(200);
      console.log(this.speed);
      }
    } else {
      this.setRemoveLife();
    }
  }
  startGame() {
    this.setAllLifes();
    this.setStartPoints();
  }
}

// стартуем!
let game = new Game;
game.startGame();

// открытие, закрытие правил игры
let modalWindow = document.querySelector('.rules');
let modalOpenButton = document.querySelector('.menu__help');
let modalCloseButton = modalWindow.querySelector('.rules__ok');

modalOpenButton.addEventListener('click', ()=> {
  modalWindow.classList.add('modal__window--show');
})

modalCloseButton.addEventListener('click', ()=> {
  modalWindow.classList.remove('modal__window--show');
})
