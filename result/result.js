//画面遷移
document.querySelector('.btn.next').addEventListener('click', function() {
document.getElementById('scoreCard').style.display = 'none';
document.getElementById('resultTable').style.display = 'block';
});

window.onload = function() {
    // URLからクエリパラメータを取得
    const params = new URLSearchParams(window.location.search);
    //const score = params.get('score'); // 実際にはこちらを使う
    //const correct = params.get('correct'); // 実際にはこちらを使う
    const score = '100' // 仮の値
    const correct = '01011' // 仮の値

    // 'score' の各桁に基づいて正誤を設定
    document.getElementById(`score`).textContent = score + '点 !';

    // 'correct' の各桁に基づいて正誤を設定
    if (correct && correct.length === 5) {
      for (let i = 0; i < 5; i++) {
        const mark = correct[i] === '1' ? '〇' : '×';
        document.getElementById(`checkQ${i + 1}`).textContent = mark;
      }
    }
  };