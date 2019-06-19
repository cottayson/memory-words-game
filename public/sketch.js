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
[+] буквы должны быть одинакового размера на разных устройствах, по крайней мере чтобы было удобно кликать

[ ] счёт верно и неверно
 угаданных слов
 
[ ] добавить состояние начала игры, приветствие
 */

// image drag: https://codepen.io/DonKarlssonSan/pen/wgWyWx

// gulp reload: https://www.youtube.com/watch?v=KURMrW-HsY4&index=7&list=PLRk95HPmOM6PN-G1xyKj9q6ap_dc9Yckm

// https://stackoverflow.com/questions/32399469/livereload-not-working-in-chrome-using-gulp-what-am-i-missing


// ***************************************************
// *                    SETUP                        *
// ***************************************************

// создаём переменную, где будет храниться html элемент <p> 
let label
function setup() {
  // создаём надпись ( html элемент <p> )
  label = createP('Игра "Собери слово"')
  // устанавливаем размеры экрана
  createCanvas(gameWidth(), gameHeight())
  // выбираем шрифт и размер букв
  textFont("consolas", textSize)
  // центрируем текст надписей
  textAlign(CENTER, CENTER);
  // отключаем частую перерисовку экрана
  noLoop()
}

// возвращает true если список слов закончился
function isAllWordsUsed() {
  if(hintIndex == hints.length - 1) {
    return true
  } else {
    return false
  }
}

// возвращает true если игрок нашёл нужно количество букв(не факт что правильных)
function userFoundAllLetters() {
  return selectedLetters.length >= hints[hintIndex].length
}

// начинает игру сначала
function restartGame() {
  // показываем надпись
  label.show()
  // теперь индекс указывает на первое слово в списке слов hints
  hintIndex = 0 
}

function userAction() {
  if(gameState == GAME_STATE_START) {
    // скрываем надпись
    label.hide()
    // очищаем список выбранных игроком букв
    selectedLetters = []
    // раскидываем буквы по экрану
    scatterLetters()
    // переходим в следующее состояние
    gameState = GAME_STATE_CLICK_LETTER
  } else if(gameState == GAME_STATE_CLICK_LETTER) {
    // попытка игрока выбрать букву
    selectLetter(mouseX, mouseY)
    // если все буквы собраны
    if(userFoundAllLetters()) {
      // переходим в следующее состояние
      gameState = GAME_STATE_SHOW_RESULT
    }
  } else if(gameState == GAME_STATE_SHOW_RESULT) {
    // если слова кончились
    if(isAllWordsUsed()) {
      // спрашиваем игрока: сыграть заново?
      gameState = GAME_STATE_RESTART
    } else { // если остались слова
      // продолжаем игру
      nextHint() // переход к следующему слову
      gameState = GAME_STATE_START
    }
  } else if(gameState == GAME_STATE_RESTART)  {
    // начинаем игру сначала
    restartGame()
    // переходим в состояние GAME_STATE_START
    gameState = GAME_STATE_START
  }
}

// ***************************************************
// *                    DRAW                         *
// ***************************************************

function draw() {
  // устанавливаем цвет фона
  background(backgroundColor);
  
  if (gameState == GAME_STATE_START) { 
    //показываем слово
    showHint()
  } else if(gameState == GAME_STATE_CLICK_LETTER) { 
    //игрок кликает на буквы
    for (let letter of letters) {
      // рисуем каждую букву letter из кучки letters
      letter.show() 
    }
  } else if(gameState == GAME_STATE_SHOW_RESULT) { 
    // показываем результат
    showResult()
  } else if(gameState == GAME_STATE_RESTART) { 
    // спрашиваем: перезапустить игру?
    showRestartScreen()
  }
  
  // если нужно выводим отладочную информацию
  if(isDebug) {
    if(isPhone()) {
      text("isPhone", 300, 100)
    } else 
    if(isMobile()){
      text("isTablet", 300, 100)
    } else {
      text("isPC", 300, 100)
    }
  }
  
  console.log("draw")
}

// переход к следующему слову
function nextHint() {
  if(hintIndex >= hints.length || hintIndex < 0) {
    throw `Ошибка индекс ${hintIndex} указывает на несуществующее слово`
  }
  // увеличиваем индекс, указывающий на слово
  // в списке hints, на единицу, чтобы он указвал
  // на следущее слово
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
  push() // создаем новые настойки canvas
  // координаты центра экрана
  let centerX = gameWidth() / 2
  let centerY = gameHeight() / 2
  if(selectedLetters == hints[hintIndex]) {
    // если слово собрано верно
    fill('white') //  устанавливаем белый цвет текста
    text('Ты верно собрал слово!', centerX, centerY)
    fill('yellow') //  устанавливаем жёлтый цвет текста
    text(hints[hintIndex],         centerX, centerY + letterHeight)
  } else { 
    // слово собрано неверно
    fill('white')
    text('Ты собрал слово:',       centerX, centerY)
    fill('yellow')
    text(selectedLetters,          centerX, centerY + letterHeight)
    fill('white')
    text('нужно было собрать: ',   centerX, centerY + letterHeight*2)
    fill('white')
    text(hints[hintIndex],         centerX, centerY + letterHeight*3)
  }
  pop() // сбрасываем настройки canvas
}

function showRestartScreen() {
  text("начать игру заново?", gameWidth() / 2, gameHeight() / 2)
}

// ширина экрана игры
function gameWidth() {
  return windowWidth-5
}

// высота экрана игры
function gameHeight() {
  return windowHeight-5
}

// если окно променяло размеры, то меняем размеры canvas
function windowResized() {
  resizeCanvas(gameWidth(), gameHeight())
}