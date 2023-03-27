"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

let currentScore, scores, activePlayer;

//Starting Conditions
const startGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
};

startGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const finishGame = function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");
  btnDisabled();
  document.getElementById(`current--${activePlayer}`).textContent = 0;
};

const btnDisabled = function () {
  btnHold.disabled = true;
  btnRoll.disabled = true;
  btnRoll.classList.add("btn-disabled");
  btnHold.classList.add("btn-disabled");
};
const btnEnabled = function () {
  btnRoll.classList.remove("btn-disabled");
  btnHold.classList.remove("btn-disabled");
  btnHold.disabled = false;
  btnRoll.disabled = false;
};
//Rolling dice functionality
btnRoll.addEventListener("click", function () {
  //1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  //2. Display dice
  diceEl.classList.remove("hidden");
  diceEl.src = "dice-" + dice + ".png";
  //3. Check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //Switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  //1. Add current score to active player's score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  //2. Check if player's score is >=100
  scores[activePlayer] >= 50 ? finishGame() : switchPlayer();
  //Finish the game
  //Switch to the next player
});

btnNew.addEventListener("click", function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
  btnEnabled();
  startGame();
});
