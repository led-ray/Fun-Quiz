const questions = [
  {
    question: '文字列の長さをバイト数で取得する関数は？',
    answer: 'strlen',
    explanation: 'A. strlen',
  },
  {
    question: '文字列の長さを文字数で取得する関数は？',
    answer: 'mb_strlen',
    explanation: 'A. mb_strlen',
  },
  {
    question: `   $str = "123a5";\n$replace = [    ]("a", "4", $str);\necho $replace;\n\n出力結果 12345`,
    answer: 'str_replace',
    explanation: 'A. str_replace',
  },
  {
    question: ` お疲れ様でした。\n\nこちらが結果発表と解説です!`,
    answer: '',
    explanation: '',
  },
];

const backGroundImage = [
  'img/plain.jpg',
  'img/church.jpg',
  'img/cave.jpg',
  'img/ocean.jpg',
];

const timeLimit = 10;
let timer;
let currentQuestionIndex = 0;
let score = 0;
let resolveButtonClick = null;
var correct = ''; //値渡しの正誤判定
const num = 1;

const correctSound = document.getElementById('correctSound');
const incorrectSound = document.getElementById('incorrectSound');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const resultElement = document.getElementById('answer-container');
const q_num = document.getElementById('q-num');
const background = document.getElementById('image-container');
const imageElement = background.querySelector('#bg');
const fuseImage = document.getElementById('fuse-image');
const fireImage = document.getElementById('firework');
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
  animateBackground();
  const currentQuestion = questions[currentQuestionIndex];
  backGroundChange(backGroundImage[currentQuestionIndex]);
  // 一時的な要素を作成し内容を設定
  const tempElement = document.createElement('div');
  tempElement.textContent = currentQuestion.question;

  // questionElement をクリア
  questionElement.textContent = '';

  // コピー
  for (const node of tempElement.childNodes) {
    questionElement.appendChild(node.cloneNode(true));
  }
  //　全問解答したあと。(question配列の末尾をaタグで表示中)
  if (currentQuestionIndex === questions.length - 1) {
    const aTag = document.createElement('a');
    aTag.href = `sample2.html?score=${score}&correct=${correct}`;
    aTag.textContent = questionElement.textContent;
    aTag.id = 'nextPage';
    fuseImage.style.display = 'none';
    fireImage.style.display = 'none';
    questionElement.innerHTML = '';
    questionElement.appendChild(aTag);
    q_num.textContent = '';
    answerInput.style.display = 'none';
    clearInterval(timer);
    var BombElement = document.getElementById('bomb');
    BombElement.classList = 'none';
    cancelAnimationFrame(animationID);
  } else {
    questionElement.textContent = currentQuestion.question;
  }

  if (currentQuestionIndex + num !== questions.length) {
    q_num.textContent = `Q ${currentQuestionIndex + num}`;
  } else {
    q_num.textContent = '';
  }

  answerInput.value = ''; // 新しい問題に備えて入力フィールドをクリア
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById('answer-container').style.display = 'block';
  //問題を全て答えた場合
  if (currentQuestionIndex + num === questions.length) {
    showQuestion();

    return;
  }

  //正誤判定
  if (userAnswer === currentQuestion.answer.toLowerCase()) {
    score++;
    correct += '0';
    playCorrectSound();
    showAnswerCorrect();
  } else {
    showAnswerWrong();
    playIncorrectSound();
    correct += '1';
  }

  currentQuestionIndex++;

  showQuestion();
}
function showResult() {
  questionElement.textContent = `クイズ終了\nあなたのスコアは ${score} / ${currentQuestionIndex} です！`;
  answerInput.style.display = 'none';
  resultElement.textContent = ``;
}

//正解
function showAnswerCorrect() {
  const currentQuestion = questions[currentQuestionIndex];

  // 解説の表示部分を残す
  const explanationElement = document.createElement('div');
  explanationElement.textContent = currentQuestion.explanation;

  // 新しい要素を作成してアニメーションのクラスを追加
  const correctElement = document.createElement('div');
  correctElement.textContent = '○';
  correctElement.classList.add('animate-in');
  correctElement.id = 'correctMark';

  // 結果エレメントに追加
  resultElement.innerHTML = '';

  resultElement.style.display = 'flex';
  resultElement.style.flexDirection = 'column';

  resultElement.appendChild(correctElement);
  resultElement.appendChild(explanationElement);
}

//不正解
async function showAnswerWrong() {
  const currentQuestion = questions[currentQuestionIndex];

  // 解説の表示部分を残す
  const explanationElement = document.createElement('div');
  explanationElement.textContent = currentQuestion.explanation;

  // 新しい要素を作成してアニメーションのクラスを追加
  const correctElement = document.createElement('div');
  correctElement.textContent = '×';
  correctElement.classList.add('animate-in');
  correctElement.id = 'wrongMark';

  // 結果エレメントに追加
  resultElement.innerHTML = '';

  resultElement.style.display = 'flex';
  resultElement.style.flexDirection = 'column';

  resultElement.appendChild(correctElement);
  resultElement.appendChild(explanationElement);
}

//Enterキーを押した際のイベント
answerInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // デフォルトのEnterキー動作を防ぐ
    checkAnswer();
  }
});

function startTimer() {
  clearInterval(timer);

  let timeRemaining = timeLimit;
  var redBombElement = document.getElementById('red_bomb');

  if (redBombElement) {
    returnBomb();
  }
  timer = setInterval(function () {
    if (timeRemaining <= 0) {
      clearInterval(timer); // タイマーをクリアして停止
      timeRemaining = timeLimit;
      checkAnswer();
    } else if (timeRemaining === 5) {
      const bomb = document.getElementById('bomb');
      bomb.classList = 'fa-solid fa-bomb fa-beat-fade fa-5x';
      bomb.style = 'color: #e52315';
      bomb.id = 'red_bomb';
    }

    timeRemaining--;
  }, 1000);
}

function returnBomb() {
  const bomb = document.getElementById('red_bomb');
  bomb.classList = 'fa-solid fa-bomb fa-beat fa-3x';
  bomb.style = 'color: black';
  bomb.id = 'bomb';
}

function loadImage(src, callback) {
  var img = new Image();
  img.onload = function () {
    callback(img);
  };
  img.src = src;
}

function backGroundChange(src) {
  var imageElement = document.getElementById('bg');

  loadImage(src, function (img) {
    imageElement.src = src;
  });
}

const animateBackground = () => {
  backgroundScale += scaleSpeed;
  imageElement.style.transform = `scale(${backgroundScale})`;

  //animateBackground関数の処理をループさせる
  animationID = requestAnimationFrame(animateBackground);
};

//　ボリュームアイコンとボリュームの制御
//---------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  let audioIcon = document.getElementById('audioIcon');
  let playBGM = document.getElementById('playBGM');

  audioIcon.addEventListener('click', () => {
    if (playBGM.paused) {
      // 再生
      playBGM.play();
      audioIcon.classList.remove('fa-volume-xmark');
      audioIcon.classList.add('fa-volume-high');
    } else {
      // 停止
      playBGM.pause();
      playBGM.currentTime = 0; // 再生位置を初期化
      audioIcon.classList.remove('fa-volume-high');
      audioIcon.classList.add('fa-volume-xmark');
    }
  });
});

function startAnimation() {
  fuseImage.style.animation = 'none';
  fireImage.style.animation = 'none';

  setTimeout(function () {
    fuseImage.style.animation = 'disappear 11s linear';
    fireImage.style.animation = 'moveFire 11s linear';
  }, 100);
}

function playCorrectSound() {
  correctSound.play();
}

function playIncorrectSound() {
  incorrectSound.play();
}
