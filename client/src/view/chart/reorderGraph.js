/* istanbul ignore file */
const d3 = require('d3');

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
    case "group": return d3.range(n).sort((a, b) => d3.ascending(nodes[a].group, nodes[b].group));
    case "none":
    default: return d3.range(n);
  }
}
