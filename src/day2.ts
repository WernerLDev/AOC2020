import * as fs from 'fs';


type PasswdLine = {
    n1:number,
    n2:number,
    char:string,
    password: string
}

const parseInput = (input:string) => {
    const regex = /^([0-9]+)\-([0-9]+)\ ([a-zA-Z])\:\ ([a-z]+)$/g

    const result = regex.exec(input)
    if(result) {
        return <PasswdLine>{
            n1: parseInt(result[1]),
            n2: parseInt(result[2]),
            char: result[3],
            password: result[4]
        }
    }

    return null;
}

const input = 
    fs
      .readFileSync('inputs/day2.txt', 'utf-8')
      .split('\n')
      .map(x => parseInput(x))



const isPasswdValidPart1 = (line:PasswdLine) => {

    let n = 0;

    for(let i = 0; i < line.password.length; i++) {
        if(line.password[i] == line.char) {
            n++;
        }
    }

    return n >= line.n1 && n <= line.n2;
}


const isPasswdValidPart2 = (line:PasswdLine) => {

    const pos1 = line.password[line.n1 - 1]
    const pos2 = line.password[line.n2 - 1]    

    return (pos1 == line.char || pos2 == line.char) && pos1 != pos2

}

const solve = (lines:(PasswdLine | null)[]) => {
    return lines
            .filter(x => x && isPasswdValidPart2(x))
            .length
}

console.log(solve(input))