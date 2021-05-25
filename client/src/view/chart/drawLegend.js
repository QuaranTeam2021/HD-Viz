/* eslint-disable no-confusing-arrow */
/* eslint-disable func-names */
/* eslint-disable no-invalid-this */
/* eslint-disable no-mixed-operators */
const d3 = require('d3');

// eslint-disable-next-line func-style
export const drawLegend = function (svg, data, width) {
	// eslint-disable-next-line func-style
	function categoriesOn () {
		let dict = {}
		for (let i = 0; i < data.length; ++i) {
			dict[data[i]] = true;
		}	
		return dict;
	}
	// eslint-disable-next-line func-style
	function color(cat) {
		if (categoriesOn[cat] === false) {
			return "white"
		}
		const scale = d3.scaleOrdinal(data, d3.schemeCategory10);
		return scale(cat);
	}
	const btnX = width - 50;
	const btnY = 35;
	const legRectWidth = 210;
	const legRectHeight = 35 + 20 * (1 + data.length);
	const legRectX = width - 245;
	const legRectY = 20;
	
	const legendHandler = svg.append("g")
		.classed("legend", true);
	const legendContent = legendHandler.append("g")
		.classed("legend-content", true);

	const legendRect = legendContent.append("rect")
		.style("user-select", "none")
		.attr("x", legRectX)
		.attr("y", legRectY)
		.attr("fill", `#c8c8c8`)
		.attr("width", legRectWidth)
		.attr("height", legRectHeight);

	const legendEntries = legendContent.selectAll("legend-entry")
		.data(data)
		.join("g")
		.classed("legend-entry", true)
		.attr("transform", (d, i) => `translate(${width - 180},${i * 20 + 60})`);
	
	legendEntries.append("circle")
		.attr("cx", 0)
		.attr("cy", 0)
		.attr("r", 5)
		.attr("stroke", "black")
		.attr("fill", d => color(d));

	// label for each category circle in legend
	legendEntries.append("text")
		.attr("x", 10)
		.attr("y", 5)
		.style("fill", "black")
		.text(d => d === undefined ? "sconosciuto" : d)
		.style("font-style", d => d === undefined ? "italic" : "");

	// top legend label "Categorie"
	const legendTitle = legendContent.append("text")
		.attr("pointer-events", "none")
		.style("user-select", "none")
		.attr("class", "legend-title")
		.attr("x", width - 235)
		.attr("y", 45)
		.style("font-size", 20)
		.text("Categorie");

	// hiding/showing the legend on -/+ button click
	let legendsOn = true;
	const legendBtn = legendHandler.append("g")
		.classed("legend-button", true)
		.on('mouseover', function () {
			d3.select(this).attr('opacity', 0.7);
		})
		.on('mouseout', function () {
			d3.select(this).attr('opacity', 1);
		})
		// eslint-disable-next-line prefer-arrow-callback
		.on("click", function () {
			if (legendsOn === true) {
				minimize();
			}
			else {
				maximize();
			}
		});

	legendBtn.append("circle")
		.attr("cx", btnX)
		.attr("cy", btnY)
		.attr("r", 10)
		.attr("fill", "#013220");

	const plusSignVLine = legendBtn.append("line")
		.attr("stroke", "#ffffff")
		.attr("stroke-width", 2)
		.attr("stroke-linecap", "round")
		.attr("x1", btnX)
		.attr("y1", btnY - 3)
		.attr("x2", btnX)
		.attr("y2", btnY + 3);
		
	legendBtn.append("line")
		.attr("stroke", "#ffffff")
		.attr("stroke-width", 2)
		.attr("stroke-linecap", "round")
		.attr("x1", btnX - 3)
		.attr("y1", btnY)
		.attr("x2", btnX + 3)
		.attr("y2", btnY);

	// hides legend and shifts minimizeButton to maximize color and sign
	// eslint-disable-next-line func-style
	function minimize() {
		legendEntries.style("visibility", "hidden");
		legendTitle.style("visibility", "hidden");
		legendRect.style("visibility", "hidden");
		plusSignVLine.style("visibility", "visible");

		legendsOn = false;
	}

	// shows legend and shifts minimizeButton to minimize color and sign
	// eslint-disable-next-line func-style
	function maximize() {
		legendEntries.style("visibility", "visible");
		legendTitle.style("visibility", "visible");
		legendRect.style("visibility", "visible");
		plusSignVLine.style("visibility", "hidden");

		legendsOn = true;
	}
	
	maximize();
}