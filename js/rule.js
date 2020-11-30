const gameRule = [
  {
    title: "🕵️‍♂️ 네자리의 숫자를 맞춰라",
    content: "1~9까지의 숫자를 제한 횟수안으로 맞추는 간단한 게임",
    example:
      "시작하기 버튼을 누르면 컴퓨터가 4개의 숫자를 만들어요. 물론 비밀!",
  },
  {
    title: "🧛‍♀️ 중복된 숫자는 없다!",
    content: "컴퓨터가 만든 4개의 숫자는 모두 다른 숫자",
    example: "예를들어 1123, 1575, 9329처럼 중복된 숫자는 없다.",
  },
  {
    title: "🤷‍♀️ 스트라이크란?",
    content: "컴퓨터가 만든 숫자와 우리가 적은 숫자의 자리가 똑같다!",
    example: "컴퓨터가 만든 숫자: 1234, 우리가 적은 숫자: 1268 → 2스트라이크",
  },
  {
    title: "🧙‍♂️ 볼이란?",
    content: "컴퓨터가 만든 숫자를 적었는데 자리는 다르다!",
    example: "컴퓨터가 만든 숫자: 3491, 우리가 적은 숫자: 9835 → 2볼",
  },
  {
    title: "🤶 몇가지 예시를 볼까요?",
    content: "컴퓨터가 만든 숫자는 2965입니다.",
    example: "우리가 적은 숫자가 5923이면 1스트라이크(9), 2볼(5, 2)입니다.",
  },
  {
    title: "👶 예시 하나 더!",
    content: "컴퓨터가 만든 숫자는 9374입니다.",
    example: "우리가 적은 숫자는 1239이면 2볼(3, 9)입니다.",
  },
  {
    title: "🙋‍♀️ 이번엔 여러분들이 맞춰볼까요?",
    content: "컴퓨터가 만든 숫자는 7263입니다.",
    example: "우리가 적은 숫자가 7681이면 결과는 무엇일까요?",
  },
  {
    title: "👧 바로바로바로~",
    content: "1스트라이크(7) 1볼입니다(6)!",
    example: "7은 자리까지 똑같죠? 그리고 6은 있지만 자리는 다르기 때문이죠!",
  },
  {
    title: "🤦‍♂️ 게임에서 승리하려면?",
    content: "컴퓨터가 만든 숫자를 자리까지 모두 맞추면 홈런!",
    example: "4스트라이크(자리까지 모두 맞춘 상태)이면 승리입니다!",
  },
  {
    title: "👩‍💻 이제 숫자야구 할 준비가 되었나요?",
    content: "먼저, 자신이 원하는 제한 횟수를 정하세요!",
    example: "그리고 포기하지 말고 끝까지 도전해보세요!",
  },
];

const $ruleTitle = document.querySelector("#js-ruleTitle");
const $ruleContents = document.querySelector("#js-ruleContents");
const $ruleExample = document.querySelector("#js-ruleExample");
const $ruleBtn = document.querySelector("#js-ruleBtn");

let page = 0;

paintRule = () => {
  $ruleTitle.innerText = gameRule[page].title;
  $ruleContents.innerText = gameRule[page].content;
  $ruleExample.innerText = gameRule[page].example;
};

clickLeftBtn = () => {
  if (page === 0) {
    alert("첫번째 페이지 입니다.");
  } else {
    page -= 1;
    paintRule();
  }
};

clickRightBtn = () => {
  page += 1;
  if (page === gameRule.length) {
    alert("마지막 페이지 입니다");
    page = gameRule.length - 1;
  } else {
    paintRule();
  }
};

handleClickRlueBtn = (e) => {
  const direction = e.target.dataset.btn;
  console.log(direction);
  if (direction === "left") {
    clickLeftBtn();
  } else if (direction === "right") {
    clickRightBtn();
  } else {
    return;
  }
};

function init() {
  paintRule();
  $ruleBtn.addEventListener("click", handleClickRlueBtn);
}

init();
