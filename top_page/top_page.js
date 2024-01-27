let language = 'php';
//　ボリュームアイコンとボリュームの制御
//---------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  let audioIcon = document.getElementById('audioIcon');
  let topBGM = document.getElementById('topBGM');

  document.getElementById('playLink').href =
    '../game/game.html?language=' + language;

  audioIcon.addEventListener('click', () => {
    if (topBGM.paused) {
      // 再生
      topBGM.play();
      audioIcon.classList.remove('fa-volume-xmark');
      audioIcon.classList.add('fa-volume-high');
    } else {
      // 停止
      topBGM.pause();
      topBGM.currentTime = 0; // 再生位置を初期化
      audioIcon.classList.remove('fa-volume-high');
      audioIcon.classList.add('fa-volume-xmark');
    }
  });
});

// 各種ボタンのSE制御と、「難易度」設定画面と「言語」設定画面のアニメーション
// -------------------------------------------------------------------------------
// 連続してボタンをクリックしてもSEが再生されるようにする関数
const resetAndPlay = (audioElement) => {
  audioElement.pause();
  audioElement.currentTime = 0;
  audioElement.play();
};

// プレイボタンのSE制御
let playButton = document.getElementById('playButton');
playButton.addEventListener('click', () => {
  const mediaElement = document.getElementById('topBGM'); // myAudioの部分は、適宜変更してください
  const isMuted = mediaElement.muted;
  document.getElementById('playLink').href =
    '../game/game.html?muted=' + isMuted + '&language=' + language;
  let startButtonSE1 = document.getElementById('startButtonSE1');
  let startButtonSE2 = document.getElementById('startButtonSE2');

  resetAndPlay(startButtonSE1);
  // SEを連続して使う場合に使用
  startButtonSE1.addEventListener('ended', () => {
    resetAndPlay(startButtonSE2);
  });
});

// 設定ボタンのSE制御
let modalSettingButton = document.getElementById('modalSettingButton');
modalSettingButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});

// 閉じるボタンのSE制御（設定画面）
let closeButton = document.getElementById('closeButton');
closeButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});

// 「難易度」ボタンのSE制御、難易度選択画面でnormalをデフォルトに設定
let levelButton = document.getElementById('levelButton');
let easyButton = document.getElementById('easyButton');
let normalButton = document.getElementById('normalButton');
let hardButton = document.getElementById('hardButton');

levelButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);

  if (
    !(
      easyButton.classList.contains('easySelect') ||
      hardButton.classList.contains('hardSelect')
    )
  ) {
    normalButton.classList.add('normalSelect');
  }
});

// 「プログラミング言語」ボタンのSE制御、言語選択画面でphpをデフォルトに設定
let languageButton = document.getElementById('languageButton');
let javascriptButton = document.getElementById('javascriptButton');
let phpButton = document.getElementById('phpButton');
let rubyButton = document.getElementById('rubyButton');

languageButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);

  if (
    !(
      javascriptButton.classList.contains('javascriptSelect') ||
      rubyButton.classList.contains('rubySelect')
    )
  ) {
    phpButton.classList.add('phpSelect');
  }
});

// 閉じるボタンのSE制御（難易度選択画面）
let closeButtonLevel = document.getElementById('closeButtonLevel');
closeButtonLevel.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});

// 「かんたん」ボタンのSE制御と、ボタンをクリックした際のアニメーション
easyButton.addEventListener('click', function () {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);

  if (this.classList.contains('easySelect')) {
    this.classList.remove('easySelect');
  } else {
    this.classList.add('easySelect');
    normalButton.classList.remove('normalSelect');
    hardButton.classList.remove('hardSelect');
  }
});

// 「かんたん」ボタンにホバーした際のアニメーション
easyButton.addEventListener('mouseenter', () => {
  if (normalButton.classList.contains('normalSelect')) {
    normalButton.classList.remove('normalSelect');
  } else if (hardButton.classList.contains('hardSelect')) {
    hardButton.classList.remove('hardSelect');
  }
});

// 「ふつう」ボタンのSE制御と、ボタンをクリックした際のアニメーション
normalButton.addEventListener('click', function () {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);

  if (this.classList.contains('normalSelect')) {
    this.classList.remove('normalSelect');
  } else {
    this.classList.add('normalSelect');
    easyButton.classList.remove('easySelect');
    hardButton.classList.remove('hardSelect');
  }
});

// 「ふつう」ボタンにホバーした際のアニメーション
normalButton.addEventListener('mouseenter', () => {
  if (easyButton.classList.contains('easySelect')) {
    easyButton.classList.remove('easySelect');
  } else if (hardButton.classList.contains('hardSelect')) {
    hardButton.classList.remove('hardSelect');
  }
});

// 「むずかしい」ボタンのSE制御と、ボタンをクリックした際のアニメーション
hardButton.addEventListener('click', function () {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);

  if (this.classList.contains('hardSelect')) {
    this.classList.remove('hardSelect');
  } else {
    this.classList.add('hardSelect');
    easyButton.classList.remove('easySelect');
    normalButton.classList.remove('normalSelect');
  }
});

// 「むずかしい」ボタンにホバーした際のアニメーション
hardButton.addEventListener('mouseenter', () => {
  if (easyButton.classList.contains('easySelect')) {
    easyButton.classList.remove('easySelect');
  } else if (normalButton.classList.contains('normalSelect')) {
    normalButton.classList.remove('normalSelect');
  }
});

// 「決定」ボタンのSE制御（難易度選択画面）
let levelDecisionButton = document.getElementById('levelDecisionButton');
levelDecisionButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});

// 閉じるボタンのSE制御（言語選択画面）
let closeButtonLanguage = document.getElementById('closeButtonLanguage');
closeButtonLanguage.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});

// 「JavaScript」のSE制御と、ボタンをクリックした際のアニメーション
javascriptButton.addEventListener('click', function () {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  language = 'php';
  resetAndPlay(commonButtonsSE);

  if (this.classList.contains('javascriptSelect')) {
    this.classList.remove('javascriptSelect');
  } else {
    this.classList.add('javascriptSelect');
    phpButton.classList.remove('phpSelect');
    rubyButton.classList.remove('rubySelect');
  }
});

// 「JavaScript」ボタンにホバーした際のアニメーション
javascriptButton.addEventListener('mouseenter', () => {
  if (phpButton.classList.contains('phpSelect')) {
    phpButton.classList.remove('phpSelect');
  } else if (rubyButton.classList.contains('rubySelect')) {
    rubyButton.classList.remove('rubySelect');
  }
});

// 「PHP」のSE制御と、ボタンをクリックした際のアニメーション
phpButton.addEventListener('click', function () {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  language = 'php';
  resetAndPlay(commonButtonsSE);

  if (this.classList.contains('phpSelect')) {
    this.classList.remove('phpSelect');
  } else {
    this.classList.add('phpSelect');
    javascriptButton.classList.remove('javascriptSelect');
    rubyButton.classList.remove('rubySelect');
  }
});

// 「PHP」ボタンにホバーした際のアニメーション
phpButton.addEventListener('mouseenter', () => {
  if (javascriptButton.classList.contains('javascriptSelect')) {
    javascriptButton.classList.remove('javascriptSelect');
  } else if (rubyButton.classList.contains('rubySelect')) {
    rubyButton.classList.remove('rubySelect');
  }
});

// 「Ruby」のSE制御と、ボタンをクリックした際のアニメーション
rubyButton.addEventListener('click', function () {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  language = 'ruby';
  resetAndPlay(commonButtonsSE);

  if (this.classList.contains('rubySelect')) {
    this.classList.remove('rubySelect');
  } else {
    this.classList.add('rubySelect');
    javascriptButton.classList.remove('javascriptSelect');
    phpButton.classList.remove('phpSelect');
  }
});

// 「Ruby」ボタンにホバーした際のアニメーション
rubyButton.addEventListener('mouseenter', () => {
  if (javascriptButton.classList.contains('javascriptSelect')) {
    javascriptButton.classList.remove('javascriptSelect');
  } else if (phpButton.classList.contains('phpSelect')) {
    phpButton.classList.remove('phpSelect');
  }
});

// 「決定」ボタンのSE制御（言語選択画面）
let languageDecisionButton = document.getElementById('languageDecisionButton');
languageDecisionButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});

//　設定ボタンを押した後のモーダルウィンドウの制御
// ------------------------------------------------------------------------------------------------
let openButton = document.getElementById('modalSettingButton');
let modalTop = document.getElementById('modalPageTop');
let modalLevel = document.getElementById('modalPageLevel');
let modalLanguage = document.getElementById('modalPageLanguage');

// 設定画面を開く
const openModal = () => {
  modalTop.style.display = 'block';
};

// 設定画面を閉じる
const closeModal = () => {
  modalTop.style.display = 'none';
};

// 難易度設定画面を開く
const openModalLevel = () => {
  modalLevel.style.display = 'block';
};

// 難易度設定画面を閉じる
const closeModalLevel = () => {
  modalLevel.style.display = 'none';
};

// 言語設定画面を開く
const openModalLanguage = () => {
  modalLanguage.style.display = 'block';
};

// 言語設定画面を閉じる
const closeModalLanguage = () => {
  modalLanguage.style.display = 'none';
};

openButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
levelButton.addEventListener('click', () => {
  closeModal();
  openModalLevel();
  closeButtonLevel.addEventListener('click', () => {
    closeModalLevel();
    openModal();
  });
});

languageButton.addEventListener('click', () => {
  closeModal();
  openModalLanguage();
  closeButtonLanguage.addEventListener('click', () => {
    closeModalLanguage();
    openModal();
  });
});

levelDecisionButton.addEventListener('click', () => {
  closeModalLevel();
  openModal();
});

languageDecisionButton.addEventListener('click', () => {
  closeModalLanguage();
  openModal();
});
