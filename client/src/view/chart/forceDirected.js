/* eslint-disable func-style */
const d3 = require('d3');


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
	let forceProperties = {
		center: {
			x: 0.5,
			y: 0.5
		},
		charge: {
			enabled: true,
			strength: -30,
			distanceMin: 1,
			distanceMax: 2000
		},
		collide: {
			enabled: true,
			strength: 0.7,
			radius: 5
		},
		link: {
			enabled: true,
			distance: 30,
			iterations: 1
		}
	}
	let link,
		node,
		simulation;
	const links = data.links.map(d => Object.create(d));
	const nodes = data.nodes.map(d => Object.create(d));

	simulation = d3.forceSimulation(nodes)
		.force("link", d3.forceLink(links).id(d => d.id))
		.force("charge", d3.forceManyBody())
		.force("center", d3.forceCenter(width / 2, height / 2));
	
	/* const svg = d3.create("svg")
	   	.attr("viewBox", [0, 0, width, height]);
	   alternativa: */
	let svg = d3.select(`#${idBox}`).append("svg")
		.attr("viewBox", [0, 0, width, height]);

	link = svg.append("g")
		.attr("stroke", "#999")
		.attr("stroke-opacity", 0.6)
		.selectAll("line")
		.data(links)
		.join("line");
	
	updateThreshold(0);

	node = svg.append("g")
		.attr("stroke", "#fff")
		.attr("stroke-width", 1.5)
		.selectAll("circle")
		.data(nodes)
		.join("circle")
		.attr("r", 5)
		.attr("fill", color)
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
			.attr("stroke", d => (d.fx ? "#333" : "#fff"));
	});
	function updateForces() {
		simulation.force("charge")
			.strength(forceProperties.charge.strength * forceProperties.charge.enabled)
			.distanceMin(forceProperties.charge.distanceMin)
			.distanceMax(forceProperties.charge.distanceMax);

		/* updates ignored until this is run
		   restarts the simulation (important if simulation has already slowed down) */
		simulation.alpha(1).restart();
	}
	function updateStrength(value) {
		forceProperties.charge.strength = value;
		updateForces();
	}

	function updateDistanceMin(value) {
		forceProperties.charge.distanceMin = value;
		updateForces();
	}

	function updateDistanceMax(value) {
		forceProperties.charge.distanceMax = value;
		updateForces();
	}
	function updateThreshold(threshold) {
		link.attr("stroke-width", d => (d.value > threshold) ? Math.sqrt(d.value - threshold) : 0);
	}
	
	return Object.assign(svg.node(), { updateStrength, updateDistanceMin, updateDistanceMax, updateThreshold });
}

const drag = sim => {
	
	const dragstarted = function(event) {
		if (!event.active) {
			sim.alphaTarget(0.3).restart();
		}
		if (!event.subject.fx) {
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		} 
		else {
			event.subject.fx = event.subject.fy = null;
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


const scale = d3.scaleOrdinal(d3.schemeCategory10);
const color = d => scale(d.group);
