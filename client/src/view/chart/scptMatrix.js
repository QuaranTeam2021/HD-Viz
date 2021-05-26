/* istanbul ignore file */
/* eslint-disable max-lines */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-invalid-this */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const d3 = require('d3');
import { drawLegend} from './drawLegend'


/**
 * Plot Scatterplot Matrix
 * @param {Array<Object>} data table-formed js-array
 * @param {Array<String>} cols set of colums to be plotted. grouper will be filtered
 * @param {String} grouper grouping column
 * @param {String} idBox box to append
 */
export const scpMatrix = function(data, cols, grouper, idBox) {
	// const size = 180;
	const padding = 20;
	const width = 700;
	
	/* console.log('grafico:')
	   console.log([data, cols, idBox])*/
	
	let svg = d3.select(`#${idBox}`).append("svg");
	svg.append("style")
	.text(`circle.hidden { fill: #000; fill-opacity: 1; r: 1px; }`);
	
	svg.classed("grafico", true)
		.attr("viewBox", [-padding, 0, width + padding, width])
		.attr("width", width);
	let filteredCols;
	let size;
	let xScale;
	let yScale;
	let colors = d3.scaleOrdinal()
		.domain(data.map(d => d[grouper]))
		.range(d3.schemeCategory10);
	let cell;
	let circle;
	const categories = [...new Set(data.map(item => item[grouper]))]; 
	updateColumns(cols);

	// eslint-disable-next-line func-style
	function updateColumns(columns) {
		svg.selectAll(".handler").remove();
		svg.selectAll(".legend").remove();


		filteredCols = columns.filter(d => d !== grouper && typeof data[0][d] === "number");
		size = (width - (filteredCols.length + 1) * padding) / filteredCols.length + padding;
		
		xScale = filteredCols.map(c => d3.scaleLinear()
			.domain(d3.extent(data, d => d[c]))
			.range([padding / 2, size - padding / 2]));
		
		yScale = filteredCols.map(c => d3.scaleLinear()
			.domain(d3.extent(data, d => d[c]))
			.range([size - padding / 2, padding / 2]));
		
		
		const xAxis = d3.axisBottom()
			.ticks(6)
			.tickSize(size * filteredCols.length);
			
		svg.append("g")
			.classed("handler", true)
			.selectAll("g")
			.data(xScale)
			.join("g")
			.attr("transform", (d, i) => `translate(${size * i},0)`)
			.each((d, i, nodes) => d3.select(nodes[i]).call(xAxis.scale(d)))
			.call(g => g.select(".domain").remove())
			.call(g => g.selectAll(".tick text")
				.attr("transform", `rotate(30 9 ${size * filteredCols.length + 3})`)
				.style("text-anchor", "start"))
			.call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
		
		
		const yAxis = d3.axisLeft()
			.ticks(6)
			.tickSize(-size * filteredCols.length);
		
		svg.append("g")
			.classed("handler", true)
			.selectAll("g")
			.data(yScale)
			.join("g")
			.attr("transform", (d, i) => `translate(0,${size * i})`)
			.each((d, i, nodes) => d3.select(nodes[i]).call(yAxis.scale(d)))
				.call(g => g.select(".domain").remove())
				.call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
		
		
		cell = svg
		.append("g")
			.classed("handler", true)
		.selectAll("g")
			.data(d3.cross(d3.range(filteredCols.length), d3.range(filteredCols.length)))
			.join("g")
			.attr("transform", ([i, j]) => `translate(${i * size},${j * size})`);
		
		cell.append("rect")
			.attr("fill", "none")
			.attr("stroke", "#aaa")
			.attr("x", padding / 2 + 0.5)
			.attr("y", padding / 2 + 0.5)
			.attr("width", size - padding)
			.attr("height", size - padding);
		
		cell.each(([i, j], idx, nodes) => {
			d3.select(nodes[idx])
				.selectAll("circle")
				.data(data)
				.join("circle")
				.attr("cx", d => xScale[i](d[filteredCols[i]]))
				.attr("cy", d => yScale[j](d[filteredCols[j]]))
		});

		circle = cell.selectAll("circle")
			.attr("r", 3.5)
			.attr("fill-opacity", 0.7)
			.attr("fill", d => colors(d[grouper]));
		
		
		svg.append("g")
			.classed("handler", true)
			.style("font", "bold 10px sans-serif")
			.selectAll("text")
			.data(filteredCols)
			.join("text")
			.attr("transform", (d, i) => `translate(${i * size},${i * size})`)
			.attr("x", padding)
			.attr("y", padding)
			.attr("dy", ".71em")
			.text(d => d);
		
		let brush = d3.brush()
			.extent([[padding / 2, padding / 2], [size - padding / 2, size - padding / 2]]);
		cell.call(brush);
		
		let brushCell;
		
		brush.on("start", function () {
			if (brushCell !== this) {
				d3.select(brushCell).call(brush.move, null);
				// eslint-disable-next-line consistent-this
				brushCell = this;
			}
		});
	
		brush.on("brush", function ({selection}, [i, j]) {
			let selected = [];
			if (selection) {
				const [[x0, y0], [x1, y1]] = selection; 
				circle.classed(
					"hidden",
				d => {
					return x0 > xScale[i](d[filteredCols[i]]) ||
						x1 < xScale[i](d[filteredCols[i]]) ||
						y0 > yScale[j](d[filteredCols[j]]) ||
						y1 < yScale[j](d[filteredCols[j]]);
				}
				);
				selected = data.filter(d => {
					return x0 < xScale[i](d[filteredCols[i]]) &&
						x1 > xScale[i](d[filteredCols[i]]) &&
						y0 < yScale[j](d[filteredCols[j]]) &&
						y1 > yScale[j](d[filteredCols[j]]);
				});
			}
			svg.property("value", selected).dispatch("input");
		});
	
		brush.on("end", function ({ selection }) {
			if (selection) {
				return;
			}
			svg.property("value", []).dispatch("input");
			circle.classed("hidden", false);
		});
		
		drawLegend(svg, categories, width);
	}
	return Object.assign(svg.node(), { updateColumns });
};
