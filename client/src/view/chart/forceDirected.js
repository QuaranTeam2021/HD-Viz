const d3 = require('d3');


const height = 600;
const width = 954;

let forceProperties = {
	center: {
		x: 0.5,
		y: 0.5
	},
	charge: {
		distanceMax: 2000,
		distanceMin: 1,
		enabled: true,
		strength: -30
	},
	collide: {
		enabled: true,
		radius: 5,
		strength: 0.7,
	},
	link: {
		distance: 30,
		enabled: true,
		iterations: 1
	}
}

const setStrength = function(value) {
	forceProperties.charge.strength = value;
}

const setDistanceMin = function(value) {
	forceProperties.charge.distanceMin = value;
}

const setDistanceMax = function(value) {
	forceProperties.charge.distanceMax = value;
}


export const updateStrength = function(value) {
	setStrength(value);
	updateForces();
}

export const updateDistanceMin = function(value) {
	setDistanceMin(value);
	updateForces();
}

export const updateDistanceMax = function(value) {
	setDistanceMax(value);
	updateForces();
}

let link;
let node;
export const updateDisplay = function() {
	node
		.attr("r", forceProperties.collide.radius)
		.attr("stroke", forceProperties.charge.strength > 0 ? "blue" : "red")
		.attr("stroke-width", forceProperties.charge.enabled === false ? 0 : Math.abs(forceProperties.charge.strength) / 15);

	link
		.attr("stroke-width", forceProperties.link.enabled ? 1 : 0.5)
		.attr("opacity", forceProperties.link.enabled ? 1 : 0);
}


let simulation;
export const updateForces = function() {
	simulation.force("charge")
		.strength(forceProperties.charge.strength * forceProperties.charge.enabled)
		.distanceMin(forceProperties.charge.distanceMin)
		.distanceMax(forceProperties.charge.distanceMax);

	/* updates ignored until this is run
	   restarts the simulation (important if simulation has already slowed down) */
	simulation.alpha(1).restart();
}

/**
 * Plot force-directed graph of an adiacency-matrix.
 * @param {data} graph-formed json array
 * @param {idBox} box to append
 * @return {SVGSVGElement} DOM tree of the graph,
 			to be attached to an element. Currently not used
 */
export const forceDirected = function(data, idBox) { 

	const links = data.links.map(d => Object.create(d));
	const nodes = data.nodes.map(d => Object.create(d));


	simulation = d3.forceSimulation(nodes)
		.force("link", d3.forceLink(links).id(d => d.id))
		.force("charge", d3.forceManyBody())
		.force("center", d3.forceCenter(width / 2, height / 2));
	
	/* const svg = d3.create("svg")
	   	.attr("viewBox", [0, 0, width, height]);
	   alternativa: */
	const svg = d3.select(`#${idBox}`).append("svg")
		.attr("viewBox", [0, 0, width, height]);

	link = svg.append("g")
		.attr("stroke", "#999")
		.attr("stroke-opacity", 0.6)
		.selectAll("line")
		.data(links)
		.join("line")
		.attr("stroke-width", d => Math.sqrt(d.value));

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
			.attr("cy", d => d.y);
	});
		return svg.node();
}

const drag = sim => {
	
	const dragstarted = function(event) {
		if (!event.active) sim.alphaTarget(0.3).restart();
		event.subject.fx = event.subject.x;
		event.subject.fy = event.subject.y;
	}
	
	const dragged = function(event) {
		event.subject.fx = event.x;
		event.subject.fy = event.y;
	}
	
	const dragended = function(event) {
		if (!event.active) simulation.alphaTarget(0);
		event.subject.fx = null;
		event.subject.fy = null;
	}
	
	return d3.drag()
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended);
};


const scale = d3.scaleOrdinal(d3.schemeCategory10);
const color = d => scale(d.group);
