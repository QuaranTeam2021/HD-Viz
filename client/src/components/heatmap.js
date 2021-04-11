const { color } = require('d3');
const d3 = require('d3');

const heatmap = function(data, rows, columns, value) {

  var  Assex = rows, Assey = columns;
  var  rows = new Set(data.map(d => +d[rows])),
		columns = new Set(data.map(d => +d[columns]));

  const svgWidth=1000;
  const svgHeight=1000;
  const margin={ top:100,left:100,bottom:200,right:300}

  const width=svgWidth-(margin.left+margin.right);
  const height=svgHeight-(margin.top+margin.bottom);

 

  d3.select("#prova").selectAll("svg").remove();
  const svg = d3.select("#prova").
      append("svg").
      attr("width", width + margin.left + margin.right).
      attr("height", height + margin.top + margin.bottom).
      append("g").
      attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(rows)
  .padding(0.02);
  svg.append("g")
  .style("font-size", 15)
  .call(d3.axisBottom(x).tickSize(0))
  .attr("transform", "translate(0," + height + ")");

  //ASSE DELLE Y
  var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(columns)
  .padding(0.01);

  svg.append("g")
  .call(d3.axisLeft(y).tickSize(0))
  .style("font-size", 15)
  .selectAll("text")
  .attr("y", 0)
  .attr("x", -10)
  .attr('width', width)
  .attr('height', height)
  .attr("dy", ".35em")
  .select(".domain").remove()
  .style("text-anchor", "start");  

  //Tooltip
  d3.select("#prova").select("div").remove();
  var tooltip = d3.select("#prova")
  .append("div")
  .style("position", "absolute")
  .style("z-index", "10");

  // DETERMINA LA CELLA DEI COLORI
  var myColor = d3.scaleLinear()
  .range(["white", "#69b3a2"])
  .domain([1,50])

//Mousemove leggere i dati  
const mousemove = function(event,d){
   return tooltip.
   html("Il valore della cella è: " + d[value]).style("top",
   (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
  };
  const mouseover = function(event,d) {
   return tooltip.style("visibility", "visible");
 };
 const mouseleave = function(event,d) {
   return tooltip.style("visibility", "hidden");
 };

var dominiolegenda = d3.extent(data, function(d) {return +d[value]; });
var Color = d3.scaleOrdinal()
  .domain(dominiolegenda)
  .range(d3.schemeSet2);

  svg.selectAll("mydots")
  .data(dominiolegenda)
  .enter()
  .append("circle")
    .attr("cx", 620)
    .attr("cy", function(d,i){ return 100 + i*25})
    .attr("r", 7)
    .style("fill", function(d){ return Color(d)})
    
    svg.selectAll("mylabels")
    .data(dominiolegenda)
    .enter()
    .append("text")
      .attr("x", 640)
      .attr("y", function(d,i){ return 100 + i*25}) 
      .style("fill", function(d){ return Color(d)})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")

    svg.selectAll('rect')
    .data(data)
    .enter().append('rect')
  .attr("x", (d) => x(d[Assex]))
.attr("y", (d) => y(d[Assey]))
.attr("rx", 4)
.attr("ry",4)
.attr("width", x.bandwidth() )
.attr("height", y.bandwidth() )
.style("fill", (d) => myColor(d[value]))
.on("mouseover", mouseover)
.on("mousemove", mousemove)
.on("mouseleave", mouseleave)
}
exports.heatmap = heatmap;
