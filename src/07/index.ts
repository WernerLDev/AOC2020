import * as fs from "fs";

type Bag = {
  name: string;
  contains: {
    name: string;
    amount: number;
  }[];
};

const getBagName = (fullName: string) => {
  const parts = fullName.split(" ");
  return `${parts[0]} ${parts[1]}`;
};

const input = fs
  .readFileSync("inputs/day7.txt", "utf-8")
  .split("\n")
  .map((line) => {
    const [name, contain] = line.split(" contain ");
    return <Bag>{
      name: getBagName(name),
      contains: contain.split(", ").map((b) => {
        const parts = b.match(/^([\d]+) ([a-z]+) ([a-z]+) ([a-z\.]+)$/);
        if (parts == null) return null;
        return {
          name: `${parts[2]} ${parts[3]}`,
          amount: parseInt(parts[1]),
        };
      }),
    };
  });

const bagsMap = new Map<string, Bag>(input.map((b) => [b.name, b]));

const solvePart1 = () => {
  const containsShinyGold = (name: string): boolean => {
    const containing = bagsMap.get(name)?.contains || [];
    return containing.some(
      (x) => x && (x.name == "shiny gold" || containsShinyGold(x.name))
    );
  };

  return input.filter((x) => containsShinyGold(x.name)).length;
};

const solvePart2 = () => {
  const countBags = (name: string): number => {
    const bags = bagsMap.get(name)?.contains;
    if (bags == null) return 0;
    return bags.reduce(
      (a, b) => a + (b ? b.amount + b.amount * countBags(b.name) : 0),
      0
    );
  };
  return countBags("shiny gold");
};

console.log(`Solution part 1: ${solvePart1()}`);
console.log(`Solution part 2: ${solvePart2()}`);
