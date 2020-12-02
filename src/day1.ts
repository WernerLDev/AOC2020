import * as fs from 'fs';
import * as path from 'path';


const input = 
    fs
      .readFileSync('inputs/day1.txt', 'utf-8')
      .split('\n')
      .filter(x => !!x)
      .map(x => parseInt(x))


const solve = (inp:number[]): number => {
  
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

console.log(solve(input))