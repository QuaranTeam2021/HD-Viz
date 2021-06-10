/* istanbul ignore file */
/* eslint-disable func-style */
const d3 = require('d3');

export const tooltip = (selectionGroup, tooltipDiv) => {
	// padding between the tooltip and mouse cursor
	const MOUSE_POS_OFFSET = 4;

	// eslint-disable-next-line func-names
	selectionGroup.each(function () {
		// eslint-disable-next-line no-invalid-this
		d3.select(this)
			.on("mouseover.tooltip", handleMouseover)
			.on("mouseleave.tooltip", handleMouseleave);
	});
	let divHeight;
	function handleMouseover(event) {

		/* show/reveal the tooltip, set its contents,
		   style the element being hovered on */
		showTooltip();
		// eslint-disable-next-line no-invalid-this
		setContents(d3.select(this).datum());
		const [mouseX, mouseY] = [event.pageX, event.pageY];
		// add the left & top margin values to account for the SVG g element transform
		setPosition(mouseX, mouseY);
	}

	function handleMouseleave() {

		/* do things like hide the tooltip
		   reset the style of the element being hovered on */
		hideTooltip();
	}

	function showTooltip() {
		tooltipDiv.style("visibility", "visible");
	}

	function hideTooltip() {
		tooltipDiv.style("visibility", "hidden");
	}

	function setPosition(mouseX, mouseY) {
		tooltipDiv
			.style("top", `${mouseY - divHeight - MOUSE_POS_OFFSET}px`)
			.style("left", `${mouseX + MOUSE_POS_OFFSET}px`);
	}

	function setContents(datum) {
		// customize this function to set the tooltip's contents however you see fit
		divHeight = 16;
		const tmp = {};
		
		for (let key in datum) {
			if (key !== "x" && key !== "y" && key !== "fx" && key !== "fy" && key !== "vx" && key !== "vy" && key !== "index") {
				tmp[key] = String(datum[key]);
				divHeight = divHeight + 15;
			}
		}

		tooltipDiv
			.selectAll("p")
			.data(Object.entries(tmp))
			.join("p")
			.html(([key, value]) => `<strong>${key}</strong>: ${typeof value === 'object' ? value.toLocaleString("en-US") : value}`);
	}
};

export const tooltipTemplate = selectionGroup => {
	selectionGroup.append("style")
    .text(`
	  div.tooltip {
      position: absolute;
      visibility: hidden;
      top: 0;
      left: -100000000px;
      padding: 8px 12px;
      font-family: sans-serif;
      font-size: 12px;
      color: #333;
      background-color: #fff;
      border: 1px solid #333;
      border-radius: 4px;
      pointer-events: none;
    }
    div.tooltip p {
      margin: 0;
    }`)
}