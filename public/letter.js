class Letter {
  // это конструктор класса - он создаёт объект Letter
  // и присваивает его полям значения
  constructor(x, y, s) {
    // ширина буквы
    this.width = letterWidth
    // высота буквы
    this.height = letterHeight
    // цвет буквы, выбираем случайный
    this.color = randomColor()
    // нужно знать выбрана буква игроком или нет
    this.selected = false // изначально нет
    // координаты буквы
    this.x = x
    this.y = y
    // символ буквы
    this.s = s
  }
  // рисует букву
  show() {
    push()
        push()
          if(isDebug) {
            // рисуем красный прямоугольник вокруг буквы
            stroke('red')
            strokeWeight(2)
            noFill()
            rect(this.x, this.y, this.width, this.height)
          }
        pop()
      textAlign(LEFT, TOP)
      fill(this.color)
      text(this.s, this.x, this.y)
    pop()
  }
  // проверяет находится ли мышь в прямогольнике буквы
  mouseInRectangle(mx, my) {
    if(mx > this.x && // курсор правее левого края прямоугольника
       my > this.y && // курсор ниже верхнего края прямоугольника
       mx < this.x + this.width && // левее правого края прямоугольника
       my < this.y + this.height // выше нижнего края прямоугольника
    ) {
      return true
    } else {
      return false
    }
  }
}

// генерирует сучайный цвет RGB, так чтобы на фоне были видны буквы
function randomColor() {
  return [
    random(backgroundColor[0] + 20, 255),
    random(backgroundColor[1] + 20, 255),
    random(backgroundColor[2] + 20, 255),
  ]
}

// расширяет алфавит, добавляя в него буквы из заданного слова
function extendAlphabet(alphabet) {
  return alphabet + hints[hintIndex]
}

let n = 0 // защита от зацикливания
function scatterLetters() {
  letters = []
  n = 0 // защита от зацикливания
  // добавляем в алфавит слово, которое нужно найти
  extendedAlphabet = extendAlphabet(alphabet)
  console.log(`extendedAlphabet = ${extendedAlphabet}`)
  // раскидываем буквы
  for (let symbol of extendedAlphabet) {
    // генерируем случайную позицию на экране для одной буквы
    let xpos = random(0, gameWidth() - letterWidth)
    let ypos = random(0, gameHeight() - letterHeight)
    // создаём объект букву
    letter = new Letter(xpos, ypos, symbol)
    // добавляем букву в кучку
    letters.push(letter)
  }
}

function selectLetter(mouseX, mouseY) {
  for(letter of letters) {
    // если курсор в прямоугольнике и буква не была нажата ранее
    if(letter.mouseInRectangle(mouseX, mouseY) && letter.selected == false) {
      // присваиваем букве цвет
      letter.color = letterSelectedColor
      // запоминаем что она была нажата игроком
      letter.selected = true
      // добавляем в список выбранных игроком букв
      selectedLetters += letter.s
      // выходим из функции, так как нам нужно выбрать только одну букву
      return
    }
  }
}