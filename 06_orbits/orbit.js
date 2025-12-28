const smallInput = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

const orbitCount = (input) => {
  // const indexOfCom = input.indexOf("COM");

  const distances = {
    "COM": 0,
  };

  for (let index = 0; index < input.length; index++) {
    const [first, second] = input[index].split(")");

    if (distances[first] >= 0) {
      distances[second] = distances[first] + 1;
    }
  }
  return distances;
};

const parseInput = (input) => input.split("\n");

const sumOfAllDistance = (distances) => {
  const result = Object.values(distances).reduce((sum, num) => sum + num);
  return result;
};

const main = (input) => {
  const parsedInput = parseInput(input);
  const distanceLookup = orbitCount(parsedInput);
  const distance = sumOfAllDistance(distanceLookup);

  console.log(distance);
};

main(smallInput);
