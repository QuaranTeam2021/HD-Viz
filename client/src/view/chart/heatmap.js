/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-mixed-operators */
/* eslint-disable operator-assignment */
const d3 = require('d3');
import { drawLegend } from './drawLegend'

/**
 * Plot an heatmap of distance-matrix
 * @param {Array<Object>} data graph-formed json array
 * @param {String} idBox box to append
 * @return { {SVGSVGElement, function} } DOM tree of the graph,
				to be attached to an element.
 */

export const heatmap = function (data, idBox) {
  const margin = { bottom: 10,
      left: 50,
      right: 0,
      top: 50 };
  const width = 650;
  const height = 650;

  // let nodeIds = d3.range(graph.nodes.length);
  const c = d3.scaleOrdinal(d3.range(10), d3.schemeCategory10);

  /* let x = d3
       .scaleBand()
       .domain(nodeIds)
       .range([0, width]); */

  const svg = d3
    .select(`#${idBox}`)
    .append("svg")
    .classed("grafico", true)
    .classed("heatmap", true)
    .attr("viewBox", [0, 0, width + margin.left, height + margin.top])
    .attr("width", width + margin.left + margin.right);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("rect")
    .style("fill", "white")
    .attr("stroke", "#000000")
    .attr("stroke-width", "0.5")
    .attr("width", width)
    .attr("height", height);
  const rectHandler = g.append("g");

  rectHandler.append("style")
    .text(`.rect-handler>rect { stroke: #d62333; stroke-width: 0px; } .rect-handler>rect:hover { stroke-width: 1px; }`);
  rectHandler.classed("rect-handler", true);

  let columns, rects, rows;
  let x = d3.scaleBand();

  let labelsHandler = g
    .append("g")
    .style("font-family", "sans-serif");
  let columnsHandler = labelsHandler
    .append("g")
    .classed("columns-handler", true)
    .attr("transform", "translate(0.5, 0)");

  let rowsHandler = labelsHandler
    .append("g")
    .classed("rows-handler", true)
    .attr("transform", "translate(0, 0.5)");

  let matrix;
  let distanceColor;
  let nodeIds;
  let fontSize;
  updateData(data)
  
  // eslint-disable-next-line func-style
  function updateData({nodes, links}) {
    const categories = [...new Set(nodes.map(item => item.group))]; 
		svg.selectAll(".legend").remove();
    nodeIds = d3.range(nodes.length);


    x.domain(nodeIds)
      .range([0, width]);
    
    let idToNode = {};
    nodes.forEach((n, i) => {
        idToNode[n.id] = n;
        n.index = i;
      })
    matrix = links
      .flatMap(function ({ source, target, value }) {
        const src = idToNode[source],
         tgt = idToNode[target];
        return [
          [src, tgt, value],
          [tgt, src, value]
        ]
      }).concat(nodes.map(n => [n, n, 0]));
    
    distanceColor = d3.scaleSequential(d3.interpolatePurples)
      .domain(d3.extent(matrix, ([, , v]) => v));
      
    columnsHandler.selectAll("g").remove();
    rowsHandler.selectAll("g").remove();
    fontSize = x.bandwidth() > 8 ? 8 : x.bandwidth().toFixed(1);
    labelsHandler.style("font-size", `${fontSize}px`)

    let colNames = columnsHandler
      .selectAll(".column")
      .data(nodeIds);
  
    columns = colNames
      .join("g")
      .attr("transform", "rotate(-90)")
      .append("g");

    columns
      .append("text")
      .attr("dx", 2)
      .attr("dy", x.bandwidth() / 2)
      .text(i => nodes[i].id);
    
    rows = rowsHandler
      .selectAll()
      .data(nodeIds)
      .join("g");

    rows
      .append("text")
      .attr("text-anchor", "end")
      .attr("dx", -2)
      .attr("dy", x.bandwidth() / 2)
      .text(i => nodes[i].id);

    updateThreshold(0);
        
    drawLegend(svg, categories, width);
    
    /* for animated transitions:
       let prev; */
    
  }
    // eslint-disable-next-line func-style
  function updateOrder(permutation) {
      
    x.domain(permutation);

    /* for animated transitions:
       const delay = prev ? i => x(i) * 4 : 0;
       const delay2 = prev ? ([i]) => x(i) * 4 : 0;
       const duration = prev ? 1000 : 0; */
    const delay = 0;
    const delay2 = 0;
    const duration = 0;
    
    const highlight = d => {

      const colIndex = d.target.__data__[0].index;
      const rowIndex = d.target.__data__[1].index;

      d3.select(columns.nodes()[colIndex])
          .style('fill', '#d62333')
          .style('font-weight', 'bold')
          .style('font-size', `${fontSize < 3 ? 2.5 * fontSize : 1.2 * fontSize}px`);

      d3.select(rows.nodes()[rowIndex])
          .style('fill', '#d62333')
          .style('font-weight', 'bold')
          .style('font-size', `${fontSize < 3 ? 2.5 * fontSize : 1.2 * fontSize}px`);
  }


    columns
      .transition()
      .delay(delay)
      .duration(duration)
      .attr("transform", i => `translate(0, ${x(i)})`);
    rows
      .transition()
      .delay(delay)
      .duration(duration)
      .attr("transform", i => `translate(0, ${x(i)})`);
    rects
      .transition()
      .delay(delay2)
      .duration(duration)
      .attr("x", d => x(d[0].index))
      .attr("y", d => x(d[1].index));
    rects
      .on("mouseover", highlight)
      .on('mouseout', function () {
        rows
          .style('fill', null)
          .style('font-size', `${fontSize}px`)
          .style('font-weight', null);
        columns
          .style('fill', null)
          .style('font-size', `${fontSize}px`)
          .style('font-weight', null);

      })

    /* for animated transitions:
       prev = permutation; */
       console.log(rows.filter);
    return permutation;
  }

  // eslint-disable-next-line func-style
  function getMin() {
    return d3.min(data.links, d => d.value);
  }
  
  // eslint-disable-next-line func-style
  function getMax() {
    return d3.max(data.links, d => d.value);
  }

  // eslint-disable-next-line func-style
  function updateThreshold(threshold) {
    rects = rectHandler
      .selectAll("rect")
      .data(matrix.filter(l => l[2] >= threshold || l[0] === l[1]))
      .join("rect")
      .attr("width", x.bandwidth())
      .attr("height", x.bandwidth())
      // eslint-disable-next-line no-confusing-arrow
      .attr("fill", function ([s, t, v]) {
          return s.index === t.index
            ? c(s.group)
            : distanceColor(v);
        });
        updateOrder(nodeIds);
    }

  /*  add zoom capabilities
       let zoomHandler = d3.zoom()
         .on("zoom", ({ transform }) => g.attr("transform", transform)); */

    // zoomHandler(svg);
  return Object.assign(
    svg.node(),
    {getMax},
    {getMin},
    {updateData},
    {updateOrder},
    {updateThreshold}
  );
}

/**
 * Reorder a distance-matrix
 * @param {Object} data graph-formed json array
 * @param {String} mode type of sorting desired
 * @return { Array<number> } ordering of node index.
 */
// eslint-disable-next-line no-unused-vars
export const orders = ({nodes, links}, mode) => {
  const n = nodes.length;
  switch (mode) {
    case "id": return d3.range(n).sort((a, b) => d3.ascending(nodes[a].id, nodes[b].id));
    case "group": return d3.range(n).sort((a, b) => d3.ascending(nodes[a].group, nodes[b].group) ||
        d3.ascending(nodes[a].id, nodes[b].id));
    case "none":
    default: return d3.range(n);
  }
}
