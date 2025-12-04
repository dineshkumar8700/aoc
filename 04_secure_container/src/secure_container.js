const range = Deno.readTextFileSync("./data/input.txt").split("-");
const [lower, upper] = range.map((x) => parseInt(x));

const isValidNumber = (number) => {
  const strNum = "" + number;
  const frequency = {};

  for (let i = 0; i < strNum.length; i++) {
    if (parseInt(strNum[i]) > parseInt(strNum[i + 1])) return false;

    frequency[strNum[i]] = frequency[strNum[i]] ? frequency[strNum[i]] += 1 : 1;
  }

  for (const key in frequency) {
    if (frequency[key] === 2) return true;
  }

  return false;
};

const getValidNumbers = (start, end) => {
  const validNumbers = [];

  for (let number = start; number < end; number++) {
    if (isValidNumber(number)) {
      validNumbers.push(number);
    }
  }

  return validNumbers;
};

const validPass = getValidNumbers(lower, upper);
console.log(validPass.length);
