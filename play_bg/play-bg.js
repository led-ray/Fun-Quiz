const background = document.getElementById('bg');

let backgroundScale = 1;
const scaleSpeed = 0.0009;

let animationID;

const animateBackground = () => {
  backgroundScale += scaleSpeed;
  background.style.transform = `scale(${backgroundScale})`;

  //animateBackground関数の処理をループさせる
  animationID = requestAnimationFrame(animateBackground);
};

//10秒後にanimateBackground関数を停止する
setTimeout(() => {
  cancelAnimationFrame(animationID);
}, 10000);

animateBackground();
