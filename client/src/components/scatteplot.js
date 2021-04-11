const d3 = require('d3');



// set the dimensions and margins of the graph
const scatterPlot = function(data, rows, columns, value) {
  const svgWidth=1000;
  const svgHeight=1000;
  const margin={ top:100,left:100,bottom:200,right:300}
  const width=svgWidth-(margin.left+margin.right);
  const height=svgHeight-(margin.top+margin.bottom);

  var svg = d3.select('#prova').append("svg");
  svg = d3.select("#prova").
  append("svg").
  attr("width", width + margin.left + margin.right).
  attr("height", height + margin.top + margin.bottom).
  append("g").
  attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var xScale = d3.scaleLinear()
   .domain(d3.extent(data, d => +d[0]))
    .range([0, width])
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
     .call(d3.axisBottom(xScale));

  var yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => +d[1]))
    .range([height, 0])
    svg.append("g")
    .call(d3.axisLeft(yScale));
  
  var colors = d3.scaleOrdinal()
    .domain(data.map(d => d[2]))
    .range(d3.schemeCategory10);

   var tooltip = d3.select("#prova")
   .append("div")
   .style("position", "absolute")
   .style("z-index", "10")
   .style("visibility", "hidden");

   const mousemove = function(event,d){
    return tooltip.
    html(" 1:"+d[0] +" 2:" +d[1] +" 3:"+d[2] +" 4:"+d[3]+" 5:"+d[4]+" 6:"+d[5]).style("top",
    (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
   };
   const mouseover = function(event,d) {
    return tooltip.style("visibility", "visible");
  };
  const mouseleave = function(event,d) {
    return tooltip.style("visibility", "hidden");
  };

//INIZIO LEGENDA
var keys = d3.extent(data, function(d) {return +d[2]; });
var Color = d3.scaleOrdinal()
  .domain(keys)
  .range(d3.schemeSet2);

svg.selectAll("mydots")
.data(keys)  
.enter()
.append("circle")
.attr("cx", 720)
    .attr("cy", function(d,i){ return 100 + i*25})
    .attr("r", 7)
    .style("fill", function(d){ return Color(d)})

svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", 740)
    .attr("y", function(d,i){ return 100 + i*25}) 
    .style("fill", function(d){ return Color(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
//FINE LEGENDA

//DEFINISCO I DOTS NEL GRAFICO
  svg.append('g')
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d[0]))
    .attr("cy", d => yScale(d[1]))
    .attr("r", 7)
    .attr("fill", d => colors(d[2])).
			on("mouseover", mouseover). 
      on("mouseleave", mouseleave ).
			on("mousemove", mousemove);
}

exports.scatterPlot = scatterPlot;
