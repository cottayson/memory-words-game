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
          // рисуем красный прямоугольник вокруг буквы
          // stroke('red')
          // strokeWeight(2)
          // noFill()
          // rect(this.x, this.y, this.width, this.height)
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
  
  intersect(otherLetter) {
    // intersect equal rectangles
    return false
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
    appendLetter(symbol)
  }
}


function appendLetter(symbol) {
  let xpos
  let ypos
  let letter
  do {
    if(n++ > 10000) { // защита от зацикливания
      throw "алгоритм зациклился n>10000 letterIntersectOther(letter, letters) = true"
    }
    // создаем букву в случайном месте на экране
    // буквы не должны выходить за края экрана
    // поэтому отнимаем от ширины(высоты) экрана
    // ширину(высоту) прямоугольника, огрничивающего букву
    // random(a, b) генерирует случайное число в интервале [a, b]
    
    xpos = random(0, gameWidth() - letterWidth)
    ypos = random(0, gameHeight() - letterHeight)
    
    letter = new Letter(xpos, ypos, symbol)
  } while( letterIntersectOther(letter, letters) )
    
  // если буква не пересекается с другими
  // добавляем букву в кучку
  letters.push(letter)
}


function letterIntersectOther(letter, letters) {
  for(let otherLetter of letters) {
    if(letter.intersect(otherLetter)) {
      return true
    }
  }
  return false
}

function selectLetter(mouseX, mouseY) {
  for(letter of letters) {
    if(letter.mouseInRectangle(mouseX, mouseY) && letter.selected == false) {
      letter.color = [255, 255, 0] // yellow
      letter.selected = true
      selectedLetters += letter.s
      return
    }
  }
}