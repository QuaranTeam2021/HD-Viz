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
	const height = 600;
	const width = 600;
	let forceProperties = {
		charge: {
			distanceMax: 200,
			distanceMin: 0,
			enabled: true,
			strength: -30
		}
	}
	const nodeRadius = 5;

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
		.attr("stroke-opacity", 0.6);
	
	const nodeHandler = g.append("g")
		.attr("stroke", "#fff")
		.attr("stroke-width", 1.5);

	const [minDist, maxVal] = [getMin(), getMax()];
	let legend;
	const scaleThickness = d3
			.scaleLinear()
			.domain([minDist, maxVal])
			.range([0.5, nodeRadius]);
	
	updateData(data);
	function updateData(newData) {
		nodes = newData.nodes;
		links = newData.links;
		const categories = [...new Set(nodes.map(item => item.group))]; 
	
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


		updateDistStr(forceProperties.charge.distanceMin, forceProperties.charge.distanceMax, forceProperties.charge.strength);

	}

	function getMin() {
		return Math.floor(d3.min(links, d => d.value) * 100) / 100;
	}
	
	function getMax() {
		return Math.ceil(d3.max(links, d => d.value) * 100) / 100;
	}
	
	function updateStrength(strength) {
		forceProperties.charge.strength = strength;
		simulation.stop();
		simulation.force("charge", d3.forceManyBody()
			.strength(forceProperties.charge.strength * forceProperties.charge.enabled));
		simulation.restart();
	}
	
	function updateDistStr(distanceMin, distanceMax, strength) {
		forceProperties.charge.distanceMin = distanceMin;
		forceProperties.charge.distanceMax = distanceMax;
		forceProperties.charge.strength = strength;
		const linksToShow = links.filter(l => l.value >= distanceMin && l.value <= distanceMax);
		link = linkHandler
			.selectAll("line")
			.data(linksToShow)
			.join("line");
		
		scaleThickness.domain([Math.max(getMin(), distanceMin), Math.min(getMax(), distanceMax)])
		legend.updateTicks(scaleThickness);
		link.attr("stroke-width", d => 5.5 - scaleThickness(d.value));
		
		if (simulation) simulation.stop();
		simulation = d3.forceSimulation(nodes)
			.force("link", d3.forceLink(linksToShow)
				.id(d => d.id)
				.distance(d => d.value))
			.force("charge", d3.forceManyBody()
				.strength(strength))
			.force("center", d3.forceCenter(width / 2, height / 2))
			.tick(40)
			.on("tick", () => {
				link
					.attr("x1", d => d.source.x)
					.attr("y1", d => d.source.y)
					.attr("x2", d => d.target.x)
					.attr("y2", d => d.target.y);			
				node
					.attr("cx", d => d.x)
					.attr("cy", d => d.y)
					.attr("stroke", d => d.fx ? "#333" : "#fff");
			})			
		node
			.call(drag(simulation, tooltipDiv));
		simulation.alpha(1).restart();
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

			/* event.subject.fx = null;
			   event.subject.fy = null; */
	}
	
	return d3.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended);
};
