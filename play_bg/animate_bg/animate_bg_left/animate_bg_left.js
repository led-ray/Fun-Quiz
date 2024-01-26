// 10秒間かけて背景を徐々に左へ移動させるアニメーション
const bgLeft = document.getElementById('bgLeft');
const imgWidth = bgLeft.clientWidth; // 画像の幅を取得

let backgroundPosition = 0;
const positionSpeed = 1;

let animationID;

const animateBGLeft = () => {
  backgroundPosition += positionSpeed;
  bgLeft.style.transform = `translateX(${backgroundPosition}px)`;

  //animateBackground関数の処理をループさせる
  animationID = requestAnimationFrame(animateBGLeft);
};

//10秒後にanimateBackground関数を停止する
setTimeout(() => {
  cancelAnimationFrame(animationID);
}, 10000);

animateBGLeft();
