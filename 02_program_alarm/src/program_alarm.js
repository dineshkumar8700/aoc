const data = Deno.readTextFileSync("./data/input.txt");

const parsedData = data.split(",").map((element) => parseInt(element));

const executeInstructions = (data) => {
  for (let index = 0; index < data.length; index += 4) {
    if (data[index] === 1) {
      data[data[index + 3]] = data[data[index + 1]] + data[data[index + 2]];
    } else if (data[index] === 2) {
      data[data[index + 3]] = data[data[index + 1]] * data[data[index + 2]];
    } else if (data[index] === 99) return data;
  }

  return data;
};

executeInstructions(parsedData);

console.log(parsedData[0]);
