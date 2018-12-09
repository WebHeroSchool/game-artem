'use strict'

const emojes = ['🐭', '🐼', '🐻', '🦊', '🐱', '🐮', '🦁', '🐽', '🐨', '🐰', '🐯'];
const holes = document.querySelectorAll('.zones__emoji');

// in ms (1000 ms = 1 second)
let periodAnimation = 800;

let lastHole;
function getRandomHole(holes) {
  const indexHole = Math.floor (Math.random() * holes.length);
  const hole = holes[indexHole];
  if (hole === lastHole) {
    return getRandomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function getRandomEmoje() {
  const indexEmoje = Math.floor (Math.random() * emojes.length);
  const emoje = emojes[indexEmoje];
  return emoje;
}

function isMouse(item) {
  return item === '🐭';
}

function emojeClickHandler(evt) {
  console.log("is Mouse: ", isMouse(evt.target.innerHTML));
}

function appearingOfEmoje() {
  const time = periodAnimation;
  const hole = getRandomHole(holes);
  hole.addEventListener('click', emojeClickHandler);
  hole.innerHTML = getRandomEmoje();
  hole.classList.add('animation');
  setTimeout(()=> {
    hole.classList.remove('animation')
  }, time);
}

let periodBetweenEmojeAppearing = 1200;
setInterval(appearingOfEmoje, periodBetweenEmojeAppearing);
