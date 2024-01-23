const questions = [
  {
    question: "文字列の長さをバイト数で取得する関数は？",
    answer: "strlen",
    explanation: "A. strlen",
  },
  {
    question: "文字列の長さを文字数で取得する関数は？",
    answer: "mb_strlen",
    explanation: "A. mb_strlen",
  },
  {
    question: `   $str = "123a5";\n$replace = [    ]("a", "4", $str);\necho $replace;\n\n出力結果 12345`,
    answer: "str_replace",
    explanation: "A. str_replace",
  },
  {
    question: ` お疲れ様でした。\n\nこちらが結果発表と解説です!`,
    answer: "",
    explanation: "",
  },
];

const timeLimit = 10;
let timer;
let currentQuestionIndex = 0;
let score = 0;
let resolveButtonClick = null;
const num = 1;

const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer-input");
const resultElement = document.getElementById("answer-container");
const q_num = document.getElementById("q-num");

function showQuestion() {
  startTimer();
  const currentQuestion = questions[currentQuestionIndex];

  // 一時的な要素を作成し内容を設定
  const tempElement = document.createElement("div");
  tempElement.textContent = currentQuestion.question;

  // questionElement をクリア
  questionElement.textContent = "";

  // コピー
  for (const node of tempElement.childNodes) {
    questionElement.appendChild(node.cloneNode(true));
  }

  if (currentQuestionIndex === questions.length - 1) {
    const aTag = document.createElement("a");
    aTag.href = `sample2.html?score=${score}&correct=${5}`;
    aTag.textContent = questionElement.textContent;
    aTag.id = "nextPage";

    questionElement.innerHTML = "";
    questionElement.appendChild(aTag);
    q_num.textContent = "";
    answerInput.style.display = "none";
    clearInterval(timer);
    var BombElement = document.getElementById("bomb");
    BombElement.classList = "none";
  } else {
    questionElement.textContent = currentQuestion.question;
  }

  if (currentQuestionIndex + num !== questions.length) {
    q_num.textContent = `Q ${currentQuestionIndex + num}`;
  } else {
    q_num.textContent = "";
  }

  answerInput.value = ""; // 新しい問題に備えて入力フィールドをクリア
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const currentQuestion = questions[currentQuestionIndex];

  //問題を全て答えた場合
  if (currentQuestionIndex + num === questions.length) {
    showQuestion();

    return;
  }

  //正誤判定
  if (userAnswer === currentQuestion.answer.toLowerCase()) {
    score++;
    showAnswerCorrect();
  } else {
    showAnswerWrong();
  }

  currentQuestionIndex++;

  showQuestion();
}
function showResult() {
  questionElement.textContent = `クイズ終了\nあなたのスコアは ${score} / ${currentQuestionIndex} です！`;
  answerInput.style.display = "none";
  resultElement.textContent = ``;
}

//正解
function showAnswerCorrect() {
  const currentQuestion = questions[currentQuestionIndex];

  // 解説の表示部分を残す
  const explanationElement = document.createElement("div");
  explanationElement.textContent = currentQuestion.explanation;

  // 新しい要素を作成してアニメーションのクラスを追加
  const correctElement = document.createElement("div");
  correctElement.textContent = "○";
  correctElement.classList.add("animate-in");
  correctElement.id = "correctMark";

  // 結果エレメントに追加
  resultElement.innerHTML = "";

  resultElement.style.display = "flex";
  resultElement.style.flexDirection = "column";

  resultElement.appendChild(correctElement);
  resultElement.appendChild(explanationElement);
}

//不正解
async function showAnswerWrong() {
  const currentQuestion = questions[currentQuestionIndex];

  // 解説の表示部分を残す
  const explanationElement = document.createElement("div");
  explanationElement.textContent = currentQuestion.explanation;

  // 新しい要素を作成してアニメーションのクラスを追加
  const correctElement = document.createElement("div");
  correctElement.textContent = "×";
  correctElement.classList.add("animate-in");
  correctElement.id = "wrongMark";

  // 結果エレメントに追加
  resultElement.innerHTML = "";

  resultElement.style.display = "flex";
  resultElement.style.flexDirection = "column";

  resultElement.appendChild(correctElement);
  resultElement.appendChild(explanationElement);
}

//Enterキーを押した際のイベント
answerInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // デフォルトのEnterキー動作を防ぐ
    checkAnswer();
  }
});

function startTimer() {
  clearInterval(timer);

  let timeRemaining = timeLimit;
  var redBombElement = document.getElementById("red_bomb");

  if (redBombElement) {
    returnBomb();
  }
  timer = setInterval(function () {
    document.getElementById(
      "result"
    ).textContent = `残り時間: ${timeRemaining}秒`;

    if (timeRemaining <= 0) {
      clearInterval(timer); // タイマーをクリアして停止
      timeRemaining = timeLimit;
      checkAnswer();
    } else if (timeRemaining === 5) {
      const bomb = document.getElementById("bomb");
      bomb.classList = "fa-solid fa-bomb fa-beat-fade fa-5x";
      bomb.style = "color: #e52315";
      bomb.id = "red_bomb";
    }

    timeRemaining--;
  }, 1000);
}

function returnBomb() {
  const bomb = document.getElementById("red_bomb");
  bomb.classList = "fa-solid fa-bomb fa-beat fa-3x";
  bomb.style = "color: black";
  bomb.id = "bomb";
}

// 最初の問題を表示
showQuestion();
