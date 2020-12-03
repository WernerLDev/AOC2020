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
  const slope1 = solve({ row: 0, col: 0 }, 1, 1, 0);
  const slope2 = solve({ row: 0, col: 0 }, 3, 1, 0);
  const slope3 = solve({ row: 0, col: 0 }, 5, 1, 0);
  const slope4 = solve({ row: 0, col: 0 }, 7, 1, 0);
  const slope5 = solve({ row: 0, col: 0 }, 1, 2, 0);

  return slope1 * slope2 * slope3 * slope4 * slope5;
};

console.log(`Solution part 1: ${solvePart1()}`);
console.log(`Solution part 2: ${solvePart2()}`);
