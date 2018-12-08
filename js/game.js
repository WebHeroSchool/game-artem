'use strict'

var emojes = ['🐭', '🐼', '🐻', '🦊', '🐱', '🐮', '🦁', '🐽', '🐨', '🐰', '🐯'];
var holes = document.querySelectorAll('.zones__emoji');

function getRandomHole() {
  return Math.floor (Math.random() * 5);
}

function getRandomEmoje() {
  return Math.floor (Math.random() * emojes.length);
}

function isMouse(item) {
  return item === '🐭';
}

// с какой частотой показывать эмоджи, сейчас 3 секунды
var period = 3000;

setInterval(function () {
  // при каждом запуске получаем случайную нору и случайное эмоджи
  var hole = holes[getRandomHole()];
  var emoje = emojes[getRandomEmoje()];
  
  // кладем эмоджи в хтмл и вешаем цсс класс для анимации
  hole.innerHTML = emoje;
  hole.classList.add('animation');
  
  // добавляем обработчик по клику для проверки не мышь ли это
  hole.addEventListener('click', emojeClickHandler);

  // после отработки анимации очищаем хтмл элемент и убираем цсс класс
  hole.addEventListener("transitionend", emojeTransitionHandler, false);

}, period);

function emojeClickHandler(evt) {
  console.log("is Mouse: ", isMouse(evt.target.innerHTML))
}

function emojeTransitionHandler() {
  this.innerHTML = "";
  this.classList.remove('animation');
}