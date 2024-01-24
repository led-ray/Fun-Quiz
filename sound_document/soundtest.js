//ミュートボタンを機能させるため、下記のfunctionをコードに追加してください
function toggleMuteAndIcon() {
    var audio = document.getElementById("myAudio");
    var button = document.getElementById("muteButton");
  
    audio.muted = !audio.muted; // ミュート状態を切り替える
  
    if (audio.muted) {
      button.classList.remove("fa-volume-high");
      button.classList.add("fa-volume-off"); // ミュート時にアイコンを変更
    } else {
      button.classList.remove("fa-volume-off");
      button.classList.add("fa-volume-high"); // ミュート解除時にアイコンを元に戻す
    }
  }

//下記は、音声ファイルを再生するボタン（参考）のためのJavascriptです
function playAudio() {
    var audio = document.getElementById("myAudio");
    audio.play();
  }
