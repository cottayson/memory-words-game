// ***************************************************
// *                 MOUSE CLICK                     *
// ***************************************************
function touchStarted() {
  if(isMobile()) {
    userAction()
  }
}

function mousePressed() {
  if(isMobile() == false) {
    if (mouseButton == 'right' || mouseButton == 'left') {
      userAction()
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