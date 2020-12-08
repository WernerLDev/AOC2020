import * as fs from "fs";

type Instruction = {
  operation: "acc" | "jmp" | "nop";
  argument: number;
};

type ProgramResult = {
  terminates: boolean;
  acc: number;
};

const input = fs
  .readFileSync("inputs/day8.txt", "utf-8")
  .split("\n")
  .map((line) => {
    const [opp, arg] = line.split(" ");
    return <Instruction>{
      operation: opp,
      argument: parseInt(arg),
    };
  });

const executeProgram = (
  program: Instruction[],
  index: number,
  acc: number,
  history: Set<number>
): ProgramResult => {
  if (history.has(index)) return { terminates: false, acc };

  const newHistory = new Set<number>([...history, index]);
  const instruction = program[index];
  if (!instruction) return { terminates: true, acc };

  switch (instruction.operation) {
    case "nop":
      return executeProgram(program, index + 1, acc, newHistory);
    case "acc":
      return executeProgram(
        program,
        index + 1,
        acc + instruction.argument,
        newHistory
      );
    case "jmp":
      return executeProgram(
        program,
        index + instruction.argument,
        acc,
        newHistory
      );
    default:
      return { terminates: true, acc: 0 };
  }
};

const solvePart1 = (): number => {
  return executeProgram(input, 0, 0, new Set()).acc;
};

const solvePart2 = () => {
  for (let index: number = 0; index < input.length; index++) {
    const program = [...input];
    const instr = program[index];

    if (instr.operation == "jmp" || instr.operation == "nop") {
      program[index].operation = instr.operation == "jmp" ? "nop" : "jmp";
      const result = executeProgram(program, 0, 0, new Set());
      program[index].operation = instr.operation == "jmp" ? "nop" : "jmp";
      if (result.terminates) return result.acc;
    }
  }

  return 0;
};

console.log(`Solution part 1: ${solvePart1()}`);
console.log(`Solution part 2: ${solvePart2()}`);
