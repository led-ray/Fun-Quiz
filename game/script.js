const questions_PHP = [
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
    question: `   $str = "123a5";\n$replace = [          ]("a", "4", $str);\necho $replace;\n\n出力結果 12345`,
    answer: "str_replace",
    explanation: "A. str_replace",
  },
  {
    question: "配列の先頭から要素を一つ取り出す関数は？",
    answer: "array_shift",
    explanation: "A. array_shift",
  },
  {
    question: "変数が数値または数字の文字列かどうかを調べる関数は？",
    answer: "is_numeric",
    explanation: "A. is_numeric",
  },
  {
    question: ` お疲れ様でした。\n\nこちらが結果発表と解説です!`,
    answer: "",
    explanation: "",
  },
];
const questions_RUBY = [
  {
    question: "配列の末尾に要素を追加するメソッドは？",
    answer: "push",
    explanation: "A. push",
  },
  {
    question: "配列の先頭に要素を追加するメソッドは？",
    answer: "unshift",
    explanation: "A. unshift",
  },
  {
    question: `   p [0, 1, 2].[    ](1)\n\n出力結果 1`,
    answer: "slice",
    explanation: "A. slice",
  },
  {
    question: "ハッシュからすべての値を取得するメソッドは？",
    answer: "values",
    explanation: "A. values",
  },
  {
    question:
      "ハッシュからすべてのキーと、そのペアになる値を削除するメソッドは？",
    answer: "clear",
    explanation: "A. clear",
  },
  {
    question: ` お疲れ様でした。\n\nこちらが結果発表と解説です!`,
    answer: "",
    explanation: "",
  },
];
const backGroundImage = [
  "img/plain2.png",
  "img/bridge2.png",
  "img/church3.png",
  "img/cave3.png",
  "img/demon3.png",
  "img/sunset.jpg",
];
var currentUrl = window.location.href;

var urlParams = new URLSearchParams(currentUrl);

var language = urlParams.get("language");

let questions = [];

if (language === "ruby") {
  questions = questions_RUBY;
} else {
  questions = questions_PHP;
}

const timeLimit = 10;
let timer;
let currentQuestionIndex = 0;
let score = 0;
let resolveButtonClick = null;
var correct = ""; //値渡しの正誤判定
const num = 1;

const correctSound = document.getElementById("correctSound");
const incorrectSound = document.getElementById("incorrectSound");
const explosionSound = document.getElementById("explosionSound");
const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer-input");
const resultElement = document.getElementById("answer-container");
const q_num = document.getElementById("q-num");
const background = document.getElementById("image-container");
let imageElement = background.querySelector("#bg");
const fuseImage = document.getElementById("fuse-image");
const fireImage = document.getElementById("firework");
const scaleSpeed = 0.0009;
let backgroundScale = 1;
let animationID;

function showQuestion() {
  if (animationID) {
    cancelAnimationFrame(animationID);
    animationID = null;
  }

  startTimer();
  startAnimation();
  backgroundScale = 1;
  const currentQuestion = questions[currentQuestionIndex];
  backGroundChange(backGroundImage[currentQuestionIndex]);
  animateBackground();
  // 一時的な要素を作成し内容を設定
  const tempElement = document.createElement("div");
  tempElement.textContent = currentQuestion.question;

  // questionElement をクリア
  questionElement.textContent = "";

  // コピー
  for (const node of tempElement.childNodes) {
    questionElement.appendChild(node.cloneNode(true));
  }
  //　全問解答したあと。(question配列の末尾をaタグで表示中)
  if (currentQuestionIndex === questions.length - 1) {
    const aTag = document.createElement("a");
    aTag.href = `sample2.html?score=${score}&correct=${correct}`;
    aTag.textContent = questionElement.textContent;
    aTag.id = "nextPage";
    fuseImage.style.display = "none";
    fireImage.style.display = "none";
    questionElement.innerHTML = "";
    questionElement.appendChild(aTag);
    q_num.textContent = "";
    answerInput.style.display = "none";
    clearInterval(timer);
    var BombElement = document.getElementById("bomb");
    BombElement.classList = "none";
    cancelAnimationFrame(animationID);
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
  document.getElementById("answer-container").style.display = "block";
  //問題を全て答えた場合
  if (currentQuestionIndex + num === questions.length) {
    showQuestion();

    return;
  }

  //正誤判定
  if (userAnswer === currentQuestion.answer.toLowerCase()) {
    score++;
    correct += "0";
    playCorrectSound();
    showAnswerCorrect();
  } else {
    showAnswerWrong();
    playIncorrectSound();
    correct += "1";
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
    if (timeRemaining <= 0) {
      playExplosionSound();
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
  }, 1500);
}

function returnBomb() {
  const bomb = document.getElementById("red_bomb");
  bomb.classList = "fa-solid fa-bomb fa-beat fa-3x";
  bomb.style = "color: black";
  bomb.id = "bomb";
}

function loadImage(src, callback) {
  var img = new Image();
  img.onload = function () {
    callback(img);
  };
  img.src = src;
}

function backGroundChange(src) {
  var imageElement = document.getElementById("bg");

  loadImage(src, function (img) {
    imageElement.src = src;
  });
}

const animateBackground = () => {
  if (currentQuestionIndex === 1) {
    // 10秒間かけて背景を徐々に左へ移動させるアニメーション

    let backgroundPosition = 0;
    const positionSpeed = 0.6;
    const animateLeft = () => {
      backgroundPosition += positionSpeed;
      imageElement = document.getElementById("bg");
      backgroundPosition = Math.max(backgroundPosition, 0);
      imageElement.style.position = "relative";
      imageElement.style.height = "768px";
      imageElement.style.width = "2000px";
      imageElement.style.right = "660px";
      imageElement.style.transform = `translateX(${backgroundPosition}px)`;
      //animateBackground関数の処理をループさせる
      animationID = requestAnimationFrame(animateLeft);
    };
    animateLeft();
  } else {
    imageElement.style.position = "";
    imageElement.style.width = "100%";
    imageElement.style.height = "100%";
    imageElement.style.transformOrigin = "";
    imageElement.style.right = "";

    backgroundScale += scaleSpeed;
    imageElement.style.transform = `scale(${backgroundScale})`;

    //animateBackground関数の処理をループさせる
    animationID = requestAnimationFrame(animateBackground);
  }
};

//　ボリュームアイコンとボリュームの制御
//---------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  let audioIcon = document.getElementById("audioIcon");
  let playBGM = document.getElementById("playBGM");

  audioIcon.addEventListener("click", () => {
    if (playBGM.paused) {
      // 再生
      playBGM.play();
      audioIcon.classList.remove("fa-volume-xmark");
      audioIcon.classList.add("fa-volume-high");
    } else {
      // 停止
      playBGM.pause();
      playBGM.currentTime = 0; // 再生位置を初期化
      audioIcon.classList.remove("fa-volume-high");
      audioIcon.classList.add("fa-volume-xmark");
    }
  });
});

function startAnimation() {
  fuseImage.style.animation = "none";
  fireImage.style.animation = "none";

  setTimeout(function () {
    fuseImage.style.animation = "disappear 17s linear";
    fireImage.style.animation = "moveFire 17s linear";
  }, 100);
}

function playCorrectSound() {
  correctSound.play();
}

function playIncorrectSound() {
  incorrectSound.play();
}

function playExplosionSound() {
  explosionSound.play();
}

document.addEventListener("DOMContentLoaded", () => {
  let audioIcon = document.getElementById("audioIcon");
  let myAudio = document.getElementById("playBGM");

  myAudio.play();

  audioIcon.addEventListener("click", () => {
    if (myAudio.paused) {
      // 再生
      myAudio.play();
      audioIcon.classList.remove("fa-volume-xmark");
      audioIcon.classList.add("fa-volume-high");
    } else {
      // 停止
      myAudio.pause();
      myAudio.currentTime = 0; // 再生位置を初期化
      audioIcon.classList.remove("fa-volume-high");
      audioIcon.classList.add("fa-volume-xmark");
    }
  });
});
