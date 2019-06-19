// ***************************************************
// *                 MOUSE CLICK                     *
// ***************************************************

// isMobile() возвращает true если игрок открывает
// страницу с мобильного устройства(телефон или тачпад)
// и false если игрок открыет страницу с ПК

// касание экрана на touchPad
function touchStarted() {
  if(isMobile() == true) {
    // клик мышкой или касание экрана игроком
    userAction()
    // обновляем картинку игры(canvas)
    draw() 
  }
}

// клик мышкой на ПК
function mousePressed() {
  if(isMobile() == false) {
    if (mouseButton == 'right' || mouseButton == 'left') {
      // клик мышкой или касание экрана игроком
      userAction()
      // обновляем картинку игры(canvas)
      draw() 
    }
  }
}

// убирает всплывающее меню
window.oncontextmenu = function() {
  return false;
}