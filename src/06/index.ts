import * as fs from "fs";

const input = fs.readFileSync("inputs/day6.txt", "utf-8").split("\n\n");

const uniqueAnswers = (group: string) => {
  const answers = new Set<string>();

  [...group.replace(/\n/g, "")].forEach((c) => {
    if (!answers.has(c)) answers.add(c);
  });

  return answers;
};

const solvePart1 = () => {
  return input.map((line) => uniqueAnswers(line).size).reduce((a, b) => a + b);
};

const solvePart2 = () => {
  return input
    .map((line) => {
      const persons = line.split("\n").map((p) => new Set([...p]));
      return [...uniqueAnswers(line)].filter((answer) => {
        return (
          persons.filter((person) => person.has(answer)).length ==
          persons.length
        );
      }).length;
    })
    .reduce((a, b) => a + b);
};

console.log(`Solution part 1: ${solvePart1()}`);
console.log(`Solution part 2: ${solvePart2()}`);
