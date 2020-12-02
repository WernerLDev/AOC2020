import * as fs from 'fs';

const parseInput = (input:string) => {
    const regex = /^([0-9]+)\-([0-9]+)\ ([a-zA-Z])\:\ ([a-z]+)$/g
    const parsed = regex.exec(input)

    return parsed ? [parsed[1], parsed[2], parsed[3], parsed[4]] : []
}

const input = 
    fs
      .readFileSync('inputs/day2.txt', 'utf-8')
      .split('\n')
      .map(x => parseInput(x))


const solvePart1 = (lines:string[][]) => {
    return lines.filter(line => {
        const [min, max, char, passwd] = line
        let n = 0;
        for(let i = 0; i < passwd.length; i++)
            if(passwd[i] == char) n++;
        return n >= parseInt(min) && n <= parseInt(max)
    })
    .length
}

const solvePart2 = (lines:string[][]) => {
    return lines.filter(line => {
        const [min, max, char, passwd] = line
        const pos1 = passwd[parseInt(min) - 1]
        const pos2 = passwd[parseInt(max) - 1]

        return (pos1 == char || pos2 == char) && pos1 != pos2
    })
    .length;
}

console.log(`solution part 1: ${solvePart1(input)}`)
console.log(`solution part 2: ${solvePart2(input)}`)