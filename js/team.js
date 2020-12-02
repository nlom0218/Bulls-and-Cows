const $teamGameBtn = document.querySelector("#js-teamGameBtn");
const $teamNumber = document.querySelector("#js-teamNumber");
const $formTeamNum = document.querySelector("#js-formTeamNum");
const $inputTeamNum = document.querySelector("#js-inputTeamNum");
const $teamName = document.querySelector("#js-teamName");
const $teamIntro = document.querySelector("#js-teamIntroduce");
const $timeSetting = document.querySelector("#js-timeSetting");
const $formTimeSetting = document.querySelector("#js-formTimeSetting");
const $inputTimeSetting = document.querySelector("#js-inputTimeSetting");
const $teamAnswerLoaf = document.querySelector("#js-teamAnswerLoaf");
const $limitTime = document.querySelector("#js-limitTime");
const $teamOrder = document.querySelector("#js-teamOrder");
const $teamFormAnswer = document.querySelector("#js-teamFormAnswer");
const $teamInputanswer = document.querySelector("#js-teamInputAnswer");
const $teamResultLoaf = document.querySelector("#js-teamResultLoaf");
const $teamPastResult = document.querySelector("#js-teamPastResult");
const $teamFinishGame = document.querySelector("#js-teamFinishGame");
const $teamFinishText = document.querySelector("#js-teamFinishText");
const $teamResultTable = document.querySelector("#js-teamResultTable");
const $teamWinner = document.querySelector("#js-teamWinner");
const $teamResetBtn = document.querySelector("#js-teamResetBtn");
const $teamBackBtn = document.querySelector("#js-teamBackBtn");

let teamNum;
let teamName = [];
let limitTime;
let countDownNum;
let paintNum = 0;
let countTime;

// form에서 enter로 이벤트 발생 막기
$teamNumber.onkeypress = function (e) {
  let key = e.charCode || e.keyCode || 0;
  if (key == 13) {
    e.preventDefault();
  }
};
$teamName.onkeypress = function (e) {
  let key = e.charCode || e.keyCode || 0;
  if (key == 13) {
    e.preventDefault();
  }
};
$formTimeSetting.onkeypress = function (e) {
  let key = e.charCode || e.keyCode || 0;
  if (key == 13) {
    e.preventDefault();
  }
};
//
removeBody = () => {
  $startBtn.classList.add("hiding");
  $difficultySetting.classList.add("hiding");
  $teamGameBtn.classList.add("hiding");
  $ruleDiscription.classList.add("hiding");
};

teamWinGame = () => {
  $teamAnswerLoaf.classList.add("hiding");
  $teamResultLoaf.classList.add("hiding");
  $teamFinishGame.classList.remove("hiding");
  $teamWinner.innerText = `승리 팀은 ${teamName[paintNum].name}팀입니다!`;
  $teamFinishText.innerText = `🎉 축하합니다! 홈런입니다! 🎉`;
  let i = 0;
  pastResultArr.forEach((item) => {
    const div = document.createElement("div");
    div.innerText = `${i + 1}회: ${item.num} → ${item.result}`;
    $teamResultTable.appendChild(div);
    i += 1;
  });
};

printTeamOrder = () => {
  countDown();
  if (paintNum === teamNum - 1) {
    paintNum = 0;
    $teamOrder.innerText = `${teamName[paintNum].name}팀의 차례`;
  } else {
    paintNum += 1;
    $teamOrder.innerText = `${teamName[paintNum].name}팀의 차례`;
  }
};

teamPaintResult = (strike, ball) => {
  const pastResultObj = {
    num: inputNum,
    result: `${strike}스트라이크! ${ball}볼!`,
  };
  pastResultArr.push(pastResultObj);
  $teamPastResult.innerText = "";
  for (let i = 0; i < pastResultArr.length; i += 1) {
    const div = document.createElement("div");
    div.innerText = `${i + 1}회: ${pastResultArr[i].num} → ${
      pastResultArr[i].result
    }`;
    $teamPastResult.appendChild(div);
  }
};

teamPlayingGame = () => {
  $teamResultLoaf.classList.remove("hiding");
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
  teamPaintResult(strike, ball);
  if (seletedNum === inputNum) teamWinGame();
};

teamOverlapError = () => {
  inputNumArr = String(inputNum).split("");
  const overlapRemoveArr = inputNumArr.reduce((acc, cur, i, arr) => {
    if (arr.indexOf(cur) === i) acc.push(cur);
    return acc;
  }, []);
  if (inputNumArr.includes("0") || inputNumArr.length !== 4) {
    alert("0은 입력할 수 없습니다");
  } else if (overlapRemoveArr.length === 4) {
    teamPlayingGame();
    clearInterval(countTime);
    printTeamOrder();
  } else {
    alert("숫자가 중복되었으니 확인해주세요");
  }
};

handleSubmitTeamFormAnswer = (e) => {
  e.preventDefault();
  inputNum = Number($teamInputanswer.value);
  $teamInputanswer.value = "";
  teamOverlapError();
};

countDown = () => {
  countDownNum = limitTime;
  countTime = setInterval(() => {
    $limitTime.innerText = `남은시간: ${countDownNum}초`;
    if (countDownNum-- === -1) {
      clearInterval(countTime);
      $limitTime.innerText = `시간이 초과되었습니다. 숫자를 입력해주세요.`;
    }
  }, 1000);
};

startTeamGame = () => {
  makingNum();
  $teamAnswerLoaf.classList.remove("hiding");
  countDown();
  $limitTime.innerText = `남은시간: ${limitTime}초`;
  $teamOrder.innerText = `${teamName[0].name}팀의 차례`;
  $teamInputanswer.focus();
};

handleSubmitFormTimeSettingBtn = (e) => {
  e.preventDefault();
  $timeSetting.classList.add("hiding");
  limitTime = Number($inputTimeSetting.value);
  if (limitTime >= 10 && limitTime <= 100) {
    startTeamGame();
  } else {
    alert("입력창에 10~100사이의 수를 입력하세요");
    $timeSetting.classList.remove("hiding");
  }
};

handleClickTimeSettingBtn = () => {
  $teamIntro.classList.add("hiding");
  $timeSetting.classList.remove("hiding");
  $inputTimeSetting.focus();
};

printTeamName = () => {
  $teamName.classList.add("hiding");
  $teamIntro.classList.remove("hiding");
  const div = document.createElement("div");
  div.classList.add("confirm-team-name");
  div.innerText = "팀이 생성되었습니다. 팀이름을 확인하세요.";
  $teamIntro.appendChild(div);
  for (let i = 0; i < teamNum; i += 1) {
    const intro = document.createElement("div");
    intro.classList.add("each-team-name");
    intro.innerText = `팀${i + 1}: ${teamName[i].name}`;
    $teamIntro.appendChild(intro);
  }
  const timeSettingBtn = document.createElement("button");
  timeSettingBtn.innerText = "시간설정하기";
  timeSettingBtn.addEventListener("click", handleClickTimeSettingBtn);
  $teamIntro.appendChild(timeSettingBtn);
};

handleClickFormTeamName = (e) => {
  e.preventDefault();
  for (let i = 0; i < teamNum; i += 1) {
    const name = document.querySelector(`.team${i + 1}`).value;
    const teamNameObj = {
      name,
      num: i + 1,
    };
    teamName.push(teamNameObj);
  }
  printTeamName();
};

makeTeamNameHTML = () => {
  const teamNameComment = document.createElement("div");
  teamNameComment.innerText = `생성된 팀 수: ${teamNum}`;
  //
  const teamNameForm = document.createElement("form");
  teamNameForm.addEventListener("submit", handleClickFormTeamName);
  //
  for (let i = 0; i < teamNum; i += 1) {
    const teamNameInput = document.createElement("input");
    teamNameInput.type = "text";
    teamNameInput.placeholder = `팀${i + 1}의 이름을 적으세요`;
    teamNameInput.classList.add(`team${i + 1}`);
    teamNameForm.appendChild(teamNameInput);
  }
  //
  const teamNameSubmit = document.createElement("input");
  teamNameSubmit.type = "submit";
  teamNameSubmit.value = "다음";
  //
  teamNameForm.appendChild(teamNameSubmit);
  $teamName.appendChild(teamNameComment);
  $teamName.appendChild(teamNameForm);
};

makeTeamName = () => {
  $teamName.classList.remove("hiding");
  makeTeamNameHTML();
};

handleSubmitFormTeamNumber = (e) => {
  e.preventDefault();
  if ($inputTeamNum.value <= 5 && $inputTeamNum.value >= 2) {
    teamNum = Number($inputTeamNum.value);
    $teamNumber.classList.add("hiding");
    makeTeamName();
  } else {
    alert("입력창에 2~5사이의 수를 입력하세요");
    $inputTeamNum.value = "";
    $inputTeamNum.focus();
  }
};

handleClickTeamGameBtn = () => {
  removeBody();
  $teamNumber.classList.remove("hiding");
  $inputTeamNum.focus();
};

handleClickTeamResetBtn = () => {
  makingNum();
  pastResultArr = [];
  $teamResultTable.innerText = "";
  $teamFinishGame.classList.add("hiding");
  $teamAnswerLoaf.classList.remove("hiding");
  $teamInputanswer.focus();
  clearInterval(countTime);
  $limitTime.innerText = `남은시간: ${limitTime}초`;
  countDown();
};

handleClickTeamBackBtn = () => {
  pastResultArr = [];
  $teamResultTable.innerText = "";
  $teamFinishGame.classList.add("hiding");
  $startBtn.classList.remove("hiding");
  $difficultySetting.classList.remove("hiding");
  $ruleDiscription.classList.remove("hiding");
  $teamGameBtn.classList.remove("hiding");
  // 팀게임 설정 초기화하기
  $inputTeamNum.value = "";
  $teamName.innerHTML = "";
  $teamIntro.innerHTML = "";
  $inputTimeSetting.value = "";
  teamNum = "";
  teamName = [];
  limitTime = "";
  countDownNum = "";
  paintNum = 0;
  countTime;
};

function init() {
  $teamGameBtn.addEventListener("click", handleClickTeamGameBtn);
  $formTeamNum.addEventListener("submit", handleSubmitFormTeamNumber);
  $formTimeSetting.addEventListener("submit", handleSubmitFormTimeSettingBtn);
  $teamFormAnswer.addEventListener("submit", handleSubmitTeamFormAnswer);
  $teamResetBtn.addEventListener("click", handleClickTeamResetBtn);
  $teamBackBtn.addEventListener("click", handleClickTeamBackBtn);
}

init();
