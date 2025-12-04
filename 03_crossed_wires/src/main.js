const centre = { x: 0, y: 0 };
const intersection = { x: 3, y: 3 };

const distance = Math.abs(centre.x - intersection.x) +
  Math.abs(centre.y - intersection.y);

console.log(distance);

const getCommonPoints = (obj1, obj2) => {
  for (const point of obj1) {
    for (const [key, value] of Object.entries(point)) {
      console.log(key, value)
    }
  }
}

const obj1 = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, {
  x: 3,
  y: 1,
}, { x: 3, y: 2 }];

const obj2 = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, {
  x: 2,
  y: 2,
}, { x: 3, y: 2 }];
