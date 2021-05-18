/* eslint-disable func-names */
/* eslint-disable no-invalid-this */
/* eslint-disable no-mixed-operators */
const d3 = require('d3');

// eslint-disable-next-line func-style
export const drawLegend = function (svg, categories, width) {
	// eslint-disable-next-line func-style
	function categoriesOn () {
		let dict = {}
		for (let i = 0; i < categories.length; ++i) {
			dict[categories[i]] = true;
		}	
		return dict;
	}
	// eslint-disable-next-line func-style
	function color(cat) {
		if (categoriesOn[cat] === false) {
			return "white"
		}
		const scale = d3.scaleOrdinal(categories, d3.schemeCategory10);
		return scale(cat);
	}
	const minX = width - 50;
	const minY = 35;

	let legendHandler = svg.append("g")
			.classed("legend", true);

	let legendContainer = legendHandler.append("rect")
		.attr("x", width - 245)
		.attr("y", 20)
		.attr("fill", `#c8c8c8`)
		.attr("width", 210)
		.attr("height", 35 + 20 * (1 + categories.length));

	let legend = legendHandler.selectAll("legend")
		.data(categories)
		.join("g")
		.attr("transform", (d, i) => `translate(${width - 180},${i * 20 + 60})`);
	legend.append("circle")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r", 5)
		.attr("stroke", "black")
		.attr("fill", d => color(d));

	// label for each category circle in legend
	legend.append("text")
		.attr("x", 10)
		.attr("y", 5)
		.style("fill", "black")
		.text(d => d);

	// top legend label "Categorie"
	let legendLabel = legendHandler.append("text")
		.attr("pointer-events", "none")
		.style("user-select", "none")
		.attr("id", "legendTitle")
		.attr("x", width - 235)
		.attr("y", 45)
		.style("font-size", 20)
		.text("Categorie");

	// hiding/showing the legend on -/+ button click
	let legendsOn = true;
	const legendBtn = legendHandler.append("g")
		.classed("legendButton", true)
		.on('mouseover', function () {
			d3.select(this).attr('opacity', 0.7);
		})
		.on('mouseout', function () {
			d3.select(this).attr('opacity', 1);
		})
		// eslint-disable-next-line prefer-arrow-callback
		.on("click", function (event) {
			if (legendsOn === true) {
				minimize();
			}
			else {
				maximize();
			}
			doNothing(event);
		});

		legendBtn.append("circle")
			.attr("cx", minX)
			.attr("cy", minY)
			.attr("r", 10)
			.attr("fill", "#013220");

	// hides legend and shifts minimizeButton to maximize color and sign
	// eslint-disable-next-line func-style
	function minimize() {
		d3.selectAll(legend).style("opacity", 0);
		d3.selectAll(legendLabel).style("opacity", 0);
		d3.selectAll(legendContainer).style("opacity", 0);
		legendBtn.select("circle");
		legendBtn.selectAll("line").remove();
		legendBtn.append("line")
			.attr("stroke", "#ffffff")
			.attr("stroke-width", 2)
			.attr("stroke-linecap", "round")
			.attr("x1", minX)
			.attr("y1", minY - 3)
			.attr("x2", minX)
			.attr("y2", minY + 3);
		legendBtn.append("line")
			.attr("stroke", "#ffffff")
			.attr("stroke-width", 2)
			.attr("stroke-linecap", "round")
			.attr("x1", minX - 3)
			.attr("y1", minY)
			.attr("x2", minX + 3)
			.attr("y2", minY);
		legendsOn = false;
	}

	// shows legend and shifts minimizeButton to minimize color and sign
	// eslint-disable-next-line func-style
	function maximize() {
		d3.selectAll(legend).style("opacity", 1);
		d3.selectAll(legendLabel).style("opacity", 1);
		d3.selectAll(legendContainer).style("opacity", 1);
		legendBtn.selectAll("line").remove();
		legendBtn.append("line")
			.attr("stroke", "#ffffff")
			.attr("stroke-width", 2)
			.attr("stroke-linecap", "round")
			.attr("x1", minX - 3)
			.attr("y1", minY)
			.attr("x2", minX + 3)
			.attr("y2", minY);
		legendsOn = true;
	}
	// eslint-disable-next-line func-style
	function doNothing(event) {
		event.stopPropagation();
	}
	maximize();
}