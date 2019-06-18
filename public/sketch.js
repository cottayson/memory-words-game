/* суть игры: ребёнку на экране высвечивается
слово на английском, например из трёх букв PEN и пропадает,
а дальше высвечивается много разных английских букв и ребёнку
нужно будет выбрать только те, которые были в этом слове.
То есть сначала P, потом E и потом N.
*/

/*
[+] выводим слово из словаря
[-] слово исчезает через 3 секунды
[+] создаем кучу букв
[+] кликаем мышкой в нужном порядке
при этом поле с исходным словом заполняется
буквами, на которые мы кликнули
, правильная буква или нет становится понятно когда соберём всё слово
[ ] буквы не должны накладываться друг на друга
[ ] буквы должны быть одинакового размера на разных устройствах, по крайней мере чтобы было удобно кликать
*/

// image drag: https://codepen.io/DonKarlssonSan/pen/wgWyWx

// gulp reload: https://www.youtube.com/watch?v=KURMrW-HsY4&index=7&list=PLRk95HPmOM6PN-G1xyKj9q6ap_dc9Yckm

// https://stackoverflow.com/questions/32399469/livereload-not-working-in-chrome-using-gulp-what-am-i-missing
// ***************************************************
// *                    CONSTS                       *
// ***************************************************
let isMobileDevice = isMobile()

const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXZ'

// PC
let letterWidth = 44
let letterHeight = 66
let textSize = 80

// phone
if(isMobileDevice) {
  letterWidth = 75//44
  letterHeight = 110//66
  textSize = 100 // больше чем на PC
}


const GAME_STATE_START = 0
const GAME_STATE_CLICK_LETTER = 1
const GAME_STATE_SHOW_RESULT = 2
const GAME_STATE_RESTART = 3
const NUMBER_OF_STATES = 4

let gameState = GAME_STATE_START
let [w, h] = [300, 300]
let letters = []
let selectedLetters = ''

let hintColor = [255, 255, 255]
let backgroundColor = [100, 100, 100]

let hintIndex = 0
let hints = [
  'HI!',
  'PEN',
  'MAN',
  'TREE',
  'WIND',
  'HELLO', 
  'WATER',
  'CHILD',
  'COLOR',
  'POTATO',
  'STRING',
  'JAVASCRIPT',
]


let wordAccepted = false

// ***************************************************
// *                    SETUP                        *
// ***************************************************

let label
function setup() {
  label = createP('Игра "Собери слово"')
  createCanvas(w, h)
  windowResized()
  textFont("consolas", textSize)
  textAlign(CENTER, CENTER);
  // поддержка телефонов и планшетов
  noLoop()
  
  //draw()
  
  // scatterLetters()
}

function isAllWordsUsed() {
  // если последнее слово, то рестарт игры
  if(hintIndex == hints.length - 1) {
    return true
  } else {
    return false
  }
}

function userFoundAllLetters() {
  return selectedLetters.length >= hints[hintIndex].length
}

function resetGame() {
  console.log('resetGame')
  label.show()
  hintIndex = 0 // теперь индекс указывает на первое слово в списке слов hints
}

function userAction() {
  if(gameState == GAME_STATE_START) {
    label.hide()
    selectedLetters = []
    scatterLetters()
    gameState = GAME_STATE_CLICK_LETTER
  } else if(gameState == GAME_STATE_CLICK_LETTER) {
    selectLetter(mouseX, mouseY)
    if(userFoundAllLetters()) {
      gameState = GAME_STATE_SHOW_RESULT
    }
  } else if(gameState == GAME_STATE_SHOW_RESULT) {
    if(isAllWordsUsed()) {// если слова кончились
      // спрашиваем игрока: сыграть заново?
      gameState = GAME_STATE_RESTART
    } else { // если ещё есть слова
      // продолжаем игру
      nextHint()
      gameState = GAME_STATE_START
    }
  } else if(gameState == GAME_STATE_RESTART)  {
    resetGame()

    gameState = GAME_STATE_START
  }
  console.log(`hintIndex = ${hintIndex}`)
}

// ***************************************************
// *                    DRAW                         *
// ***************************************************

function draw() {
  background(backgroundColor);
  
  if (gameState == GAME_STATE_START) { //показываем слово
    
    showHint()
    
  } else if(gameState == GAME_STATE_CLICK_LETTER) { //игрок кликает на буквы
    
    for (let letter of letters) {
      letter.show()
    }
    
  } else if(gameState == GAME_STATE_SHOW_RESULT) { // показываем результат
    
    showResult()
    
  } else if(gameState == GAME_STATE_RESTART) { // спрашиваем: перезапустить игру?
    
    showRestartScreen()
    
  }
  
  // if(isPhone()) {
    // text("isPhone", 300, 100)
  // } else 
  // if(isMobile()){
    // text("isTablet", 300, 100)
  // } else {
    // text("isPC", 300, 100)
  // }
  
  console.log("draw")
}

function nextHint() {
  if(hintIndex >= hints.length || hintIndex < 0) {
    throw `Ошибка индекс ${hintIndex} указывает на несуществующее слово`
  }
  hintIndex = hintIndex + 1
}

function showHint() {
  push()
  text('Собери слово:',
    gameWidth() / 2,
    gameHeight() / 2
  )
  fill(hintColor)
  text(hints[hintIndex], 
    gameWidth() / 2,
    gameHeight() / 2 + letterHeight
  )
  pop()
}

function showResult() {
  push()
  if(selectedLetters == hints[hintIndex]) { // слово собрано верно
    fill(255, 255, 255)
    text('Ты верно собрал слово!',gameWidth() / 2, gameHeight() / 2)
    fill(255, 255, 0)
    text(hints[hintIndex],                   gameWidth() / 2,  gameHeight() / 2 + letterHeight)
  } else { // слово собрано неверно
    fill(255, 255, 255)
    text('Ты собрал слово:',     gameWidth() / 2, gameHeight() / 2)
    fill(255, 255, 0)
    text(selectedLetters,        gameWidth() / 2, gameHeight() / 2 + letterHeight)
    fill(255, 255, 255)
    text('нужно было собрать: ', gameWidth() / 2, gameHeight() / 2 + letterHeight*2)
    fill(255, 255, 255)
    text(hints[hintIndex],                   gameWidth() / 2,  gameHeight() / 2 + letterHeight*3)
  }
  pop()
}

function showRestartScreen() {
  text("начать игру заново?", gameWidth() / 2, gameHeight() / 2)
}

function gameWidth() {
  return windowWidth-5
}

function gameHeight() {
  return windowHeight-5
}

function windowResized() {
  resizeCanvas(gameWidth(), gameHeight())
}