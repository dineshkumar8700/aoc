const data = Deno.readTextFileSync("./data/input.txt");
const input = data.split("\n");
const parsedInput = input.map((element) => parseInt(element));

const part1Result = parsedInput.reduce(
  (fuel, mass) => fuel += Math.floor(mass / 3) - 2,
  0,
);

const part2Result = parsedInput.reduce((fuel, mass) => {
  while (mass >= 9) {
    mass = Math.floor(mass / 3) - 2;
    fuel += mass;
  }

  return fuel;
}, 0);

console.log(part1Result);
console.log(part2Result);
