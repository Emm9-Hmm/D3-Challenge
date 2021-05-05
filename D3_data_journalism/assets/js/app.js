// @TODO: YOUR CODE HERE!

let width = 600;
let height = 500;

let margin = {
    top: 60, 
    right: 60, 
    bottom: 60, 
    left: 60
};

// append the svg
let svg = d3.select("#scatter")
    .append("svg")
    .attr("width", width )
    .attr("height", height)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//reassign according to margin
width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

// import csv
d3.csv("assets/data/data.csv").then(function(data) {
    // cast numbers
    data.forEach(d => {
        d.poverty = +d.poverty;
        d.healthcare = +d.healthcare;
    });

    // x axis
    let povertyDomain = data.map(d => d.poverty);

    let x = d3.scaleLinear()
        .domain(d3.extent(povertyDomain))
        .range([0, width]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .text("Poverty%");

    // y axis
    let healthcareDomain = data.map(d => d.healthcare);
    let y = d3.scaleLinear()
                .domain(d3.extent(healthcareDomain))
                .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(y));

    // Add Y label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", (height / 2) * -1)
        .attr("dy", -40)
        .text("Healthcare%");

    // Add dots
    let dots = svg.selectAll("dots")
        .data(data)
        .enter()
        .append('g');

    dots.append("circle")
        .attr("cx", d => x(d.poverty))
        .attr("cy", d => y(d.healthcare))
        .attr("r", 10)
        .style("fill", "#5DADE2");
    
    // Add text
    dots.append("text")
        .text(d => d.abbr)
        .attr("x", d => x(d.poverty))
        .attr("y", d => y(d.healthcare))
        .attr("dx", -6)
        .attr("dy", 3)
        .style("font-size", "10px");


}).catch(e => {
    //I hope we don't get here!
    console.log(e);
});