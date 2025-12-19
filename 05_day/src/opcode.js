const data = Deno.readTextFileSync("./data/input.txt");
const program = data.split(",").map((element) => parseInt(element));
const INPUT_VALUE = 1;
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
  memory[outPos] = INPUT_VALUE;
};

const executeOutput = (memory, ip) => {
  const { modes } = decodeInstruction(memory[ip]);
  const value = getParameterValue(memory, memory[ip + 1], modes[0]);
  lastOutput = value;
  console.log("OUTPUT:", value);
};

const OPERATIONS = {
  1: (m, ip) => (executeBinaryOp(m, ip, add), ip + 4),
  2: (m, ip) => (executeBinaryOp(m, ip, multiply), ip + 4),
  3: (m, ip) => (executeInput(m, ip), ip + 2),
  4: (m, ip) => (executeOutput(m, ip), ip + 2),
  99: () => null,
};

const executeIntcode = (program) => {
  const memory = [...program];
  let ip = 0;

  while (ip !== null) {
    const { opcode } = decodeInstruction(memory[ip]);
    ip = OPERATIONS[opcode](memory, ip);
  }

  return lastOutput;
};

const diagnosticCode = executeIntcode(program);
console.log("Final Diagnostic Code:", diagnosticCode);
