// @TODO: YOUR CODE HERE!
function makeResponsive(){

    var svgArea = d3.select("body").select("svg");
    if (!svgArea.empty()) {
        svgArea.remove();
      }
 
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;
 
    var margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
      };
 
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;
 
    var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);
 
    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
 
    d3.csv("./assets/data/data.csv")
      .then(function(healthData){
        healthData.forEach(function(data){
            // data.state= data.state;
            data.abbr= data.abbr;
            data.poverty= +data.poverty;
            // data.povertyMoe= +data.povertyMoe;
            // data.age= +data.age;
            // data.ageMoe= +data.ageMoe;
            // data.income= +data.income;
            // data.incomeMoe= +data.incomeMoe;
            data.healthcare= +data.healthcare;
            // data.healthcareLow= + data.healthcareLow;
            // data.healthcareHigh= +data.healthcareHigh;
            // data.obesity= +data.obesity;
            // data.obesityLow= +data.obesityLow;
            // data.obesityHigh= +data.obesityHigh;
            // data.smokes= + data.smokes;
            // data.smokeLow= +data.smokeLow;
            // data.smokesHigh= +data.smokesHigh;
 
        });
        console.log(healthData.poverty)
      var xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.healthcare)])
        .range([6, width]);
 
      var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.poverty) + 5])
        .range([height, 6]);
 
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);
 
      chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
 
      chartGroup.append("g")
      .call(leftAxis);
 
      var circlesGroup = chartGroup.selectAll('circle').data(healthData).enter();

 circlesGroup
 .append('circle')
 .attr('cx', d => xLinearScale(d.poverty))
 .attr('cy', d => yLinearScale(d.healthcare))
 .attr('r', '10')
 .attr('fill', 'powderblue')
 .attr('opacity', '1');

 // var textGroup = chartGroup.selectAll('text')
 // .data(healthData)
 // .enter()
 circlesGroup
 .append('text')
 .text(d =>d.abbr)
 .attr('dx', d=> xLinearScale(d.poverty))
 .attr('dy', d=> yLinearScale(d.healthcare)+5)
 .attr('text-anchor','middle')
 .attr('stroke-width', 3)
 .attr('fill','black')
 .attr('font-size', 10)



chartGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0 - margin.left)
   .attr("x", 0 - (height / 2))
   .attr("dy", "1em")
   .text("Healthcare");

 chartGroup.append("g")
 .attr("transform", `translate(${width / 2}, ${height + 20})`)
 .append("text")
 .attr("x", 0)
 .attr("y", 20)
 .text("In Poverty (%)");
  });
 
 }
 
 makeResponsive();
 d3.select(window).on("resize", makeResponsive);