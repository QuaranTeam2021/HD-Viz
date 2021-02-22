const d3 = require('d3');
const jsdom = require('jsdom');
const fs = require('fs');

// set the dimensions and margins of the graph
const scatterPlot = function (dataFile, isAPI) {
  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  let html_string = readHtmlFile('public/graph.html');
  let DOM = new jsdom.JSDOM(html_string);
  let document = svgDOM(DOM.window.document, width, height, margin);
  var svg = d3.select(document.body).select("svg");

  //Read the data
  dataFile = d3.csvFormatRows(dataFile);
  var data = d3.csvParseRows(dataFile);

  // Add X axis
  var x = d3.scaleLinear()
    .domain(d3.extent(data, d => +d[0]))
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(" + margin.left +"," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain(d3.extent(data, d => +d[1]))
    .range([height, 0]);
  svg.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d[0]) )
    .attr("cy", d => y(d[1]) )
    .attr("r", 10)
    .style("fill", "#69b3a2")

  // console.log(document.textContent);
  if(isAPI)
    return document.body.lastChild.outerHTML;
  else 
    return DOM.serialize();
}

module.exports = scatterPlot;

function svgDOM(document, width, height, margin) {
  // Setup DOM
    let body = d3.select(document.body);

  // Create svg node
  body.append("svg")
      .classed("grafico", true)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
  return document;
}

function readHtmlFile(path) {
  return fs.readFileSync(path, 'utf8').toString();
}