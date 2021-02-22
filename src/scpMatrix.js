const d3 = require('d3');
const jsdom = require('jsdom');
const fs = require('fs');

const scpMatrix = function (dataFile, cols) {
	var size = 180;
	var padding = 20;
	dataFile = d3.csvFormatRows(dataFile);
	var data = d3.csvParse(dataFile, d3.autoType);
	cols = cols.replace("\r", "").split(',');
	let columns = cols.filter(d => d !== "species");

	let html_string = readHtmlFile('public/graph.html');
	let DOM = new jsdom.JSDOM(html_string);
	let document = svgDOM(DOM.window.document, size, padding, columns);
	var svg = d3.select(document.body).select("svg");

	var xScale = columns.map(c => d3.scaleLinear()
		.domain(d3.extent(data, d => d[c]))
		.range([padding / 2, size - padding / 2]));

	var yScale = columns.map(c => d3.scaleLinear()
		.domain(d3.extent(data, d => d[c]))
		.range([size - padding / 2, padding / 2]));

	var xAxis = d3.axisBottom()
		.ticks(columns.length)
		.tickSize(size * columns.length);

	var x = svg.append("g")
		.selectAll("g")
		.data(xScale)
		.enter()
		.append("g")
		.attr("transform", (d, i) => "translate(" + size * i + ",0)")
		.each(function (d) {
			return d3.select(this).call(xAxis.scale(d));
		});

	x.select(".domain").remove();
	x.selectAll(".tick line").attr("stroke", "#ddd");

	var yAxis = d3.axisLeft()
		.ticks(columns.length)
		.tickSize(-size * columns.length);

	var y = svg.append("g")
		.selectAll("g")
		.data(yScale)
		.enter()
		.append("g")
		.attr("transform", (d, i) => "translate(0," + size * i + ")")
		.each(function (d) {
			return d3.select(this).call(yAxis.scale(d));
		});

	y.select(".domain").remove();
	y.selectAll(".tick line").attr("stroke", "#ddd");

	
	var colors = d3.scaleOrdinal()
		.domain(data.map(d => d.species))
		.range(d3.schemeCategory10);


	var cell = svg.append("g")
		.selectAll("g")
		.data(d3.cross(d3.range(columns.length), d3.range(columns.length)))
		.enter()
		.append("g")
		.attr("transform", ([i, j]) => "translate(" + i * size + "," + j * size + ")");




	cell.append("rect")
		.attr("fill", "none")
		.attr("stroke", "#aaa")
		.attr("x", padding / 2)
		.attr("y", padding / 2)
		.attr("width", size - padding)
		.attr("height", size - padding);


	cell.each(function ([i, j]) {
		d3.select(this)
			.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", d => xScale[i](d[columns[i]]))
			.attr("cy", d => yScale[j](d[columns[j]]))
			.attr("r", 3.5)
			.attr("fill-opacity", 0.7)
			.attr("fill", d => colors(d.species));
	});

	var circle = cell.selectAll("circle");

	svg.append("g")
		.style("font", "bold 10px sans-serif")
		.selectAll("text")
		.data(columns)
		.enter()
		.append("text")
		.attr("transform", (d, i) => "translate(" + i * size + "," + i * size + ")")
		.attr("x", padding)
		.attr("y", padding)
		.attr("dy", ".71em")
		.text(d => d);


	/* var brush = d3.brush()
		.extent([[padding / 2, padding / 2], [size - padding / 2, size - padding / 2]]);

	cell.call(brush);

	var brushCell;


	brush.on("start", function () {
		if (brushCell != this) {
			d3.select(brushCell).call(brush.move, null);
			brushCell = this;
		}
	});

	brush.on("brush", function ([i, j]) {
		if (d3.event.selection == null)
			return;
		const [[x0, y0], [x1, y1]] = d3.event.selection;

		circle.attr("fill", function (d) {
			return xScale[i](d[columns[i]]) < x0
				|| xScale[i](d[columns[i]]) > x1
				|| yScale[j](d[columns[j]]) < y0
				|| yScale[j](d[columns[j]]) > y1
				? "#ccc" : colors(d.species);
		});
	});

	brush.on("end", function () {
		if (d3.event.selection != null)
			return;

		circle.attr("fill", d => colors(d.species)); y
	}); */


	return DOM.serialize();
}

module.exports = scpMatrix;

function svgDOM(document, size, padding, columns) {
	// Setup DOM
	let body = d3.select(document.body);

	// Create svg node
	body.append("svg")
		.classed("grafico", true)
		.attr("width", size * columns.length + padding)
		.attr("height", size * columns.length + padding)
		.append("g")
		.attr("transform", "translate(" + padding + ",0)");
	return document;
}

function readHtmlFile(path) {
	return fs.readFileSync(path, 'utf8').toString();
}