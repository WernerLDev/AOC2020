import * as fs from "fs";
import { Grid, Position } from "./grid";

const input = fs.readFileSync("inputs/day3.txt", "utf-8").split("\n");
const gridHeight = input.length;
const grid = Grid<string>([...input.join("")], input[0].length);

const solve = (
  currPos: Position,
  stepRight: number,
  stepDown: number,
  nTrees: number
): number => {
  if (currPos.row >= gridHeight) return nTrees;
  return solve(
    {
      row: currPos.row + stepDown,
      col: currPos.col + stepRight,
    },
    stepRight,
    stepDown,
    nTrees + (grid(currPos) == "#" ? 1 : 0)
  );
};

const solvePart1 = (): number => {
  return solve({ row: 0, col: 0 }, 3, 1, 0);
};

const solvePart2 = (): number => {
  return [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
    .map((x) => solve({ row: 0, col: 0 }, x[0], x[1], 0))
    .reduce((a, b) => a * b);
};

console.log(`Solution part 1: ${solvePart1()}`);
console.log(`Solution part 2: ${solvePart2()}`);
