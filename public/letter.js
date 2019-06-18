class Letter {
  constructor(x, y, s) {
    this.width = letterWidth
    this.height = letterHeight
    this.color = letterColor()
    this.selected = false
    this.x = x
    this.y = y
    this.s = s
  }
  
  show() {
    push()
        push()
          stroke('red')
          strokeWeight(2)
          noFill()
          rect(this.x, this.y, this.width, this.height)
        pop()
      textAlign(LEFT, TOP)
      fill(this.color)
      text(this.s, this.x, this.y)
    pop()
  }
  
  mouseInRectangle(mx, my) {
    if(mx > this.x &&
       my > this.y &&
       mx < this.x + this.width &&
       my < this.y + this.height
    ) {
      if(this.selected == false) {
        return true
      }
    } else {
      return false
    }
  }
}

function letterColor() {
  return [
  random(backgroundColor[0] + 20, 255),
  random(backgroundColor[1] + 20, 255),
  random(backgroundColor[2] + 20, 255),
  ]
}

function extendAlphabet(alphabet) {
  return alphabet + hints[hintIndex]
}

function scatterLetters() {
  letters = []
  // добавляем в алфавит слово, которое нужно найти
  extendedAlphabet = extendAlphabet(alphabet)
  console.log(`extendedAlphabet = ${extendedAlphabet}`)
  // раскидываем буквы
  for (let symbol of extendedAlphabet) {
    
    // создаем букву в случайном месте на экране
    // буквы не должны выходить за края экрана
    // поэтому отнимаем от ширины(высоты) экрана
    // ширину(высоту) прямоугольника, огрничивающего букву
    // random(a, b) генерирует случайное число в интервале [a, b]
    let xpos = random(0, gameWidth() - letterWidth)
    let ypos = random(0, gameHeight() - letterHeight)
    
    let letter = new Letter(xpos, ypos, symbol)
    
    // добавляем букву в кучку
    letters.push(letter)
  }
}

function selectLetter(mouseX, mouseY) {
  for(letter of letters) {
    if(letter.mouseInRectangle(mouseX, mouseY)) {
      letter.color = [255, 255, 0] // yellow
      letter.selected = true
      selectedLetters += letter.s
      return
    }
  }
}