import * as fs from "fs";

const input = fs
  .readFileSync("inputs/day4.txt", "utf-8")
  .split("\n\n")
  .map((line) =>
    line
      .replace(/\n/g, " ")
      .split(" ")
      .map((item) => item.split(":"))
  );

const passports: Map<string, string>[] = input.map((passport) => {
  const m = new Map();
  passport.forEach((item) => m.set(item[0], item[1]));
  return m;
});

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const solve = (fn: (_: Map<string, string>) => boolean) => {
  return passports.filter(fn).length;
};

const solvePart1 = () => {
  return solve((passport) => {
    const validFields = requiredFields.filter((key) => passport.has(key));
    return validFields.length >= requiredFields.length;
  });
};

const solvePart2 = () => {
  const isValidField = (key: string, value: string) => {
    const year = parseInt(value);
    switch (key) {
      case "byr":
        return value.match(/^([0-9]{4})$/) && year >= 1920 && year <= 2002;
      case "iyr":
        return value.match(/^([0-9]{4})$/) && year >= 2010 && year <= 2020;
      case "eyr":
        return value.match(/^([0-9]{4})$/) && year >= 2020 && year <= 2030;
      case "hgt":
        const match = value.match(/([0-9]+)(cm|in)$/);
        if (match) {
          const n = parseInt(match[1]);
          if (match[2] == "cm") return n >= 150 && n <= 193;
          else if (match[2] == "in") return n >= 59 && n <= 76;
        }
        return false;
      case "hcl":
        return value.match(/^\#([0-9a-z]{6})$/);
      case "ecl":
        return value.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/);
      case "pid":
        return value.match(/^([0-9]{9})$/);
      default:
        return false;
    }
  };

  return solve((passport) => {
    const validFields = requiredFields.filter(
      (key) => passport.has(key) && isValidField(key, passport.get(key) || "")
    );

    return validFields.length == requiredFields.length;
  });
};

console.log(`Solution part 1: ${solvePart1()}`);
console.log(`Solution part 2: ${solvePart2()}`);
