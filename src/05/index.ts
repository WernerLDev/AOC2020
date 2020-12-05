import * as fs from "fs";

const processLine = (line: string) =>
  parseInt([...line].map((c) => (c == "B" || c == "R" ? 1 : 0)).join(""), 2);

const input = fs
  .readFileSync("inputs/day5.txt", "utf-8")
  .split("\n")
  .map((line) => processLine(line))
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
