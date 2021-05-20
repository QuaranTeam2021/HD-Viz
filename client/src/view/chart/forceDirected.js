/* eslint-disable no-confusing-arrow */
/* eslint-disable func-style */
const d3 = require('d3');
import { drawLegend} from './drawLegend'


const height = 600;
const width = 954;

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

	let forceProperties = {
		center: {
			x: 0.5,
			y: 0.5
		},
		charge: {
			distanceMax: 2000,
			distanceMin: 0,
			enabled: true,
			strength: -30
		},
		collide: {
			enabled: true,
			radius: 5,
			strength: 0.7
		},
		link: {
			distance: 30,
			enabled: true,
			iterations: 1
		}
	}
	const nodeRadius = 5;
	
	let svg = d3.select(`#${idBox}`).append("svg")
		.classed("grafico", true)
		.attr("viewBox", [0, 0, width, height]);
	let link,
		node,
		simulation;
	
	const scale = d3.scaleOrdinal(d3.schemeCategory10);
	const linkHandler = svg.append("g")
		.attr("stroke", "#999")
		.attr("stroke-opacity", 0.6);
	
	const nodeHandler = svg.append("g")
		.attr("stroke", "#fff")
		.attr("stroke-width", 1.5);

	const [minDist, maxVal] = [getMin(), getMax()];

	const scaleThickness = d3
			.scaleLinear()
			.domain([minDist, maxVal])
			.range([0.5, nodeRadius + 4]);
	
	updateData(data);
	// reset setting to default
	function updateData(newData) {
		nodes = newData.nodes;
		links = newData.links;
		const categories = [...new Set(nodes.map(item => item.group))]; 
		svg.selectAll(".legend").remove();
		
		simulation = d3.forceSimulation(nodes)
			.force("link", d3.forceLink(links).id(d => d.id))
			.force("charge", d3.forceManyBody())
			.force("center", d3.forceCenter(width / 2, height / 2));


		updateThreshold(0);

		node = nodeHandler
			.selectAll("circle")
			.data(nodes, d => d.id)
			.join("circle")
			.attr("r", nodeRadius)
			.attr("fill", d => scale(d.group))
			.call(drag(simulation));
		
		node.append("title")
				.text(d => d.id);
		simulation.on("tick", () => {
			link
				.attr("x1", d => d.source.x)
				.attr("y1", d => d.source.y)
				.attr("x2", d => d.target.x)
				.attr("y2", d => d.target.y);
	
			node
				.attr("cx", d => d.x)
				.attr("cy", d => d.y)
				.attr("stroke", d => d.fx ? "#333" : "#fff");
		});
		drawLegend(svg, categories, width);
	}

	function updateForces() {
		simulation.force("charge")
			.strength(forceProperties.charge.strength * forceProperties.charge.enabled)
			.distanceMin(forceProperties.charge.distanceMin)
			.distanceMax(forceProperties.charge.distanceMax);

		/* updates ignored until this is run
		   restarts the simulation (important if simulation has already slowed down) */
		simulation.alpha(1).restart();
	}

	function getMin() {
		return d3.min(links, d => d.value);
	}
	
	function getMax() {
		return d3.max(links, d => d.value);
	}
	
	function updateDistanceMax(value) {
		forceProperties.charge.distanceMax = value;
		updateForces();
	}
	
	function updateDistanceMin(value) {
		forceProperties.charge.distanceMin = value;
		updateForces();
	}
	
	function updateStrength(value) {
		forceProperties.charge.strength = value;
		updateForces();
	}
	
	function updateThreshold(threshold) {

		link = linkHandler
			.selectAll("line")
			.data(links.filter(l => l.value > threshold))
			.join("line");

		link.attr("stroke-width", d => scaleThickness(d.value - threshold));
	}
	
	return Object.assign(svg.node(), { 
		getMax,
		getMin,
		updateData,
		updateDistanceMax,
		updateDistanceMin,
		updateStrength,
		updateThreshold
	});
}

const drag = sim => {
	
	const dragstarted = function(event) {
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
		if (!event.active) {
			sim.alphaTarget(0);
		}
	}
	
	return d3.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended);
};
