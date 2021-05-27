/* eslint-disable no-confusing-arrow */
/* eslint-disable func-names */
/* eslint-disable no-invalid-this */
/* eslint-disable no-mixed-operators */
/* eslint-disable operator-assignment */
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
	let legRectHeight = 35 + 20 * (1 + data.length);
	const legRectX = width - 245;
	const legRectY = 20;
	let nPreceding = 0;
	
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
	const legendCategories = legendContent.append("g")
		.classed("legend-categories", true)
		.attr("transform", `translate(${width - legRectWidth},${40})`);

	const legendEntries = legendCategories.selectAll("legend-entry")
		.data(data)
		.join("g")
		.classed("legend-entry", true)
		.attr("transform", (d, i) => `translate(0,${(i + 1) * 20})`);
	
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
	legendCategories.append("text")
		.attr("pointer-events", "none")
		.style("user-select", "none")
		.attr("class", "legend-title")
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
	const distanceColor = legendContent.append("g")
		.classed("legend-distance", true)
		.attr("transform", `translate(${width - legRectWidth},50)`);

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

		legendContent.selectAll('*').style("visibility", "hidden");
		plusSignVLine.style("visibility", "visible");
		legendsOn = false;
	}

	// shows legend and shifts minimizeButton to minimize color and sign
	// eslint-disable-next-line func-style
	function maximize() {
		legendContent.selectAll('*').style("visibility", "visible");
		plusSignVLine.style("visibility", "hidden");

		legendsOn = true;
	}
	const barHeight = 20;

	// eslint-disable-next-line func-style
	function updateTicks(strokeScale) {
		const axisBottom = g => g
			.attr("class", `x-axis`)
			.attr("transform", `translate(0,${barHeight})`)
			.call(d3.axisBottom(d3.scaleLinear()
				.domain(strokeScale.domain())
				.range([0, 0.7 * legRectWidth]))
				.ticks(3)
				.tickSize(-2));

		distanceColor.selectAll(".x-axis").remove();
		distanceColor.append('g')
			.call(axisBottom);
	}

	// eslint-disable-next-line func-style
	function drawDistanceColor(colorScale) {
		
		let lgnMarg = {
			bottom: 30,
			left: 40,
			right: 40, 
			top: 20
		};
		const axisBottom = g => g
			.attr("class", `x-axis`)
			.attr("transform", `translate(0,${barHeight})`)
			.call(d3.axisBottom(d3.scaleLinear()
			.domain(colorScale.domain())
			.range([0, 0.7 * legRectWidth]))
			.ticks(3)
			.tickSize(-10));
	
			nPreceding += 1;
		legendCategories
			.attr("transform", `translate(${width - legRectWidth},${40 + nPreceding * 70})`);
	
		legRectHeight += 70;
		legendRect
			.attr("height", legRectHeight)
		
		distanceColor.append("text")
			.attr("pointer-events", "none")
			.style("user-select", "none")
			.attr("class", "legend-title")
			.style("font-size", 20)
			.text("Distanza");
		const defs = distanceColor.append("defs");

		const linearGradient = defs.append("linearGradient")
		.attr("id", "linear-gradient");

		linearGradient.selectAll("stop")
			.data(colorScale.ticks().map((t, i, n) => ({ 
				color: colorScale(t),
				offset: `${100 * i / n.length}%`
			})))
			.join("stop")
			.attr("offset", d => d.offset)
			.attr("stop-color", d => d.color);

		distanceColor.append('g')
			.attr("transform", `translate(0,${lgnMarg.bottom - barHeight})`)
			.append("rect")
			.attr('transform', `translate(0, 0)`)
			.attr("width", 0.7 * legRectWidth)
			.attr("height", 10)
			.style("fill", "url(#linear-gradient)");

		distanceColor.append('g')
			.call(axisBottom);
	}
	// eslint-disable-next-line func-style
	function drawDistanceTrapezoid(strokeScale) {
		
		
		nPreceding += 1;
		legendCategories
		.attr("transform", `translate(${width - legRectWidth},${40 + nPreceding * 70})`);
		
		legRectHeight += 70;
		legendRect
		.attr("height", legRectHeight)
		
		distanceColor.append("text")
		.attr("pointer-events", "none")
		.style("user-select", "none")
		.attr("class", "legend-title")
		.style("font-size", 20)
		.text("Distanza");
		
		distanceColor.append('polygon')
		.attr("points", `0 2.75, ${0.7 * legRectWidth} 0, ${0.7 * legRectWidth} 6, 0 3.25`)
		.attr("transform", `translate(0, 7)`)
		.attr("fill", `#000`);
		
		updateTicks(strokeScale);
	}
	maximize();
	
	return Object.assign(
		legendHandler.node(),
		{
			drawDistanceColor, 
			drawDistanceTrapezoid,
			updateTicks
		}
	);
}

