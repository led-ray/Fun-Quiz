//　ボリュームアイコンとボリュームの制御
//---------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  let audioIcon = document.getElementById('audioIcon');
  let topBGM = document.getElementById('topBGM');

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

// 各種ボタンのSE制御
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

// 「難易度」ボタンのSE制御
let levelButton = document.getElementById('levelButton');
levelButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});

// 「プログラミング言語」ボタンのSE制御
let languageButton = document.getElementById('languageButton');
languageButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});

// 閉じるボタンのSE制御（難易度選択画面）
let closeButtonLevel = document.getElementById('closeButtonLevel');
closeButtonLevel.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});

// 「かんたん」ボタンのSE制御
let easyButton = document.getElementById('easyButton');
easyButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});

// 「ふつう」ボタンのSE制御
let normalButton = document.getElementById('normalButton');
normalButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});
// 「むずかしい」ボタンのSE制御
let hardButton = document.getElementById('hardButton');
hardButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
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

// 「JavaScript」のSE制御
let javascriptButton = document.getElementById('javascriptButton');
javascriptButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});

// 「PHP」のSE制御
let phpButton = document.getElementById('phpButton');
phpButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
});

// 「Ruby」のSE制御
let rubyButton = document.getElementById('rubyButton');
rubyButton.addEventListener('click', () => {
  let commonButtonsSE = document.getElementById('commonButtonsSE');
  resetAndPlay(commonButtonsSE);
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
