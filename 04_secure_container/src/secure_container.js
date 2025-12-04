const range = Deno.readTextFileSync("./data/input.txt").split("-");
const [lower, upper] = range.map((x) => parseInt(x));

const isValidNumber = (number) => {
  const strNum = "" + number;
  let areTwoDigitsSame = false;

  for (let i = 0; i < strNum.length - 1; i++) {
    if (parseInt(strNum[i]) > parseInt(strNum[i + 1])) return false;

    if (strNum[i] === strNum[i + 1]) {
      areTwoDigitsSame = true;
    }
  }

  return areTwoDigitsSame;
};

const getValidNumbers = (start, end) => {
  const validPasswords = [];

  for (let number = start; number < end; number++) {
    if (isValidNumber(number)) {
      validPasswords.push(number);
    }
  }

  return validPasswords;
};

const validPass = getValidNumbers(lower, upper);
console.log(validPass.length);
