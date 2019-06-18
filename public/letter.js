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
  return alphabet + hint
}

function scatterLetters() {
  letters = []
  extendedAlphabet = extendAlphabet(alphabet)
  console.log(extendedAlphabet)
  
  for (let oneLetter of extendedAlphabet) {
    letters.push(new Letter(
       random(0, gameWidth() - letterWidth), 
       random(0, gameHeight() - letterHeight), 
       oneLetter
    ))
  }
}

function selectLetter(mouseX, mouseY) {
  for(letter of letters) {
    if(letter.mouseInRectangle(mouseX, mouseY)) {
      letter.color = [255, 255, 0]
      letter.selected = true
      selectedLetters += letter.s
      return
    }
  }
}