/* istanbul ignore file */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-invalid-this */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const d3 = require('d3');
import { drawLegend } from './drawLegend'


/**
 * Plot Scatterplot Matrix
 * @param {Array<Object>} data table-formed js-array
 * @param {Array<String>} cols set of colums to be plotted. grouper will be filtered
 * @param {String} grouper grouping column
 * @param {String} idBox box to append
 */
export const scpMatrix = function(data, cols, grouper, idBox) {
	const padding = 20;
	const width = 660;
	const margin = { bottom: 10,
      left: 40,
      top: 40 };
	const newGrouper = grouper === "" ? "undefined" : grouper;
	let legend;
	let svg = d3.select(`#${idBox}`).append("svg");
	svg.append("style")
		.text(`circle.hidden { fill: #000; fill-opacity: 1; r: 1px; }`);
	
	svg.classed("grafico", true)
		.attr("viewBox", [-20, 0, width + margin.left, width + margin.top])
		.attr("width", width + margin.left);

	const mainArea = svg
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	let notNullData = [];
    let nanFound = data.length;
    // eslint-disable-next-line guard-for-in

    for (let i = 0; i < data.length; ++i) {
        let nan = false;

        for (const [key, value] of Object.entries(data[i])) {
            if (key !== newGrouper) {
                if (typeof value !== 'number' || typeof value === 'number' && isNaN(value)) {
                    nan = true;
                    break;
                } 
            }
        }

        if (!nan) {
            notNullData.push(data[i]); 
        }
    }

    nanFound = nanFound - notNullData.length;


	let selectedCols, size, xScale, yScale;
	let colors = d3.scaleOrdinal()
		.domain(notNullData.map(d => d[newGrouper]))
		.range(d3.schemeCategory10);
	let cell, circle;
	const categories = [...new Set(notNullData.map(item => item[newGrouper]))]; 
	updateColumns(cols);

	// eslint-disable-next-line func-style
	function updateColumns(columns) {
		mainArea.selectAll(".handler").remove();
		svg.selectAll(".legend").remove();


		selectedCols = columns.filter(d => d !== newGrouper);
		size = (width - (selectedCols.length + 1) * padding) / selectedCols.length + padding;
		
		xScale = selectedCols.map(c => d3.scaleLinear()
			.domain(d3.extent(notNullData, d => d[c]))
			.range([padding / 2, size - padding / 2]));
		
		yScale = selectedCols.map(c => d3.scaleLinear()
			.domain(d3.extent(notNullData, d => d[c]))
			.range([size - padding / 2, padding / 2]));
		
		const xAxis = d3.axisBottom()
			.ticks(6)
			.tickSize(size * selectedCols.length);
			
		mainArea.append("g")
			.classed("handler", true)
			.selectAll("g")
			.data(xScale)
			.join("g")
			.attr("transform", (d, i) => `translate(${size * i},0)`)
			.each((d, i, nodes) => d3.select(nodes[i]).call(xAxis.scale(d)))
			.call(g => g.select(".domain").remove())
			.call(g => g.selectAll(".tick text")
				.attr("transform", `rotate(30 9 ${size * selectedCols.length + 3})`)
				.style("text-anchor", "middle"))
			.call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
		
		
		const yAxis = d3.axisLeft()
			.ticks(6)
			.tickSize(-size * selectedCols.length);
		
		mainArea.append("g")
			.classed("handler", true)
			.selectAll("g")
			.data(yScale)
			.join("g")
			.attr("transform", (d, i) => `translate(0,${size * i})`)
			.each((d, i, nodes) => d3.select(nodes[i]).call(yAxis.scale(d)))
				.call(g => g.select(".domain").remove())
				.call(g => g.selectAll(".tick text")
					.attr("x", `0`))
				.call(g => g.selectAll(".tick line").attr("stroke", "#ddd"));
		
		cell = mainArea
		.append("g")
			.classed("handler", true)
		.selectAll("g")
			.data(d3.cross(d3.range(selectedCols.length), d3.range(selectedCols.length)))
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
				.data(notNullData)
				.join("circle")
				.attr("cx", d => xScale[i](d[selectedCols[i]]))
				.attr("cy", d => yScale[j](d[selectedCols[j]]))
		});

		circle = cell.selectAll("circle")
			.attr("r", 3.5)
			.attr("fill-opacity", 0.7)
			.attr("fill", d => colors(d[newGrouper]));
		
		
		mainArea.append("g")
			.classed("handler", true)
			.style("font", "bold 10px sans-serif")
			.selectAll("text")
			.data(selectedCols)
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
					return x0 > xScale[i](d[selectedCols[i]]) ||
						x1 < xScale[i](d[selectedCols[i]]) ||
						y0 > yScale[j](d[selectedCols[j]]) ||
						y1 < yScale[j](d[selectedCols[j]]);
				}
				);
				selected = notNullData.filter(d => {
					return x0 < xScale[i](d[selectedCols[i]]) &&
						x1 > xScale[i](d[selectedCols[i]]) &&
						y0 < yScale[j](d[selectedCols[j]]) &&
						y1 > yScale[j](d[selectedCols[j]]);
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
		legend = drawLegend(svg, categories, width);
        if (nanFound > 0) {
			legend.displayMessage("warn! # of NaN found:");
			legend.displayMessage(`${nanFound}/${data.length}`);
		}
	}
	
	/**
	 * Ritorna l'array di colonne presenti nel grafico quando questo è stato creato.
	 * Ovvero ritorna il parametro cols che è stato passato al grafico al momento della creazione.
	 * Il valore ritornato non cambia dopo una chiamata a updateColumns
	 * !! NON RITORNA TUTTE LE COLONNE PRESENTI NEL FILE DI PARTENZA !!
	 * @return {Array<String>} insieme di colonne plottate inizialmente
	 */
	const getAllCols = () => {
		return cols.filter(d => d !== newGrouper);
	}
	
	/**
	 * Ritorna l'array di colonne attualmente visualizzate nel grafico.
	 * Ovvero ritorna un sottoinsieme del parametro cols che è stato passato al grafico al momento della creazione.
	 * Il valore ritornato cambia dopo una chiamata a updateColumns
	 * @return {Array<String>} insieme di colonne attualmente visualizzate
	 */
	const getSelectedCols = () => {
		return selectedCols;
	}
	
	return Object.assign(svg.node(), { getAllCols, 
		getSelectedCols, 
		updateColumns });
};
