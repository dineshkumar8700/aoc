const data = Deno.readTextFileSync("./data/input.txt");
const program = data.split(",").map((element) => parseInt(element));
let lastOutput = null;

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const decodeInstruction = (instruction) => {
  const str = (instruction + "").padStart(5, "0");

  return {
    opcode: parseInt(str.slice(3)),
    modes: [
      parseInt(str[2]),
      parseInt(str[1]),
      parseInt(str[0]),
    ],
  };
};

const getParameterValue = (memory, parameter, mode) => {
  return mode === 0 ? memory[parameter] : parameter;
};

const executeBinaryOp = (memory, ip, operation) => {
  const { modes } = decodeInstruction(memory[ip]);
  const a = getParameterValue(memory, memory[ip + 1], modes[0]);
  const b = getParameterValue(memory, memory[ip + 2], modes[1]);
  const outPos = memory[ip + 3];

  memory[outPos] = operation(a, b);
};

const executeInput = (memory, ip) => {
  const outPos = memory[ip + 1];
  memory[outPos] = +prompt("Give Input:");
};

const executeOutput = (memory, ip) => {
  const { modes } = decodeInstruction(memory[ip]);
  const value = getParameterValue(memory, memory[ip + 1], modes[0]);
  lastOutput = value;
  console.log("OUTPUT:", value);
};

const opcode5 = (memory, ip) => {
  const { modes } = decodeInstruction(memory[ip]);
  const a = getParameterValue(memory, memory[ip + 1], modes[0]);
  const b = getParameterValue(memory, memory[ip + 2], modes[1]);

  return a ? [b, true] : [3, false];
};

const opcode6 = (memory, ip) => {
  const { modes } = decodeInstruction(memory[ip]);
  const a = getParameterValue(memory, memory[ip + 1], modes[0]);
  const b = getParameterValue(memory, memory[ip + 2], modes[1]);

  return a ? [3, false] : [b, true];
};

const opcode7 = (memory, ip) => {
  const { modes } = decodeInstruction(memory[ip]);
  const a = getParameterValue(memory, memory[ip + 1], modes[0]);
  const b = getParameterValue(memory, memory[ip + 2], modes[1]);
  const outPos = memory[ip + 3];

  if (a < b) {
    memory[outPos] = 1;
  } else {
    memory[outPos] = 0;
  }
};

const opcode8 = (memory, ip) => {
  const { modes } = decodeInstruction(memory[ip]);
  const a = getParameterValue(memory, memory[ip + 1], modes[0]);
  const b = getParameterValue(memory, memory[ip + 2], modes[1]);
  const outPos = memory[ip + 3];
  memory[outPos] = a === b ? 1 : 0;
};

const OPERATIONS = {
  1: (m, ip) => (executeBinaryOp(m, ip, add), 4),
  2: (m, ip) => (executeBinaryOp(m, ip, multiply), 4),
  3: (m, ip) => (executeInput(m, ip), 2),
  4: (m, ip) => (executeOutput(m, ip), 2),
  5: (m, ip) => (opcode5(m, ip)),
  6: (m, ip) => (opcode6(m, ip)),
  7: (m, ip) => (opcode7(m, ip), 4),
  8: (m, ip) => (opcode8(m, ip), 4),
  99: () => null,
};

const executeIntcode = (program) => {
  const memory = [...program];
  let ip = 0;

  while (true) {
    const { opcode } = decodeInstruction(memory[ip]);

    if (opcode === 99) return lastOutput;
    if (opcode === 5 || opcode === 6) {
      const [value, kyaKarnaHai] = OPERATIONS[opcode](memory, ip);
      if (kyaKarnaHai) ip = value;
      else ip += OPERATIONS[opcode](memory, ip)[0];
    } else ip += OPERATIONS[opcode](memory, ip);
  }
};

const diagnosticCode = executeIntcode(program);
console.log("Final Diagnostic Code:", diagnosticCode);
