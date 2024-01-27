//画面遷移
document.querySelector('.btn.next').addEventListener('click', function() {
document.getElementById('scoreCard').style.display = 'none';
document.getElementById('resultTable').style.display = 'block';
});

window.onload = function() {
    // URLからクエリパラメータを取得
    const params = new URLSearchParams(window.location.search);
    const score = params.get('score') * 20; // 実際にはこちらを使う
    const correct = String(params.get('correct')); // 実際にはこちらを使う
    //const score = '100' // 仮の値
    //const correct = '01011' // 仮の値

    // 'score' の各桁に基づいて正誤を設定
    document.getElementById(`score`).textContent = score + '点 !';

    // 'correct' の各桁に基づいて正誤を設定
    if (correct) {
      for (let i = 0; i < 5; i++) {
        const mark = correct[i] === '1' ? '〇' : '×';
        document.getElementById(`checkQ${i + 1}`).textContent = mark;
      }
    }
  };

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