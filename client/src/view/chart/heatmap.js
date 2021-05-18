/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-mixed-operators */
/* eslint-disable operator-assignment */
const d3 = require('d3');
import { drawLegend} from './drawLegend'

/**
 * Plot an heatmap of distance-matrix
 * @param {Array<Object>} data graph-formed json array
 * @param {String} idBox box to append
 * @return { {SVGSVGElement, function} } DOM tree of the graph,
				to be attached to an element.
 */

export const heatmap = function (data, idBox) {
  const margin = { bottom: 10,
      left: 80,
      right: 0,
      top: 80 };
  const width = 720;
  const height = 720;

  // let nodeIds = d3.range(graph.nodes.length);
  const c = d3.scaleOrdinal(d3.range(10), d3.schemeCategory10);

  /* let x = d3
       .scaleBand()
       .domain(nodeIds)
       .range([0, width]); */

  const svg = d3
    .select(`#${idBox}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("rect")
    .style("fill", "white")
    .attr("width", width)
    .attr("height", height);
  const rectHandler = g.append("g").attr("transform", "translate(1,1)");

  let columns, rects, rows;
  let x = d3.scaleBand();

  const labels = g
    .append("g")
    .style("font-size", "7px")
    .style("font-family", "sans-serif")
    .append("g")
    .classed("columns-handler", true)
    .append("g")
    .classed("rows-handler", true);


  updateData(data)
  
  // eslint-disable-next-line func-style
  function updateData({nodes, links}) {
    const categories = [...new Set(nodes.map(item => item.group))]; 
		svg.selectAll(".legend").remove();
    let nodeIds = d3.range(nodes.length);


    x.domain(nodeIds)
      .range([0, width]);
    
    let idToNode = {};
    nodes.forEach((n, i) => {
        idToNode[n.id] = n;
        n.index = i;
      })
    const matrix = links
      .flatMap(function ({ source, target, value }) {
        const src = idToNode[source],
         tgt = idToNode[target];
        return [
          [src, tgt, value],
          [tgt, src, value]
        ]
      }).concat(nodes.map(n => [n, n, 0]));
    
    const distanceColor = d3.scaleSequential(d3.interpolatePurples)
      .domain(d3.extent(matrix, ([, , v]) => v));

    labels.selectAll(".col").remove();
    labels.selectAll(".row").remove();
    
    let colNames = labels
      .selectAll(".column")
      .data(nodeIds);
  
    columns = colNames
      .join("g")
      .classed("col", true)
      .attr("transform", "rotate(-90)")
      .append("g");
    columns
      .append("line")
      .attr("x2", -width)
      .style("stroke", "white");
    columns
      .append("text")
      .attr("dx", 2)
      .attr("dy", x.bandwidth() / 2 + 2)
      .text(i => nodes[i].id);
    
    rows = labels
      .selectAll()
      .data(nodeIds)
      .join("g")
      .classed("row", true);
    rows
      .append("line")
      .attr("x2", width)
      .style("stroke", "white");
    rows
      .append("text")
      .attr("text-anchor", "end")
      .attr("dx", -2)
      .attr("dy", x.bandwidth() / 2 + 2)
      .text(i => nodes[i].id);
    
    rects = rectHandler
      .selectAll("rect")
      .data(matrix)
      .join("rect")
      .attr("width", x.bandwidth() - 2)
      .attr("height", x.bandwidth() - 2)
      // eslint-disable-next-line no-confusing-arrow
      .attr("fill", ([s, t, v]) => s.index === t.index
          ? c(s.group)
          : distanceColor(v));
        
    drawLegend(svg, categories, width);
    
    /* for animated transitions:
       let prev; */
    
    updateOrder(nodeIds);
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
      .attr("x", ([s]) => x(s.index))
      .attr("y", ([, t]) => x(t.index));

    /* for animated transitions:
       prev = permutation; */
    return permutation;
  }
  // eslint-disable-next-line func-style
  function updateThreshold(threshold) {
    rects
      .filter(d => d[2] < threshold && d[0].index !== d[1].index)
      .attr("fill", "rgb(249, 247, 251)");
    }

  /* add zoom capabilities
     let zoomHandler = d3.zoom()
       .on("zoom", ({ transform }) => g.attr("transform", transform)); */

  // // zoomHandler(svg);
  return Object.assign(svg.node(), { updateOrder }, { updateThreshold }, {updateData});
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
