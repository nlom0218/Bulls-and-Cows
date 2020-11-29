const $startBtn = document.querySelector("#js-startBtn");
const $answerLoaf = document.querySelector("#js-answerLoaf");
const $formAnswer = document.querySelector("#js-formAnswer");
const $inputAnswer = document.querySelector("#js-inputAnswer");
const $resultLoaf = document.querySelector("#js-resultLoaf");
const $pastResult = document.querySelector("#js-pastResult");
const $countDown = document.querySelector("#js-countDown");
const $finishGame = document.querySelector("#js-finishGame");
const $finishText = document.querySelector("#js-finishText");
const $resetBtn = document.querySelector("#js-resetBtn");
const $backBtn = document.querySelector("#js-backBtn");
const $resultTable = document.querySelector("#js-resultTable");
const $difficultySetting = document.querySelector("#js-difficultySetting");
const $controlRange = document.querySelector("#js-controlRange");
const $curDifficulty = document.querySelector("#js-curDifficulty");
const $ruleDiscription = document.querySelector("#js-ruleDiscription");

let seletedNum;
let inputNum;
let countNum = 0;
let pastResultArr = [];
let limitCount = 10;

hiding = () => {
  $answerLoaf.classList.add("hiding");
  $resultLoaf.classList.add("hiding");
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
  $difficultySetting.classList.add("hiding");
  $ruleDiscription.classList.add("hiding");
  $answerLoaf.classList.remove("hiding");
  $inputAnswer.focus();
  makingNum();
};

winGame = () => {
  hiding();
  $finishGame.classList.remove("hiding");
  $finishText.innerText = `🎉 축하합니다! 홈런입니다! 🎉`;
  let i = 0;
  pastResultArr.forEach((item) => {
    const div = document.createElement("div");
    div.innerText = `${i + 1}회: ${item.num} → ${item.result}`;
    $resultTable.appendChild(div);
    i += 1;
  });
};

loseGame = () => {
  hiding();
  $finishGame.classList.remove("hiding");
  $finishText.innerText = `😭 홈런은 다음기회에,, 정답은 ${seletedNum}이었습니다! 😭`;
  let i = 0;
  pastResultArr.forEach((item) => {
    const div = document.createElement("div");
    div.innerText = `${i + 1}회: ${item.num} → ${item.result}`;
    $resultTable.appendChild(div);
    i += 1;
  });
};

paintResult = (strike, ball) => {
  const pastResultObj = {
    num: inputNum,
    result: `${strike}스트라이크! ${ball}볼!`,
  };
  pastResultArr.push(pastResultObj);
  $pastResult.innerText = "";
  for (let i = 0; i < pastResultArr.length; i += 1) {
    const div = document.createElement("div");
    div.innerText = `${i + 1}회: ${pastResultArr[i].num} → ${
      pastResultArr[i].result
    }`;
    $pastResult.appendChild(div);
  }
};

playingGame = () => {
  $resultLoaf.classList.remove("hiding");
  $countDown.classList.remove("hiding");
  const seletedNumArr = String(seletedNum).split("");
  const inputNumArr = String(inputNum).split("");
  let strike = 0;
  let ball = 0;
  for (let i = 0; i < 4; i += 1) {
    if (seletedNumArr[i] === inputNumArr[i]) {
      strike += 1;
    } else if (seletedNumArr.includes(inputNumArr[i])) {
      ball += 1;
    }
  }
  paintResult(strike, ball);
  $countDown.innerText = `남은 횟수: ${limitCount - countNum}`;
  if (seletedNum === inputNum) {
    winGame();
  }
  if (countNum === limitCount) {
    loseGame();
  }
};

overlapError = () => {
  inputNumArr = String(inputNum).split("");
  const overlapRemoveArr = inputNumArr.reduce((acc, cur, i, arr) => {
    if (arr.indexOf(cur) === i) acc.push(cur);
    return acc;
  }, []);
  if (inputNumArr.length !== 4) {
    alert("숫자를 입력해주세요");
  } else if (overlapRemoveArr.length === 4) {
    countNum += 1;
    playingGame();
  } else {
    alert("숫자가 중복되었으니 확인해주세요");
  }
};

handleSubmitFormAnswer = (e) => {
  e.preventDefault();
  inputNum = Number($inputAnswer.value);
  $inputAnswer.value = "";
  overlapError();
};

handleClickResetBtn = () => {
  makingNum();
  countNum = 0;
  pastResultArr = [];
  $resultTable.innerText = "";
  $answerLoaf.classList.remove("hiding");
  $finishGame.classList.add("hiding");
  $inputAnswer.focus();
};

handleClickBackBtn = () => {
  countNum = 0;
  pastResultArr = [];
  $resultTable.innerText = "";
  $finishGame.classList.add("hiding");
  $startBtn.classList.remove("hiding");
  $difficultySetting.classList.remove("hiding");
  $ruleDiscription.classList.remove("hiding");
};

handleMouseupControlRange = () => {
  limitCount = Number($controlRange.value);
  $curDifficulty.innerText = `현재 제한횟수는 ${limitCount}회 입니다`;
};

function init() {
  $startBtn.addEventListener("click", handleClickStartBtn);
  $formAnswer.addEventListener("submit", handleSubmitFormAnswer);
  $resetBtn.addEventListener("click", handleClickResetBtn);
  $backBtn.addEventListener("click", handleClickBackBtn);
  $controlRange.addEventListener("mouseup", handleMouseupControlRange);
}

init();
