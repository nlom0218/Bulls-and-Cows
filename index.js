const $startBtn = document.querySelector("#js-startBtn");
const $answerLoaf = document.querySelector("#js-answerLoaf");
const $formAnswer = document.querySelector("#js-formAnswer");
const $inputAnswer = document.querySelector("#js-inputAnswer");
const $result = document.querySelector("#js-result");
const $countDown = document.querySelector("#js-countDown");
const $finishGame = document.querySelector("#js-finishGame");
const $finishText = document.querySelector("#js-finishText");
const $resetBtn = document.querySelector("#js-resetBtn");
const $backBtn = document.querySelector("#js-backBtn");

let seletedNum;
let inputNum;
let countNum = 0;

hiding = () => {
  $answerLoaf.classList.add("hiding");
  $result.classList.add("hiding");
  $countDown.classList.add("hiding");
};

makingNum = () => {
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  seletedNum = [];
  for (let i = 0; i < 4; i += 1) {
    seletedNum.push(num.splice(Math.ceil(Math.random() * (8 - i)), 1)[0]);
  }
  seletedNum = Number(seletedNum.join(""));
  console.log(seletedNum);
};

handleClickStartBtn = () => {
  $startBtn.classList.add("hiding");
  $answerLoaf.classList.remove("hiding");
  $inputAnswer.focus();
  makingNum();
};

winGame = () => {
  hiding();
  $finishGame.classList.remove("hiding");
  $finishText.innerText = `축하합니다! 홈런입니다!`;
};

loseGame = () => {
  hiding();
  $finishGame.classList.remove("hiding");
  $finishText.innerText = `정답은 ${seletedNum}이었습니다`;
};

playingGame = () => {
  const seletedNumArr = String(seletedNum).split("");
  const inputNumArr = String(inputNum).split("");
  let strike = 0;
  let ball = 0;
  $result.classList.remove("hiding");
  $countDown.classList.remove("hiding");
  if (seletedNum === inputNum) {
    winGame();
  }
  for (let i = 0; i < 4; i += 1) {
    if (seletedNumArr[i] === inputNumArr[i]) {
      strike += 1;
    } else if (seletedNumArr.includes(inputNumArr[i])) {
      ball += 1;
    }
  }
  $result.innerText = `${strike}스트라이크! ${ball}볼!`;
  $countDown.innerText = `남은 횟수: ${10 - countNum}`;
  if (countNum === 10) {
    loseGame();
  }
};

handleSubmitFormAnswer = (e) => {
  e.preventDefault();
  inputNum = Number($inputAnswer.value);
  $inputAnswer.value = "";
  countNum += 1;
  playingGame();
};

handleClickResetBtn = () => {
  makingNum();
  countNum = 0;
  $answerLoaf.classList.remove("hiding");
  $finishGame.classList.add("hiding");
};

handleClickBackBtn = () => {
  countNum = 0;
  $finishGame.classList.add("hiding");
  $startBtn.classList.remove("hiding");
};

function init() {
  $startBtn.addEventListener("click", handleClickStartBtn);
  $formAnswer.addEventListener("submit", handleSubmitFormAnswer);
  $resetBtn.addEventListener("click", handleClickResetBtn);
  $backBtn.addEventListener("click", handleClickBackBtn);
}

init();
