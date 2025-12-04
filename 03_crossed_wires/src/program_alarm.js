const getPoints = (instuctions) => {
  const points = [];
  let x = 0;
  let y = 0;

  const instructionsArray = instuctions.split(",");
  for (let i = 0; i < instructionsArray.length; i++) {
    if (instructionsArray[i][0] === "R") {
      for (let j = 0; j < parseInt(instructionsArray[i].slice(1)); j++) {
        x += 1;
        points.push([x, y]);
      }
    }
    if (instructionsArray[i][0] === "L") {
      for (let j = 0; j < parseInt(instructionsArray[i].slice(1)); j++) {
        x -= 1;
        points.push([x, y]);
      }
    }
    if (instructionsArray[i][0] === "U") {
      for (let j = 0; j < parseInt(instructionsArray[i].slice(1)); j++) {
        y += 1;
        points.push([x, y]);
      }
    }
    if (instructionsArray[i][0] === "D") {
      for (let j = 0; j < parseInt(instructionsArray[i].slice(1)); j++) {
        y -= 1;
        points.push([x, y]);
      }
    }
  }

  return points;
};

const areEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

const getCommonPoints = (arr1, arr2) => {
  const commonsPoints = [];

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (areEqual(arr1[i], arr2[j])) {
        commonsPoints.push(arr1[i]);
        break;
      }
    }
  }

  return commonsPoints;
};

const calculateDistance = (points) => {
  const origins = [0, 0];

  return Math.abs(origins[0] - points[0]) +
    Math.abs(origins[1] - points[1]);
};

const getShortestPoints = (points) => {
  let shortestDistance = Infinity;

  for (let i = 0; i < points.length; i++) {
    const currentPointsDistance = calculateDistance(points[i]);
    if (currentPointsDistance <= shortestDistance) {
      shortestDistance = currentPointsDistance;
    }
  }

  return shortestDistance;
};

// const wire1 = "R4,U3,L4";
// const wire2 = "R3,U5,L1,D3";

const [wire1, wire2] = Deno.readTextFileSync("./data/input.txt").split("\n");

const wire1Points = getPoints(wire1);
const wire2Points = getPoints(wire2);
// console.log(wire1Points)
console.log(wire2Points);

const commonsPoints = getCommonPoints(wire1Points, wire2Points);
console.log(commonsPoints);

console.log(getShortestPoints(commonsPoints));
