/* istanbul ignore file */
/* eslint-disable camelcase */
/* eslint-disable no-extra-parens */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable no-invalid-this */
/* eslint-disable func-style */
import * as d3 from "d3";
import { computeCoordinates, getEigenvalues, initProjection, scale } from "./d3-algebric";
import { drawLegend } from './drawLegend'

/**
 * Plot multi-axis linear-projection graph of a graph.
 * @param {Array<Object>} data table-formed json array
 * @param {Array<String>} cols set of colums to be plotted
 * @param {String} grouper grouping column
 * @param {String} idBox box to append
 */
export const linearProjection = function (data, cols, grouper, idBox) {

    const margin = {
        bottom: 30,
        left: 40,
        right: 20,
        top: 20
    };
    const height = 700 - margin.top - margin.bottom,
        width = 700 - margin.left - margin.right;
        
    const xScale = d3.scaleLinear([0, width]);
    const yScale = d3.scaleLinear([0, height]);
        
    const PC1Axis = g => g
        .attr("transform", `translate(0,${height})`)
        .attr("class", "PC1-axis")
        .call(d3.axisBottom(xScale))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .classed("domain", true)
            .attr("x", width)
            .attr("y", 0)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text("Principal Component 1 →"));
            
            
    const PC2Axis = g => g
        .attr("transform", `translate(0,0)`)
        .attr("class", "PC2-axis")
        .call(d3.axisLeft(yScale))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .classed("domain", true)
            .attr("x", 0)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Principal Component 2"));

        
    const grid = g => g
        .classed("grid", true)
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g => g.append("g")
            .attr("transform", `translate(0,0)`)
            .attr("class", "grid-lines")
            .selectAll("line")
            .data(xScale.ticks())
            .join("line")
                .attr("x1", d => 0.5 + xScale(d))
                .attr("x2", d => 0.5 + xScale(d))
                .attr("y1", 0)
                .attr("y2", height))
        .call(g => g.append("g")
            .attr("transform", `translate(0,0)`)
            .attr("class", "grid-lines")
            .selectAll("line")
            .data(yScale.ticks())
            .join("line")
                .attr("y1", d => 0.5 + yScale(d))
                .attr("y2", d => 0.5 + yScale(d))
                .attr("x1", 0)
                .attr("x2", width));
                
    const totalWidth = width + margin.left + margin.right;
    const totalHeight = height + margin.top + margin.bottom;
    const palette = d3.scaleOrdinal(d3.schemeCategory10).domain(new Set(data.map(d => d[grouper])));
    const svg = d3.select(`#${idBox}`)
        .append("svg")
        .attr("class", "grafico")
        .attr("viewBox", [0, 0, totalWidth, totalHeight])
        .attr("width", totalWidth)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
   
    let selectedCols;
    const PC1AxisHandler = svg.append("g");
    const PC2AxisHandler = svg.append("g");
    const gridHandler = svg.append("g");
    const contentHandler = svg.append("g");
    contentHandler.classed("contentHandler", true);

    const categories = [...new Set(data.map(item => item[grouper]))]; 


    updateColumns(cols);
	function updateColumns(columns) {

        const drag = () => {

            function dragstarted() {
                d3.select(this).style("cursor", "grabbing");
            }

            // eslint-disable-next-line func-style
            function dragged(event, d) {
                d.x = event.x;
                if (d.x > width) {
                     d.x = width;
                } 
                else if (d.x < 0) {
                    d.x = 0;
                }

                d.y = event.y;
                if (d.y > height) {
                    d.y = height;
                } 
                else if (d.y < 0) {
                    d.y = 0;
                }
                
                d3.select(this)
                    .attr("cx", d.x)
                    .attr("cy", d.y);
                svg.select(`#${d.value}_line`)
                    .attr("x2", d.x)
                    .attr("y2", d.y);
                svg.select(`#${d.value}_label`)
                    .attr("x", d.x + 10)
                    .attr("y", d.y);
                eigvecs[d.id] = [xScale.invert(d.x) / 4, yScale.invert(d.y) / 4];

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
    
        svg.selectAll(".legend").remove();
        svg.selectAll(".grid-lines").remove();
        contentHandler.selectAll("*").remove();


        const filteredcols = columns.filter(itm => itm !== grouper && typeof data[0][itm] === "number");
        let rawData = data.map(d => filteredcols.map(dim => d[dim]));
        rawData = scale(rawData, true, true);
        let eigvecs = getEigenvalues(rawData, 2);
        let initMat = initProjection(rawData, 2);
        
        let { max, min } = getMaxMinDots(initMat, eigvecs);

        xScale.domain([1.1 * min, 1.1 * max]).nice();
        yScale.domain([1.1 * min, 1.1 * max]).nice();

        setDotAttributes(initMat, data);
        const dims_unfiltered = filteredcols
            .map((key, i) => ({
                id: i,
                pc_1: isNaN(eigvecs[i][0]) ? 0 : eigvecs[i][0] * 4,
                pc_2: isNaN(eigvecs[i][1]) ? 0 : eigvecs[i][1] * 4,
                value: key
            }));
        selectedCols = dims_unfiltered.filter(p => p.value !== "pc_1" && p.value !== "pc_2")


        PC1AxisHandler.call(PC1Axis);
        PC2AxisHandler.call(PC2Axis);
        gridHandler.call(grid);
            
        contentHandler.selectAll(".dot")
            .data(data)
            .join("circle")
            .attr("class", "dot")
            .attr("r", 2.5)
            .style("fill", d => palette(d[grouper]));

        drawDots(contentHandler, xScale, yScale);

        contentHandler.selectAll(".line")
            .data(selectedCols)
            .join("line")
            .attr("id", d => `${d.value}_line`)
            .attr("x1", xScale(0))
            .attr("y1", yScale(0))
            .attr("x2", d => xScale(d.pc_1))
            .attr("y2", d => yScale(d.pc_2))
            .attr("stroke-width", 3)
            .style("stroke", "black");
            
        contentHandler.selectAll("text.end-axis")
            .data(selectedCols)
            .join("text")
            .attr("class", "label-end-axis")
            .attr("id", d => `${d.value}_label`)
            .attr("x", d => xScale(d.pc_1) + 10)
            .attr("y", d => yScale(d.pc_2) + 0)
            .text(d => d.value);
            
        contentHandler.selectAll("circle.end-axis")
            .data(selectedCols)
            .join("circle")
            .attr("r", 7)
            .attr("class", "circle-end-axis")
            .attr("cx", d => xScale(d.pc_1))
            .attr("cy", d => yScale(d.pc_2))
            .style("fill", "red")
            .attr("stroke-width", 3)
            .style("stroke", "black")
            .call(drag());
            drawLegend(svg, categories, width);
            
        }

        /**
         * Ritorna l'array di colonne presenti nel grafico quando questo è stato creato.
         * Ovvero ritorna il parametro cols che è stato passato al grafico al momento della creazione.
         * Il valore ritornato non cambia dopo una chiamata a updateColumns.
         * NON RITORNA TUTTE LE COLONNE PRESENTI NEL FILE DI PARTENZA.
         * @return {Array<String>} insieme di colonne plottate inizialmente.
         */
        const getAllCols = () => {
            return cols.filter(d => d !== grouper && d !== "pc_1" && d !== "pc_2");
        }

        /**
         * Ritorna l'array di colonne attualmente visualizzate nel grafico.
         * Ovvero ritorna un sottoinsieme del parametro cols che è stato passato al grafico al momento della creazione.
         * Il valore ritornato cambia dopo una chiamata a updateColumns
         * NON RITORNA TUTTE LE COLONNE PRESENTI NEL FILE DI PARTENZA.
         * @return {Array<String>} insieme di colonne attualmente visualizzate
         */
        const getSelectedCols = () => {
            return selectedCols.map(i => i.value);
        }

	return Object.assign(svg.node(), { getAllCols,
        getSelectedCols, 
		updateColumns });

};

function drawDots(svg, xScale, yScale) {
    svg.selectAll(".dot")
        .attr("cx", d => xScale(d.pc_1))
        .attr("cy", d => yScale(d.pc_2));
}

function setDotAttributes(A, dots) {
    dots.forEach(function (d, i) {
        // eslint-disable-next-line camelcase
        d.pc_1 = A[i][0];
        // eslint-disable-next-line camelcase
        d.pc_2 = A[i][1];
    });
}

function getMaxMinDots(A, B) {
    let max, min;
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
    return { max,
        min };
}
