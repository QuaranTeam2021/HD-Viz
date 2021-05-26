/* istanbul ignore file */
const d3 = require('d3');

/**
 * Plot Scatterplot Matrix
 * @param {Array<Object>} data table-formed js-array 
 * @param {String} xAttr column to be plotted in x-axis
 * @param {String} yAttr column to be plotted in y-axis
 * @param {String} grouper grouping column
 * @param {String} idBox box to append
 */
const scatterPlot = function (data, xAttr, yAttr, grouper, idBox) {
  let x = d3.scaleLinear(),
    y = d3.scaleLinear();
    const svgHeight = 900,
      svgWidth = 900;
    let margin = { bottom: 30,
      left: 60,
      right: 30,
      top: 10 };

  const width = svgWidth - (margin.left + margin.right);
  const height = svgHeight - (margin.top + margin.bottom);
  let svg = d3.select(`#${idBox}`).append("svg");

  x.domain(d3.extent(data, d => d[xAttr])).range([0, width]);
  y.domain(d3.extent(data, d => d[yAttr])).range([height, 0]);
  // Add scale for each axis 
  let xScale = d3.scaleLinear().
    domain(d3.extent(data, d => d.culmen_length_mm)).
nice().
    range([margin.left, width - margin.right]);

  let yScale = d3.scaleLinear().
    domain(d3.extent(data, d => d.culmen_depth_mm)).
nice().
    range([height - margin.bottom, margin.top]);

  svg.classed("grafico", true).
      attr("width", width + margin.left + margin.right).
      attr("height", height + margin.top + margin.bottom).
      append("g").
      attr(
"transform",
        `translate(${margin.left},${margin.top})`
);


  let colors = d3.scaleOrdinal().
    domain(data.map(d => d[0])).
    range(d3.schemeCategory10);

  svg.append("g").
    attr("transform", `translate(${margin.left - 50},${height})`).
    call(d3.axisBottom(xScale));

  svg.append("g").
    attr("transform", `translate(${margin.left},0)`).
    call(d3.axisLeft(yScale));

   let tooltip = d3.select(`#${idBox}`).
   append("div").
   style("position", "absolute").
   style("z-index", "10").
   style("visibility", "hidden");

  const mousemove = (event, d) => tooltip.
      html(`The exact value of<br>this cell is: (${d[xAttr]}, ${d[yAttr]})`).
      style("top", `${event.pageY - 10}px`).
      style("left", `${event.pageX + 10}px`);
  const mouseover = () => tooltip.style("visibility", "visible");
  const mouseleave = () => tooltip.style("visibility", "hidden");
   
    // Add dots
  svg.append('g').
    selectAll("circle").
    data(data).
    join("circle").
    attr("cx", d => x(d[xAttr])).
    attr("cy", d => y(d[yAttr])).
    attr("r", 2).
    attr("fill", d => colors(d[grouper])).
			on("mouseover", mouseover).
      on("mouseleave", mouseleave).
			on("mousemove", mousemove);
}


exports.scatterPlot = scatterPlot;
