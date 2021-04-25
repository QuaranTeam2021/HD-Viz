/* eslint-disable func-names */
/* eslint-disable no-invalid-this */
/* eslint-disable func-style */
import * as d3 from "d3";
import { computeCoordinates, getEigenvalues, initProjection, scale } from "./d3-algebric";

/**
 * Plot multi-axis linear-projection graph of a graph.
 * @param {Array<Object>} data table-formed json array
 * @param {Array<String>} cols set of colums to be plotted
 * @param {String} grouper grouping column
 * @param {String} idBox box to append
 */
export const linearProjection = function (data, cols, grouper, idBox) {
    const margin = { top: 20, right: 20, bottom: 35, left: 40 },
        width = 1000 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;
    const columns = cols.filter(d => d !== grouper && typeof data[0][d] === "number");

    const xScale = d3.scaleLinear([0, width]);
    const yScale = d3.scaleLinear([0, height]);
    
    const PC1Axis = g => g
        .attr("transform", `translate(0,${height})`)
        .attr("class", "PC1-axis")
        // .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).ticks(6))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", width)
            .attr("y", margin.bottom)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text("Principal Component 1 →"));


    const PC2Axis = g => g
        .attr("transform", `translate(0,0)`)
        .call(d3.axisLeft(yScale).ticks(6))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Principal Component 2"));


    const grid = g => g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g.append("g")
            .selectAll("line")
            .data(xScale.ticks())
            .join("line")
            .attr("x1", d => 0.5 + xScale(d))
            .attr("x2", d => 0.5 + xScale(d))
            .attr("y1", margin.top)
            .attr("y2", height))
        .call(g => g.append("g")
            .selectAll("line")
            .data(yScale.ticks())
            .join("line")
            .attr("y1", d => 0.5 + yScale(d))
            .attr("y2", d => 0.5 + yScale(d))
            .attr("x1", 0)
            .attr("x2", width));

    const totalWidth = width + margin.left + margin.right;
    const totalHeight = height + margin.top + margin.bottom;

    const svg = d3.select("#" + idBox)
        .append("svg")
        .attr("class", "grafico")
        .attr("width", totalWidth)
        .attr("height", totalHeight)
        // .attr("viewBox", [0, 0, totalWidth, totalHeight])
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let rawData = data.map(d => columns.map(dim => d[dim]));
    rawData = scale(rawData, true, true);
    let eigvecs = getEigenvalues(rawData, 2);
    let initMat = initProjection(rawData, 2);

    let { min, max } = getMinMaxDots(initMat, eigvecs);

    xScale.domain([1.2 * min, 1.2 * max]).nice();
    yScale.domain([1.2 * min, 1.2 * max]).nice();

    setDotAttributes(initMat, data);
    let dims = columns
        .map((key, i) => ({
                value: key,
                pc_1: isNaN(eigvecs[i][0]) ? 0 : eigvecs[i][0] * 4,
                pc_2: isNaN(eigvecs[i][1]) ? 0 : eigvecs[i][1] * 4,
                id: i
            }));

    svg.append("g")
        .call(PC1Axis);

    svg.append("g")
        .call(PC2Axis);

    svg.append("g")
        .call(grid);

    const palette = d3.scaleOrdinal(d3.schemeTableau10).domain(new Set(data.map(d => d[grouper])));

    const drag = () => {

        function dragstarted() {
            d3.select(this).style("cursor", "grabbing");
        }

        // eslint-disable-next-line func-style
        function dragged(event, d) {
            d.x = event.x;
            d.y = event.y;

            d3.select(this)
                .attr("cx", d.x)
                .attr("cy", d.y);
            svg.select("#" + d.value + "_line")
                .attr("x2", d.x)
                .attr("y2", d.y);
            svg.select("#" + d.value + "_label")
                .attr("x", d.x + 10)
                .attr("y", d.y);

            eigvecs[d.id] = [xScale.invert(event.x) / 4, yScale.invert(event.y) / 4];

            const newPcaCoordinates = computeCoordinates(rawData, eigvecs);
            setDotAttributes(newPcaCoordinates, data);
            drawDots(svg, xScale, yScale);
        }
        function dragended() {
            d3.select(this).style("cursor", "default");
        }
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
        };
    svg.selectAll("text.end-axis")
        .data(dims)
        .join("text")
        .attr("class", "label-end-axis")
        .attr("id", d => d.value + "_label")
        .attr("x", d => xScale(d.pc_1) + 10)
        .attr("y", d => yScale(d.pc_2) + 0)
        .text(d => d.value);
    svg.selectAll(".dot")
        .data(data)
        .join("circle")
        .attr("class", "dot")
        .attr("r", 2)
        .style("fill", d => palette(d[grouper]));

        drawDots(svg, xScale, yScale);

        svg.selectAll(".line")
        .data(dims)
        .join("line")
        .attr("id", d => d.value + "_line")
        .attr("x1", xScale(0))
        .attr("y1", yScale(0))
        .attr("x2", d => xScale(d.pc_1))
        .attr("y2", d => yScale(d.pc_2))
        .attr("stroke-width", 3)
        .style("stroke", "black");
        
        
        svg.selectAll("circle.end-axis")
            .data(dims)
            .join("circle")
            .attr("r", 7)
            .attr("class", "circle-end-axis")
            .attr("cx", d => xScale(d.pc_1))
            .attr("cy", d => yScale(d.pc_2))
            .style("fill", "red")
            .attr("stroke-width", 3)
            .style("stroke", "black")
            .call(drag());

};

function drawDots(svg, xScale, yScale) {
    svg.selectAll(".dot")
        .attr("cx", d => xScale(d.pc_1))
        .attr("cy", d => yScale(d.pc_2));
}

function setDotAttributes(A, dots) {
    dots.forEach(function (d, i) {
        d.pc_1 = A[i][0];
        d.pc_2 = A[i][1];
    });
}

function getMinMaxDots(A, B) {
    let min, max;
    A.forEach(function (itm) {
        itm.forEach(function (itmInner) {
            min = min === undefined || itmInner < min ? itmInner : min;
            max = max === undefined || itmInner > max ? itmInner : max;
        });
    });
    B.forEach(function (itm) {
        itm.forEach(function (itmInner) {
            min = min === undefined || itmInner * 4 < min ? itmInner * 4 : min;
            max = max === undefined || itmInner * 4 > max ? itmInner * 4 : max;
        });
    });
    return { min, max };
}
