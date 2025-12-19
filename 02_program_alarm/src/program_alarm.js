const data = Deno.readTextFileSync("./data/input.txt");
const parsedData = data.split(",").map((element) => parseInt(element));

const OPERATIONS = {
  1: (memory, ip) => {
    updateMemory(memory, ip, add);
    return ip + 4;
  },
  2: (memory, ip) => {
    updateMemory(memory, ip, multiply);
    return ip + 4;
  },
  99: (memory, ip) => {
    return null;
  },
};

const add = (x, y) => x + y;

const multiply = (x, y) => x * y;

const updateMemory = (memory, ip, operation) => {
  const input1Pos = memory[ip + 1];
  const input2Pos = memory[ip + 2];
  const outputPos = memory[ip + 3];

  memory[outputPos] = operation(memory[input1Pos], memory[input2Pos]);
};

const applyOverrides = (memory, overrides) => {
  overrides.forEach(([position, value]) => {
    memory[position] = value;
  });
};

const executeIntcode = (input, overrides = []) => {
  const memory = [...input];
  applyOverrides(memory, overrides);

  let ip = 0;

  while (ip !== null) {
    const opcode = memory[ip];
    const operation = OPERATIONS[opcode];
    ip = operation(memory, ip);
  }

  return memory[0];
};

console.log(executeIntcode(parsedData, [[1, 12], [2, 2]]));

// console.log(findNounAndVerb(parsedData, 19690720));

// const findNounAndVerb = (input, target) => {
//   const data = [...input];

//   for (let i = 0; i <= 99; i++) {
//     for (let j = 0; j <= 99; j++) {
//       data[1] = i;
//       data[2] = j;
//       if (executeIntcode(data) === target) return i + "" + j;
//     }
//   }
// };
