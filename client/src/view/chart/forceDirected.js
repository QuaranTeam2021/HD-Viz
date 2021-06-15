/* istanbul ignore file */
/* eslint-disable func-names */
/* eslint-disable no-confusing-arrow */
/* eslint-disable func-style */
const d3 = require('d3');
import { tooltip, tooltipTemplate } from './tooltip';
import { drawLegend} from './drawLegend'

/**
 * Plot force-directed graph of an adiacency-matrix.
 * @param {Array<Object>} data graph-formed json array
 * @param {String} idBox box to append
 * @return {SVGSVGElement} DOM tree of the graph,
				to be attached to an element.
 */
export const forceDirected = function (data, idBox) {
	let nodes = data.nodes;
	let links = data.links;
	const height = 700;
	const width = 700;
	let max = -1;
	let min = Number.MAX_VALUE;
	let forceProperties = {
		distanceMax: 200,
		distanceMin: 0,
		enabled: true,
		strength: -30
	}
	const nodeRadius = 5;
	let linksOriginalCount = 0;
	let tooltipDiv = d3.select(`#${idBox}`)
		.append("div")
		.classed("tooltip", true);
	tooltipDiv.append("div")
		.classed("tooltip-contents", true);	
	tooltipDiv.call(tooltipTemplate);

	let svg = d3
		.select(`#${idBox}`)
		.append("svg")
		.classed("grafico", true)
		.classed("force-field", true)
		.attr("viewBox", [0, 0, width, height])
		.attr("width", width);
	let link,
		node,
		simulation;

	const g = svg
		.append("g")
		.attr("transform", `translate(0,0)`);
	const scale = d3.scaleOrdinal(d3.schemeCategory10);
	const linkHandler = g.append("g")
		.attr("stroke", "#999")
		.attr("stroke-opacity", 0.5);
	
	const nodeHandler = g.append("g")
		.attr("stroke", "#fff")
		.attr("stroke-width", 1.5);

	let legend;
	const scaleThickness = d3
			.scaleLinear()
			.domain([min, max])
			.range([0.5, nodeRadius - 1]);
	
	updateData(data);
	function updateData(newData) {
		nodes = newData.nodes;
		linksOriginalCount = newData.links.length;
		links = newData.links.filter(item => !isNaN(item.value));
		updateMaxMin();

		const categories = [...new Set(nodes.map(item => item.group))]; 
		nodes.forEach(el => {
			if (typeof el.fx !== "undefined") {
				el.fy = null; 
				el.fx = null;
			} });
		svg.selectAll(".legend").remove();
		legend = drawLegend(svg, categories, width);
		legend.drawDistanceTrapezoid(scaleThickness);
	
		node = nodeHandler
			.selectAll("circle")
			.data(nodes, d => d.id)
			.join("circle")
			.attr("r", nodeRadius)
			.attr("fill", d => scale(d.group))
			.call(tooltip, tooltipDiv);

		forceProperties.distanceMax = getMax();
		updateDistStr(forceProperties.distanceMin, forceProperties.distanceMax, forceProperties.strength);

	}
	function updateMaxMin() {
		max = Math.ceil(d3.max(links, d => d.value) * 100) / 100;
		min = Math.floor(d3.min(links, d => d.value) * 100) / 100;
	}
	function getMin() {
		if (min === Number.MAX_VALUE) {
			updateMaxMin();
		}
		return min;
	}
	
	function getMax() {
		if (max === -1) {
			updateMaxMin();
		}
		return max;
	}
	
	function updateStrength(strength) {
		forceProperties.strength = strength;
		simulation.stop();
		simulation.force("charge", d3.forceManyBody()
			.strength(forceProperties.strength * forceProperties.enabled));
		simulation.restart();
	}

	/**
	 * Update min & max distance and strength all toghether.
	 * Erase from visualization links \notin [@distanceMin,@distanceMax]
	 * Replace current simulation with a new one.
	 * @param{number} distanceMin min distance
	 * @param{number} distanceMax max distance
	 * @param{number} strength strength value in [-150, 50]
	 */
	function updateDistStr(distanceMin, distanceMax, strength) {
		forceProperties.distanceMin = distanceMin;
		forceProperties.distanceMax = distanceMax;
		forceProperties.strength = strength;
		const linksToShow = links.filter(l => l.value >= distanceMin && l.value <= distanceMax);
		link = linkHandler
			.selectAll("line")
			.data(linksToShow)
			.join("line");

		legend.clearMessageBoard();
		if (links.length - linksOriginalCount !== 0) {
			legend.displayMessage("warn! # of NaN links:");
			legend.displayMessage(`${linksOriginalCount - links.length}/${linksOriginalCount}`);
		}
		if (links.length > 0) {
			legend.displayMessage("# of links in range:");
			legend.displayMessage(`${linksToShow.length}/${links.length}`);
		}
		scaleThickness.domain([Math.max(getMin(), distanceMin), Math.min(getMax(), distanceMax)])
		legend.updateTicks(scaleThickness);
		link.attr("stroke-width", d => 4.5 - scaleThickness(d.value));
		if (simulation) {
			simulation.stop();
		}
		simulation = d3.forceSimulation(nodes)
			.force("link", d3.forceLink(linksToShow)
				.id(d => d.id)
				.distance(d => d.value))
			.force("charge", d3.forceManyBody()
				.strength(strength))
			.force("center", d3.forceCenter(width / 2, height / 2))
			.tick(40)
			.on("tick", () => {
				node
					// eslint-disable-next-line prefer-arrow-callback
					.attr("cx", function(d) { d.x = Math.max(nodeRadius, Math.min(width - nodeRadius, d.x)); 
						return d.x; })
					// eslint-disable-next-line prefer-arrow-callback
					.attr("cy", function(d) { d.y = Math.max(nodeRadius, Math.min(height - nodeRadius, d.y)); 
						return d.y; })
					.attr("stroke", d => d.fx ? "#333" : "#fff");
				link
					.attr("x1", d => d.source.x)
					.attr("y1", d => d.source.y)
					.attr("x2", d => d.target.x)
					.attr("y2", d => d.target.y);
					// .attr("stroke", d => d.source.fx || d.source.fy || d.target.fx || d.target.fy ? "#101010" : "#999999");			
			})			
		node
			.call(drag(simulation, tooltipDiv));
		simulation.restart();
	}
	
	return Object.assign(svg.node(), { 
		getMax,
		getMin,
		updateData,
		updateDistStr,
		updateStrength
	});
}
const drag = (sim, tooltipDiv) => {
	// eslint-disable-next-line no-undef
	const dragstarted = function(event) {
		tooltipDiv.style("opacity", 0);
		if (!event.active) {
			sim.alphaTarget(0.3).restart();
		}
		// eslint-disable-next-line no-negated-condition
		if (!event.subject.fx) {
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		} 
		else {
			event.subject.fx = null;
			event.subject.fy = null;
		}
	}
	
	const dragged = function(event) {
		event.subject.fx = event.x;
		event.subject.fy = event.y;
	}
	
	const dragended = function(event) {
		tooltipDiv.style("opacity", 1);
		if (!event.active) {
			sim.alphaTarget(0);
		}
	}
	
	return d3.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended);
};
