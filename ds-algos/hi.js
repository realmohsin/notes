// [3, 5, 8] = 16   
function smallestDivisor(arr, k) {

  []

  let divisor = 1;

  while (true) {
    let sum = 0;
    for (let elem of arr) {
      sum += Math.ceil(elem / divisor);
    }
    if (sum <= k) {
      return divisor;
    }
    divisor++;
  }
}

console.log(closest("hackerrank", 4));
console.log(closest("hackerrank", 1));
console.log(closest("hackerrank", 6));
console.log(closest("hackerrank", 8));

