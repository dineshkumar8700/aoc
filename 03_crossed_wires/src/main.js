const compass = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
};

const getPoints = (instructions) => {
  const points = [];
  let [x, y, moves] = [0, 0, 0];

  instructions.split(",").map((instruction) => {
    "*".repeat(parseInt(instruction.slice(1))).split("")
      .map(() => {
        const [a, b] = compass[instruction[0]];
        x += a;
        y += b;
        moves++;
        points.push([x, y, moves]);
      });
  });

  return points;
};

const areEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length - 1; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

const getCommonPoints = (arr1, arr2) => {
  const commonPoints = [];
  arr1.map((point1) => {
    arr2.map((point2) => {
      if (areEqual(point1, point2)) {
        commonPoints.push([...point1, ...point2]);
      }
    });
  });

  return commonPoints;
};

const calculateDistance = (points) => {
  const [x1, y1] = [0, 0];
  const [x2, y2] = points;

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const getShortestPoints = (points) => {
  let shortestDistance = Infinity;

  points.map((point) => {
    const currentDistance = calculateDistance(point);
    if (currentDistance <= shortestDistance) {
      shortestDistance = currentDistance;
    }
  });

  return shortestDistance;
};

const getClosestIntersection = (commonPoints) => {
  let closestDistance = Infinity;

  commonPoints.map((point) => {
    if (closestDistance >= point[2] + point[5]) {
      closestDistance = point[2] + point[5];
    }
  });

  return closestDistance;
};

const main = () => {
  // const wire1 = "R8,U5,L5,D3";
  // const wire2 = "U7,R6,D4,L4";
  const [wire1, wire2] = Deno.readTextFileSync("./data/input.txt").split("\n");
  const wire1Points = getPoints(wire1);
  const wire2Points = getPoints(wire2);
  // console.log("Wire 1 Points", wire1Points);
  // console.log("Wire 2 Points", wire2Points);
  const commonPoints = getCommonPoints(wire1Points, wire2Points);
  // console.log("Common Points", commonPoints);

  console.log(getShortestPoints(commonPoints));
  const closest = getClosestIntersection(commonPoints);
  console.log("Least moves", closest);
};

main();
