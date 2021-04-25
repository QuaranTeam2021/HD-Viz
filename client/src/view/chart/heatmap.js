/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-mixed-operators */
/* eslint-disable operator-assignment */
const d3 = require('d3');

/**
 * Plot an heatmap of distance-matrix
 * @param {Array<Object>} data graph-formed json array
 * @param {String} idBox box to append
 * @return { {SVGSVGElement, function} } DOM tree of the graph,
				to be attached to an element.
 */

export const heatmap = function (data, idBox) {
  let graph = data;
  const margin = { bottom: 10,
      left: 80,
      right: 0,
      top: 80 };
  const width = 720;
  const height = 720;

  const nodeIds = d3.range(graph.nodes.length);
  const c = d3.scaleOrdinal(d3.range(10), d3.schemeCategory10),
    x = d3
    .scaleBand()
    .domain(nodeIds)
    .range([0, width]);

  const svg = d3
    .select(`#${idBox}`)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  g.append("rect")
    .style("fill", "rgb(249, 247, 251)")
    .attr("width", width)
    .attr("height", height);
    
    let idToNode = {};
    graph.nodes.forEach((n, i) => {
        idToNode[n.id] = n;
        n.index = i;
      })
    const matrix = graph.links
    .flatMap(function ({ source, target, value }) {
      const src = idToNode[source],
      tgt = idToNode[target];
      return [
        [src, tgt, value],
        [tgt, src, value]
      ]
    }).concat(graph.nodes.map(n => [n, n, 0]));
  
    const distanceColor = d3.scaleSequential(d3.interpolatePurples)
        .domain(d3.extent(matrix, ([, , v]) => v));
    const labels = g
    .append("g")
    .style("font-size", "7px")
    .style("font-family", "sans-serif");

  const columns = labels
    .append("g")
    .selectAll()
    .data(nodeIds)
    .join("g")
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
    .text(i => graph.nodes[i].id);

  const rows = labels
    .append("g")
    .selectAll()
    .data(nodeIds)
    .join("g");
  rows
    .append("line")
    .attr("x2", width)
    .style("stroke", "white");
  rows
    .append("text")
    .attr("text-anchor", "end")
    .attr("dx", -2)
    .attr("dy", x.bandwidth() / 2 + 2)
    .text(i => graph.nodes[i].id);
  
    const rects = g
    .append("g")
    .attr("transform", "translate(1,1)")
    .selectAll()
    .data(matrix)
    .join("rect")
    .attr("width", x.bandwidth() - 2)
    .attr("height", x.bandwidth() - 2)
    // eslint-disable-next-line no-confusing-arrow
    .attr("fill", ([s, t, v]) => s.index === t.index
        ? c(s.group)
        : distanceColor(v));

    /* for animated transitions:
       let prev; */
    
    update(nodeIds);
    // eslint-disable-next-line func-style
    function update(permutation) {
      
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
  return Object.assign(svg.node(), { update }, { updateThreshold });
}

/**
 * Reorder a distance-matrix
 * @param {Object} data graph-formed json array
 * @param {String} mode type of sorting desired
 * @return { Array<number> } ordering of node index.
 */
export const orders = (graph, mode) => {
  const n = graph.nodes.length;
  switch (mode) {
    case "id": return d3.range(n).sort((a, b) => d3.ascending(graph.nodes[a].id, graph.nodes[b].id));
    case "group": return d3.range(n).sort((a, b) => d3.ascending(graph.nodes[a].group, graph.nodes[b].group) ||
        d3.ascending(graph.nodes[a].id, graph.nodes[b].id));
    case "none":
    default: return d3.range(n);
  }
}
