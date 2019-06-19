// isMobile() возвращает true если игрок открывает
// страницу с мобильного устройства(телефон или тачпад)
// и false если игрок открыет страницу с ПК
const isMobileDevice = isMobile()

// английский алфавит
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// debug mobile.js
const isDebug = true

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

// описываем возможные состояния игры
const GAME_STATE_START = 0
const GAME_STATE_CLICK_LETTER = 1
const GAME_STATE_SHOW_RESULT = 2
const GAME_STATE_RESTART = 3

// в gameState будет храниться состояние игры
let gameState = GAME_STATE_START


// список букв, каждая из которых будет объектом Letter
let letters = []
let selectedLetters = ''

// цвет выбранной игроком буквы
let letterSelectedColor = [255, 255, 0]
// цвет слова
let hintColor = [255, 255, 255]
// цвет фона
let backgroundColor = [100, 100, 100]

// hintIndex указывает на первое слово, оно имеет индекс 0
let hintIndex = 0
// список слов
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