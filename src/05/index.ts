import * as fs from "fs";

const processLine = (line: string) => {
  const solve = (currIndex: number, min: number, max: number): number => {
    const m = Math.floor((max + min) / 2);

    if (!line[currIndex]) return m;
    if (line[currIndex] == "F" || line[currIndex] == "L") {
      return solve(currIndex + 1, min, m);
    } else {
      return solve(currIndex + 1, m + 1, max);
    }
  };

  return solve(0, 0, 1023);
};

const ProcessSmarter = (line: string) =>
  [...line].reduce<number>((number, nextVal) => {
    return (number << 1) + (nextVal == "B" || nextVal == "R" ? 1 : 0);
  }, 0);

const input = fs
  .readFileSync("inputs/day5.txt", "utf-8")
  .split("\n")
  .map((line) => ProcessSmarter(line))
  .sort((a, b) => b - a);

const solvePart1 = () => {
  return input[0];
};

const solvePart2 = (index: number): number => {
  const current = input[index];
  const next = input[index + 1];
  const diff = current - next;
  if (next && diff > 1) return next + 1;
  else if (next) return solvePart2(index + 1);
  else return -1;
};

console.log(`Solution part 1: ${solvePart1()}`);
console.log(`Solution part 2: ${solvePart2(0)}`);
