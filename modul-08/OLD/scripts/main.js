document.write("<h1>Hello World</h1>");

const dataset = [
  [5, 20],
  [480, 90],
  [250, 50],
  [100, 33],
  [330, 95],
  [410, 12],
  [475, 44],
];
/*
//Udskriver: ?
console.log(dataset[0]);
//Udskriver: ?
console.log(dataset[0][0]);
//Udskriver: ?
console.log(dataset[1][0]);
//Udskriver: ?
console.log(dataset[3][1]);
//Udskriver: ?
console.log(dataset[4][1]);
*/
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
/*

//Kode der som sådan ikke kører som en samlet enhed, men fragmenter er brugt i undervisningen:

/*
const numbers = [5, 10, 2, 7, 12, 8];

let maxValue = d3.max(numbers);
let minValue = d3.min(numbers);
console.log(maxValue);
console.log(minValue);

//Width og height til et SVG-element
const w = 500;
const h = 100;

//'data' indeholder et sæt koordinater
const data = [
  [2, 5],
  [5, 15],
  [1, 10],
];

//Finde 'max' i 'data'
//- i dette tilfælde bruger vi y-værdierne
let max = d3.max(data, function (d) {
  return d[1];
});
console.log(max);

//Skala for x-aksen
const xScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, function (d) {
      return d[0];
    }),
  ])
  .range([0, w]);

//Skala for y-aksen
const yScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(data, function (d) {
      return d[1];
    }),
  ])
  .range([0, h]);
  */
