// Width og height til SVG-elementet
const w = 700;
const h = 300;

/**
 * De tre datasæt, vi kan vælge imellem - Bemærk at de IKKE har samme længde!
 * Dette gør det lidt mere omstændigt at animere.
 * Vi bliver vi nød til at tilføje / fjerne cirkler og labels som en del af animationen.
 * Det betyder at vi skal bruge enter() og exit().
 * */

const dataset1 = [
  [12, 12],
  [210, 71],
  [230, 55],
  [154, 31],
  [182, 74],
  [380, 19],
  [415, 44],
];
const dataset2 = [
  [10, 10],
  [170, 90],
  [180, 20],
  [120, 13],
  [319, 75],
  [232, 42],
  [271, 34],
  [127, 13],
  [134, 91],
];
const dataset3 = [
  [312, 23],
  [17, 19],
  [88, 88],
  [44, 44],
  [71, 10],
];

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
  updateAnimateLabels(newData);
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
  return (svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight));
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
    .attr("fill", "red")
    //Her tilføjes en class til labels, således at vi kan vælge dem senere og undgå at ændre på al tekst i svg'en
    .attr("class", "label");

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
  //Fordi data her skiftes ud med noget som ikke er lige så langt, så skal vi bruge enter og exit til at animere de nye punkter og fjerne de gamle. Det bliver langt at skrive i den samme funktion, så derfor er den delt op i eneklte dele her
  //Først tager vi fat i cirklerne
  animateUpdateCircles(newData);
  //Dernæst tager vi fat i labels
  updateAnimateLabels(newData);
  //Til sidst tager vi fat i akserne - der gør vi ligesom sidst
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

function animateUpdateCircles(newData) {
  // vælg alle cirkler og benyt det nye datasæt - denne gang gemmer vi det i en variabel, således at vi kan bruge den til at animere de nye punkter og sammenligne med de eksisterende
  let updateSelectionCirles = svg.selectAll("circle").data(newData);

  // Append circle og sæt attributter på de nye punkter som bliver deres startværdier - bemærk, de forholder sig ikke til deres reelle position endnu men alle får samme startværdier
  updateSelectionCirles
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return w / 2;
    })
    .attr("cy", function (d) {
      return h;
    })
    .attr("r", 1) // Starter på radius 1

    // Her flettes det nye punkt sammen med de gamle punkter
    .merge(updateSelectionCirles)
    //Alle punkter animeres nu
    .transition()
    //Vi venter 200 ms før animationen starter
    .delay(200)
    //Lad animationen vare 1500 ms
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

  // 'exit' bruges til at animere punkter der fjernes
  updateSelectionCirles
    .exit()
    .attr("fill", "darkred")
    .transition()
    .duration(400)
    .ease(d3.easeQuadOut)
    .attr("r", 20) // Cirklen gøres større
    .remove(); // 'circle' slettes
}

function updateAnimateLabels(newData) {
  //Vælg labels og gem dem i en variabel
  let updateSelectionLabels = svg.selectAll(".label").data(newData);

  // Append labels og sæt attributter på de nye labels som bliver deres startværdier - bemærk, de forholder sig ikke til deres reelle position endnu men alle får samme startværdier
  updateSelectionLabels
    .enter()
    .append("text")
    .text(function (d) {
      return d[1];
    })
    .attr("cx", function (d) {
      return w / 2;
    })
    .attr("cy", function (d) {
      return h;
    })
    .attr("class", "label")

    // Her flettes de nye labels sammen med de gamle labels
    .merge(updateSelectionLabels)
    //Alle punkter animeres nu
    .transition()
    //Vi venter 200 ms før animationen starter
    .delay(200)
    //Lad animationen vare 1500 ms
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

  // 'exit' bruges til at animere punkter der fjernes
  updateSelectionLabels
    .exit()
    .transition()
    .duration(400)
    .ease(d3.easeQuadOut)
    .remove(); // label slettes
}
