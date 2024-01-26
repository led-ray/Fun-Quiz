// 10秒間かけて背景を徐々に拡大させるアニメーション
const bgExpansion = document.getElementById('bgExpansion');

let backgroundScale = 1;
const scaleSpeed = 0.0009;

let animationID;

const animateBGExpansion = () => {
  backgroundScale += scaleSpeed;
  bgExpansion.style.transform = `scale(${backgroundScale})`;

  //animateBackground関数の処理をループさせる
  animationID = requestAnimationFrame(animateBGExpansion);
};

//10秒後にanimateBackground関数を停止する
setTimeout(() => {
  cancelAnimationFrame(animationID);
}, 10000);

animateBGExpansion();
