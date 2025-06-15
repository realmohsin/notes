// the nth number is at index is n - 1

num % 2 === 0
num % 2 === 1

arr[0]
arr[length - 1]

arr[Math.floor(length/2)]
arr[length/2] or arr[(length/2) - 1]

let arr = array 

let middleElement

if (arr.length === 0) return null

if (arr.length % 2 === 0) {
  middleElement = arr[arr.length / 2]
} else {
  middleElement = arr[Math.floor(arr.length / 2)]
}

// run something n times, with index referring to iteration
for (let i = 1; i <= n; i++) {
  console.log(i)
}

// run something for each element of an array
for (let i = 0; i < arr.length; i++) {
 console.log(i + 1)
}
// i + 1 will be iteration number


function onlyElementsAtEvenIndex(array) {
  var newArray = Array(Math.ceil(array.length / 2));
  for (var i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      newArray[i / 2] = array[i];
    }
  }
  return newArray;
}

[1,1,1,1,1,1]

// 11/2 = Math.floor(11/2)

// 121/2 = Math.floor()




function onlyElementsAtEvenIndex(array) {
  let newArr = []

  for (let i = 0; i < array.length; i++) {
    if (i % 2 === 0) {
      newArr.push(array[i])
    }
  }

  return newArr
}
