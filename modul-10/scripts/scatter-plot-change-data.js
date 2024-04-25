// Width og height til SVG-elementet
const w = 700;
const h = 300;

//De tre datasæt, vi kan vælge imellem - Bemærk at de har samme længde, hvilket gør det nemmere at animere. I dette tilfælde behøver vi blot at opdatere de eksisterende cirkler og labels, da der ikke er kommet flere til.
const dataset1 = [
  [5, 20],
  [480, 90],
  [250, 50],
  [100, 33],
  [330, 95],
  [410, 12],
  [475, 44],
];
const dataset2 = [
  [10, 10],
  [200, 90],
  [200, 20],
  [120, 13],
  [350, 75],
  [210, 42],
  [275, 34],
];
const dataset3 = [
  [350, 20],
  [30, 90],
  [10, 50],
  [105, 31],
  [230, 295],
  [110, 112],
  [375, 84],
];

//Skala for x-aksen
let xScale = null;

//Skala for y-aksen
let yScale = null;

//Akser
let xAxis = null;
let yAxis = null;

//SVG-elementet
let svg = null;

//Kald til init-funktionen med datasæt1, h og w som argumenter for at konstruere det første scatter plot
init(dataset1, w, h);

// Læg en eventlistener på alle knapper - koden i callback funktionen køres når der klikkes på en knap
d3.selectAll("#data1, #data2, #data3").on("click", function (e) {
  // Find hvilken knap der blev trykket på
  let id = e.target.id;
  console.log(id);

  // Vælg det rigtige datasæt
  let newData = dataset1;
  if (id === "data2") {
    newData = dataset2;
  } else if (id === "data3") {
    newData = dataset3;
  }

  // Kald animateNewData med det nye datasæt
  animateNewData(newData);
});

//Hjælpefunktioner som sætter de dynamiske data som skal bruges til at lave scales og akser
function createScaleX(dataset) {
  return d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataset, function (d) {
        return d[0];
      }),
    ])
    .range([30, w - 30])
    .nice();
}

function createScaleY(dataset) {
  return d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataset, function (d) {
        return d[1];
      }),
    ])
    .range([h - 30, 30])
    .nice();
}

function createAxisX(yScale) {
  return d3.axisBottom().scale(yScale).ticks(5);
}
function createAxisY(xScale) {
  return d3.axisLeft().scale(xScale).ticks(5);
}

function addSVG(svgWidth, svgHeight) {
  return d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
}

//Denne funktion sætter de dynamiske værdier som skal bruges til at lave scales og akser
function setUp(dataset) {
  console.log("setUp with dataset: " + dataset);
  yScale = createScaleY(dataset);
  xScale = createScaleX(dataset);
  xAxis = createAxisX(xScale);
  yAxis = createAxisY(yScale);
}

//Denne funktion kaldes kun en gang når siden indlæses, den sørger for at sætte de dynamiske værdier ved at kalde setUp og lave svg-elementet, samt at konstruere det første scatter plot
function init(dataset, svgWidth, svgHeight) {
  console.log("init");
  setUp(dataset);
  svg = addSVG(svgWidth, svgHeight);

  //Scatter plot
  svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d[0]);
    })
    .attr("cy", function (d) {
      return yScale(d[1]);
    })
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
      return yScale(d[1]) - 5;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red");

  svg
    .append("g")
    .attr("transform", "translate(0," + (h - 30) + ")")
    .attr("id", "xAxis")
    .call(xAxis);

  svg
    .append("g")
    .attr("transform", "translate(" + 30 + ",0)")
    .attr("id", "yAxis")
    .call(yAxis);
}

function animateNewData(newData) {
  //Tilpas de dynamiske værdier til det nye datasæt i forhold til akserne
  setUp(newData);

  // Vælg cirkler
  svg
    .selectAll("circle")
    //Gør dette for hvert element i det nye datasæt
    .data(newData)
    //Start en animantion
    .transition()
    //Lad den vare 1500 ms
    .duration(1500)
    //Dette skal være slutresultatet på de enkelte attributter
    .attr("cx", function (d) {
      return xScale(d[0]);
    })
    .attr("cy", function (d) {
      return yScale(d[1]);
    })
    .attr("r", function (d) {
      return Math.sqrt(d[1]);
    });

  //Vælg labels
  svg
    .selectAll("text")
    //Gør dette for hvert element i det nye datasæt
    .data(newData)
    //Start en animantion
    .transition()
    //Lad den vare 1500 ms
    .duration(1500)
    //Dette skal være slutresultatet på de enkelte attributter
    .attr("x", function (d) {
      return xScale(d[0]) + 5;
    })
    .attr("y", function (d) {
      return yScale(d[1]) - 5;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "red")
    .text(function (d) {
      return d[1];
    });

  //Vælg x-aksen
  svg
    .select("#xAxis")
    //start en animation
    .transition()
    //Lad den vare 1500 ms
    .duration(1500)
    //Dette skal være slutresultatet: byg en ny x-akse med xAxis-variablen som er blevet opdateret, da vi kaldte setUp med det nye datasæt
    .call(xAxis);

  //Vælg x-aksen
  svg
    .select("#yAxis")
    //start en animation
    .transition()
    //Lad den vare 1500 ms
    .duration(1500)
    //Dette skal være slutresultatet: byg en ny y-akse med yAxis-variablen som er blevet opdateret, da vi kaldte setUp med det nye datasæt
    .call(yAxis);
}
