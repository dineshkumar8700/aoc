const data = Deno.readTextFileSync("./data/input.txt");
const parsedData = data.split(",").map((element) => parseInt(element));

const instructions1 = "R8,U5,L5,D3";
const instructions2 = "U7,R6,D4,L4";

const moveWire = (origins, direction, moves) => {
};

const executeInstructions = (instructions) => {
  const origins = { x: 0, y: 0 };

  const instructionsArray = instructions.split(",");

  for (let index = 0; index < instructionsArray.length; index++) {
    if (instructionsArray[index][0] === "R") {
      origins.x += parseInt(instructionsArray[index][1]);
    }
    if (instructionsArray[index][0] === "L") {
      origins.x -= parseInt(instructionsArray[index][1]);
    }
    if (instructionsArray[index][0] === "U") {
      origins.y += parseInt(instructionsArray[index][1]);
    }
    if (instructionsArray[index][0] === "D") {
      origins.y -= parseInt(instructionsArray[index][1]);
    }
  }
  return origins;
};

const wire1 = executeInstructions(instructions1);
const wire2 = executeInstructions(instructions2);

console.log("Wire 1 :", wire1);
console.log("Wire 2 :", wire2);
