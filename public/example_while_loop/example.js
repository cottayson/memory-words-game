debugger;
// считаем сумму элементов массива справа налево
calcSumRightToLeft([10,6,7,6,4])
// ... слева направо
calcSumLeftToRight([10,6,7,6,4])

function calcSumRightToLeft(array) {
  let sum = 0
  let index = array.length - 1
  while(index >= 0) {
    let element = array[index]
    sum += element
    index = index - 1 // index убывает
  }
  
  // let sum = 0
  // sum += array[4] 
  // sum += array[3]
  // sum += array[2]
  // sum += array[1]
  // sum += array[0]
  return sum
}

function calcSumLeftToRight(array) {
  let sum = 0
  let index = 0
  while(index < array.length) {
    let element = array[index]
    sum += element
    index = index + 1 // index возрастает
  }
  
  // let sum = 0
  // sum += array[0]
  // sum += array[1]
  // sum += array[2]
  // sum += array[3]
  // sum += array[4]
  return sum
}