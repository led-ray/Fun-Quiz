//ミュートボタンを機能させるため、下記のfunctionをコードに追加してください。
function toggleMuteAndIcon() {
  var audios = document.getElementsByTagName("audio"); // すべてのaudio要素を取得
  for (var i = 0; i < audios.length; i++) {
    audios[i].muted = !audios[i].muted; // 各audio要素のミュート状態を切り替え
  }

  // アイコンの切り替え
  var button = document.getElementById("muteButton");
  if (audios[0].muted) {
    // 最初のaudio要素の状態に基づいてアイコンを更新
    button.classList.remove("fa-volume-high");
    button.classList.add("fa-volume-off");
  } else {
    button.classList.remove("fa-volume-off");
    button.classList.add("fa-volume-high");
  }
}

//画面遷移してもミュート状態を引き継げるように、下記をコードに追加してください。
//遷移前のページからmute状態を送る
const mediaElement = document.getElementById("myAudio"); // myAudioの部分は、適宜変更してください
const isMuted = mediaElement.muted; // muteの状態を取得

const nextPageLink = document.getElementById("nextPageLink");
nextPageLink.href = `test2.html?muted=${isMuted}`; // クエリパラメータにミュート状態を追加

//遷移後のページでmute状態を反映
const urlParams = new URLSearchParams(window.location.search);
const muted = urlParams.get("muted") === "true";

//下記は、音声ファイルを再生するボタン（参考）のためのJavascriptです
function playAudio() {
  var audio = document.getElementById("myAudio");
  audio.play();
}
