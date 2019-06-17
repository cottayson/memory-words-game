/* суть игры: ребёнку на экране высвечивается
слово на английском, например из трёх букв PEN и пропадает,
а дальше высвечивается много разных английских букв и ребёнку
нужно будет выбрать только те, которые были в этом слове.
То есть сначала P, потом E и потом N.
*/

// image drag: https://codepen.io/DonKarlssonSan/pen/wgWyWx

// gulp reload: https://www.youtube.com/watch?v=KURMrW-HsY4&index=7&list=PLRk95HPmOM6PN-G1xyKj9q6ap_dc9Yckm

// https://stackoverflow.com/questions/32399469/livereload-not-working-in-chrome-using-gulp-what-am-i-missing
class Letter {
  constructor() {
    
  }
  
  
}

let [w, h] = [300, 300]

function setup() {
  createCanvas(w, h)
  textFont("consolas", 40)
}

function mousePressed() {
  
}

function mouseRelease() {
  
}

function draw() {
  background(200);
  text('PEN', 100, 100)
}

window.oncontextmenu = function() {
  return false;
}

function keyPressed() {
   // resizeCanvas(windowWidth, windowHeight);
}

function keyReleased() {

}