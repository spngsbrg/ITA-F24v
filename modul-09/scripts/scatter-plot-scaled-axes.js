// Width og height til SVG-elementet
const w = 700;
const h = 300;

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
  /**
   * Sidste gang gik vi blot ud fra 0,0 i øverste venstre hjørne for y-værdierne også
   * det betød at de blev tegnet oppefra og ned, så vi måtte trække dem fra h
   * for at få dem flyttet ned. Ved at bytte om på rækkefølgen af de to tal i range
   * kan vi få dem til at blive tegnet nedefra og op.
   * Dette skrev vi sidste gang: .range([30, h - 30])
   * Dette skriver vi nu:
   **/
  .range([h - 30, 30])
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
    /**
     * Anden værdi i indre array (y)  - som scales med vores yScale
     * Den gamle måde for at få dem flyttet ned var jo at trække værdien fra h
     * på denne måde: return yScale(h - d[1]);
     * Nu er den del flyttet til scale-funktionen, så vi kan bare skrive:
     **/
    return yScale(d[1]);
  })
  // Radius er sat til at være kvadratroden af y-værdien
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
    /**
     * Som med de andre tilfælde, hvor y-værdien skal bruges, skal vi rette koden til
     * den nye virkelighed.
     * Sidste gang skrev vi: return yScale(h - d[1]) - 5;
     * Nu skriver vi:
     **/
    return yScale(d[1]) - 5;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "red");

/** --- Akser: --- */

// Definere akserne til x og y (læg mærke til de to typer!):
const xAxis = d3.axisBottom().scale(xScale).ticks(5);
const yAxis = d3.axisLeft().scale(yScale).ticks(5);

//Lægge akserne til SVG-elementet:

svg
  //Først laves en svg-group med "g"
  .append("g")
  //Så flyttes den til bunden af grafen
  .attr("transform", "translate(0," + (h - 30) + ")")
  //Magi som får akserne til at blive tegnet
  .call(xAxis);

svg
  .append("g")
  .attr("transform", "translate(" + 30 + ",0)")
  .call(yAxis);

/**
 * Bonusopgave: Er der en værdi, som vi med fordel kan gemme i en variabel i dette eksempel?
 **/
