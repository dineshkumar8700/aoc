const data = Deno.readTextFileSync("./data/input.txt");
const parsedData = data.split(",").map((element) => parseInt(element));

const add = (x, y) => x + y;

const multiply = (x, y) => x * y;

const placeOne = (x, y) => 1;

const printValue = (data, index) => {
  console.log("From opcode 4", data[data[index + 1]]);
};

const operationOnNewOpcode = (data, index, jump, operation) => {
  const currentElement = ("" + data[index]).padStart(5, 0);
  let firstValue = data[data[index + 1]];
  let secondValue = data[data[index + 2]];

  if (currentElement[2] === "1") {
    firstValue = data[index + 1];
  }

  if (currentElement[1] === "1") {
    secondValue = data[index + 2];
  }

  data[data[index + (jump - 1)]] = operation(firstValue, secondValue);
};

const performOperation = (data, index, operation, jump) => {
  data[data[index + (jump - 1)]] = operation(
    data[data[index + 1]],
    data[data[index + 2]],
  );
};

const executeIntcode = (input) => {
  const data = [...input];
  console.log(data);
  let jump = 0;

  for (let index = 0; index < data.length; index += jump) {
    if (data[index] === 1) {
      jump = 4;
      performOperation(data, index, add, jump);
    } else if (data[index] === 2) {
      jump = 4;
      performOperation(data, index, multiply, jump);
    } else if (data[index] === 3) {
      jump = 2;
      performOperation(data, index, placeOne, jump);
    } else if (data[index] === 4) {
      jump = 2;
      printValue(data, index);
    } else if ((data[index] + "").length >= 4) {
      if ((data[index] + "").slice(-2) === "01") {
        jump = 4;
        operationOnNewOpcode(data, index, jump, add);
      } else if ((data[index] + "").slice(-2) === "02") {
        jump = 4;
        operationOnNewOpcode(data, index, jump, multiply);
      } else if ((data[index] + "").slice(-2) === "03") {
        jump = 2;
        performOperation(data, index, placeOne, jump);
      } else if ((data[index] + "").slice(-2) === "04") {
        jump = 2;
        printValue(data, index);
      }
    } else if (data[index] === 99) return data;
  }
  console.log("Data after operation", data);
  return data;
};

// const temp = "3,6,4,8,1,4,6,7,4,1";
// const parsedData = temp.split(",").map((element) => parseInt(element));

executeIntcode(parsedData);
// console.log(findNounAndVerb(parsedData, 19690720));
