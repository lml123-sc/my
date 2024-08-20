/**
* 冒泡
*/
function bubleSort (arr) {
  const length = arr.length
  for(let i=0; i<length; i++) {
    for(let j=0; j<length-i-1; j++) {
      if(arr[j] > arr[j+1]) {
        const temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
  return arr
}

const bobleList = [51, 21, 15 ,54, 55, 16, 37, 38, -1, 999999]
console.log('bubleSort(bobleList)', bubleSort(bobleList));