/* суть игры: ребёнку на экране высвечивается
слово на английском, например из трёх букв PEN и пропадает,
а дальше высвечивается много разных английских букв и ребёнку
нужно будет выбрать только те, которые были в этом слове.
То есть сначала P, потом E и потом N.
*/

/*
[ ] выводим слово из словаря
[ ] слово исчезает через 3 секунды
[ ] создаем кучу букв
[ ] кликаем мышкой в нужном порядке
при этом поле с исходным словом заполняется
буквами, на которые мы кликнули
, правильная буква или нет становится понятно когда соберём всё слово
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

// phone
if(isMobileDevice) {
  letterWidth = 60//44
  letterHeight = 80//66
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


let textSize = 80//80
let hintColor = [255, 255, 255]
let backgroundColor = [100, 100, 100]



let hints = [
  'PEN',
  'TREE',
  // 'WIND',
  // 'HELLO', 
  // 'WATER',
  // 'CHILD',
  // 'COLOR',
  // 'POTATO',
  // 'STRING',
  // 'JAVASCRIPT',
]
let hintIndex = 0
let hint = "ERROR"

let wordAccepted = false

// ***************************************************
// *                    SETUP                        *
// ***************************************************

let label
function setup() {
  label = createP('Собери слово')
  createCanvas(w, h)
  nextHint()
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
  if(hintIndex == hints.length) {
    return true
  } else {
    return false
  }
}

function userFoundAllLetters() {
  return selectedLetters.length >= hint.length
}

function resetGame() {
  label.show()
  hintIndex = 0 // теперь индекс указывает на первое слово в списке слов hints
}

function userAction() {
  if(gameState == GAME_STATE_START) {
    label.hide()
    selectedLetters = []
    scatterLetters()
    gameState = GAME_STATE_CLICK_LETTER
  } else
  if(gameState == GAME_STATE_CLICK_LETTER) {
    selectLetter(mouseX, mouseY)
    if(userFoundAllLetters()) {
      gameState = GAME_STATE_SHOW_RESULT
    }
  } else
  if(gameState == GAME_STATE_SHOW_RESULT) {
    if(isAllWordsUsed()) {// если слова кончились
      // спрашиваем игрока: сыграть заново?
      gameState = GAME_STATE_RESTART
    } else { // если ещё есть слова
      // продолжаем игру
      nextHint()
      gameState = GAME_STATE_START
    }

    // if(isAllWordsUsed()) {
      // gameState = GAME_STATE_RESTART
    // } else {
      // gameState = GAME_STATE_SHOW_RESULT
    // }
    // gameState = GAME_STATE_SHOW_HINT
  } else
  if(gameState == GAME_STATE_RESTART)  {
    resetGame()

    gameState = GAME_STATE_START
  }
  console.log(`hintIndex = ${hintIndex}`)
  draw() // обновляем картинку игры(canvas)
}

function showRestartScreen() {
  text("начать игру заново?", gameWidth() / 2, gameHeight() / 2)
}

// ***************************************************
// *                    DRAW                         *
// ***************************************************

function draw() {
  background(backgroundColor);
  
  if (gameState == GAME_STATE_START) {
    showHint()
  } else
  if(gameState == GAME_STATE_CLICK_LETTER) {
    for (let letter of letters) {
      letter.show()
    }
  } else
  if(gameState == GAME_STATE_SHOW_RESULT) {
    showResult()
  } else
  if(gameState == GAME_STATE_RESTART) {
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
  if(hintIndex >= hints.length) {
    throw "Ошибка индекс указывает на несуществующее слово"
  }
  hint = hints[hintIndex]
  hintIndex = hintIndex + 1
}

function showHint() {
  push()
  text('Собери слово:',
    gameWidth() / 2,
    gameHeight() / 2
  )
  fill(hintColor)
  text(hint, 
    gameWidth() / 2,
    gameHeight() / 2 + letterHeight
  )
  pop()
}

function showResult() {
  push()
  if(selectedLetters == hint) { // слово собрано верно
    fill(255, 255, 255)
    text('Ты верно собрал слово!',gameWidth() / 2, gameHeight() / 2)
    fill(255, 255, 0)
    text(hint,                   gameWidth() / 2,  gameHeight() / 2 + letterHeight)
  } else { // слово собрано неверно
    fill(255, 255, 255)
    text('Ты собрал слово:',     gameWidth() / 2, gameHeight() / 2)
    fill(255, 255, 0)
    text(selectedLetters,        gameWidth() / 2, gameHeight() / 2 + letterHeight)
    fill(255, 255, 255)
    text('нужно было собрать: ', gameWidth() / 2, gameHeight() / 2 + letterHeight*2)
    fill(255, 255, 255)
    text(hint,                   gameWidth() / 2,  gameHeight() / 2 + letterHeight*3)
  }
  pop()
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