const data = Deno.readTextFileSync("./data/input.txt");
const parsedData = data.split(",").map((element) => parseInt(element));

const add = (x, y) => x + y;

const multiply = (x, y) => x * y;

const performOperation = (data, index, operation) => {
  data[data[index + 3]] = operation(
    data[data[index + 1]],
    data[data[index + 2]],
  );

  return data;
};

const executeIntcode = (input, part = 2) => {
  const data = [...input];
  if (part === 1) {
    data[1] = 12;
    data[2] = 2;
  }

  for (let index = 0; index < data.length; index += 4) {
    if (data[index] === 1) performOperation(data, index, add);
    else if (data[index] === 2) performOperation(data, index, multiply);
    else if (data[index] === 99) return data[0];
  }

  return data[0];
};

const findNounAndVerb = (input, target) => {
  const data = [...input];

  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      data[1] = i;
      data[2] = j;
      if (executeIntcode(data) === target) return i + "" + j;
    }
  }
};

console.log(executeIntcode(parsedData, 1));
console.log(findNounAndVerb(parsedData, 19690720));
