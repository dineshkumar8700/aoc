const compass = {
  R: [1, 0],
  L: [-1, 0],
  U: [0, 1],
  D: [0, -1],
};

const getPoints = (instuctions) => {
  const points = [];
  let [x, y] = [0, 0];

  instuctions.split(",").map((insturction) => {
    "*".repeat(parseInt(insturction.slice(1))).split("")
      .map((z) => {
        const [a, b] = compass[insturction[0]];
        x += a;
        y += b;
        points.push([x, y]);
      });
  });

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
  arr1.map((point1) => {
    arr2.map((point2) => {
      if (areEqual(point1, point2)) {
        commonsPoints.push(point1);
      }
    });
  });

  return commonsPoints;
};

const calculateDistance = (points) => {
  const origins = [0, 0];

  return Math.abs(origins[0] - points[0]) +
    Math.abs(origins[1] - points[1]);
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

const main = () => {
  // const wire1 = "R8,U5,L5,D3";
  // const wire2 = "U7,R6,D4,L4";
  const [wire1, wire2] = Deno.readTextFileSync("./data/input.txt").split("\n");
  const wire1Points = getPoints(wire1);
  const wire2Points = getPoints(wire2);
  const commonPoints = getCommonPoints(wire1Points, wire2Points);

  console.log(getShortestPoints(commonPoints));
};

main();
