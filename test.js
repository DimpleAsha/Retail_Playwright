let arr = [1,2,5,11,23,0,6,7,9]

let sArr = [...arr].sort((a,b)=>a-b)
console.log(sArr[sArr.length-1])
console.log(sArr[sArr.length-2])
