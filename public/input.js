// ***************************************************
// *                 MOUSE CLICK                     *
// ***************************************************
function touchStarted() {
  if(isMobile()) {
    userAction()
    draw() // обновляем картинку игры(canvas)
  }
}

function mousePressed() {
  if(isMobile() == false) {
    if (mouseButton == 'right' || mouseButton == 'left') {
      userAction()
      draw() // обновляем картинку игры(canvas)
    }
  }
}

function mouseReleased() {

}

function keyPressed() {
  
}

function keyReleased() {

}

window.oncontextmenu = function() {
  return false;
}