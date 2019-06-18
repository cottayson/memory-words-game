var wordList = require('word-list-json')

let words3 = []
let words4 = []
let words5 = []
let words6 = []
let words7 = []

console.log(`length = ${wordList.length}`)

for(let word of wordList.slice(0, 100000)) {
  if(word.length == 3) {
    words3.push(word)
  } else
  if(word.length == 4) {
    words4.push(word)
  } else
  if(word.length == 5) {
    words5.push(word)
  } else
  if(word.length == 6) {
    words6.push(word)
  } else
  if(word.length == 7) {
    words7.push(word)
  }
}

console.log(words5)