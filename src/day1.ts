import * as fs from 'fs';

const input = 
    fs
      .readFileSync('inputs/day1.txt', 'utf-8')
      .split('\n')
      .filter(x => !!x)
      .map(x => parseInt(x))


const solvePart1 = (inp:number[]): number => {
  
  for(let i = 0; i < inp.length; i++) {
    for(let j = 0; j < inp.length; j++) {
      if(i != j && inp[i] + inp[j] == 2020) {
        return inp[i] * inp[j]
      }
    }
  }

  return 0
}

const solvePart2 = (inp:number[]): number => {
  
  for(let i = 0; i < inp.length; i++) {
    for(let j = 0; j < inp.length; j++) {
      for(let k = 0; k < inp.length; k++) {
        if(i != j && j != k && inp[i] + inp[j] + inp[k] == 2020) {
          return inp[i] * inp[j] * inp[k]
        }
      }
    }
  }

  return 0
}

console.log(`Solution part 1: ${solvePart1(input)}`)
console.log(`Solution part 2: ${solvePart2(input)}`)