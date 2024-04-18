// Width og height til SVG-elementet
const w = 500;
const h = 100;

const dataset = [
  [5, 20],
  [480, 90],
  [250, 50],
  [100, 33],
  [330, 95],
  [410, 12],
  [475, 44],
];

//SVG-elementet
const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

//Skala for x-aksen
const xScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(dataset, function (d) {
      return d[0];
    }),
  ])
  .range([30, w - 30])
  .nice();

//Skala for y-aksen
const yScale = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(dataset, function (d) {
      return d[1];
    }),
  ])
  .range([30, h - 30])
  .nice();

//Scatter plot
svg
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  //'d' et element i 'dataset', som selv er et array med x,y koordinater
  .attr("cx", function (d) {
    //Første værdi i indre array (x) - som scales med vores xScale
    return xScale(d[0]);
  })
  .attr("cy", function (d) {
    //Anden værdi i indre array (y)  - som scales med vores yScale
    return yScale(h - d[1]);
  })
  // Radius er ny sat til at være kvadratroden af y-værdien
  .attr("r", function (d) {
    return Math.sqrt(d[1]);
  });

//Labels
svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function (d) {
    return d[1];
  })
  .attr("x", function (d) {
    return xScale(d[0]) + 5;
  })
  .attr("y", function (d) {
    return yScale(h - d[1]) - 5;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "red");
