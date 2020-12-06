import * as fs from "fs";

const input = fs.readFileSync("inputs/day6.txt", "utf-8").split("\n\n");

const uniqueAnswers = (group: string) => {
  return new Set<string>([...group.replace(/\n/g, "")]);
};

const solvePart1 = () => {
  return input.map((line) => uniqueAnswers(line).size).reduce((a, b) => a + b);
};

const solvePart2 = () => {
  return input
    .map((line) => {
      return line
        .split("\n")
        .map((x) => new Set([...x]))
        .reduce((a, b) => {
          return new Set([...a].filter((key) => b.has(key)));
        }).size;
    })
    .reduce((a, b) => a + b);
};

console.log(`Solution part 1: ${solvePart1()}`);
console.log(`Solution part 2: ${solvePart2()}`);
