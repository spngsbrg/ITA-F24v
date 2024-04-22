//Manuel mapping
function mapping(inputValue) {
  return (inputValue / 1000) * 300;
}

console.log("Manual mapping of 1000: " + mapping(1000));
console.log("Manual mapping of 500: " + mapping(500));
console.log("Manual mapping of 50: " + mapping(50));

//D3 mapping 'input'-domain til 'output'-range
const scale = d3.scaleLinear().domain([0, 1000]).range([0, 300]);

console.log("Scale mapping of 1000: " + scale(1000));
console.log("Scale mapping of 500: " + scale(500));
console.log("Scale mapping of 50: " + scale(50));

const numbers = [5, 10, 2, 7, 12, 8];

let maxValue = d3.max(numbers);
let minValue = d3.min(numbers);
console.log(maxValue);
console.log(minValue);

//Width og height til et SVG-element
const w = 500;
const h = 100;

//Skala for x-aksen
const xScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(numbers, function (d) {
      return d;
    }),
  ])
  .range([0, w]);

//Skala for y-aksen
const yScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(numbers, function (d) {
      return d;
    }),
  ])
  .range([0, h]);
