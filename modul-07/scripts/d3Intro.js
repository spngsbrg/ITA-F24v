let dataset = [1, 2, 3, 4, 5];

d3.select("#data")
  .selectAll("p")
  .data(dataset)
  .enter()
  .append("p")
  .text(function (d) {
    return d;
  });
