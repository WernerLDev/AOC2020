import * as fs from 'fs';
import * as path from 'path';


const input = 
    fs
      .readFileSync('input.txt', 'utf-8')
      .split('\n')
      .filter(x => !!x)
      .map(x => parseInt(x))


const solve = (inp:number[]): number => {
  
  for(let i = 0; i < inp.length; i++) {
    for(let j = 0; j < inp.length; j++) {
      if(i != j && inp[i] + inp[j] == 2020) {
        return inp[i] * inp[j]
      }
    }
  }

  return 0
}

console.log(solve(input))