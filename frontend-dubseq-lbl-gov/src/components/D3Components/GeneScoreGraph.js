import * as d3 from 'd3';


// Setting constants
const wWidth = 1000
const wHeight = 600


// Creating margins and containers
const margin = {top: 100, right: 20, bottom: 50, left: 50};
const graphWidth = wWidth - margin.left - margin.right;
const graphHeight = wHeight - margin.top - margin.bottom;


window.onload = function() {
    d3.select(".canvas").append('g');
}


const draw = (frag, gene) => {

    // Creating a svg element in html.
    const svg = d3.select('.canvas')
    .attr("width", wWidth)
    .attr("height", wHeight);

    // Creating gene chart
    const geneChart = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', margin.top)
        .attr('transform', `translate(${margin.left}, 50)`)


    // Creating the graph
    const graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

    // Creating the graphs with axis
    const xAxisGroup = graph.append('g')
        .attr('transform', `translate(0, ${graphHeight})`);
    const yAxisGroup = graph.append('g')
        .attr('transfrom', `translate(${graphWidth}, 0)`);

    // Labling the X-Y axis
    graph.append("text")
        .attr("transform",`translate(${graphWidth/2}, ${graphHeight + margin.bottom - 5})`)
        .style("text-anchor", "middle")
        .text("Position along the genome (bp)")
    graph.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (graphHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Fragment Fitness Score");


    // MIN-MAX for x axis
    const minGenePos = d3.min(frag, d => d.posFrom);
    const maxGenePos = d3.max(frag, d => d.posTo);
    
    // MIN-MAX for y axis
    const minScore = d3.min(frag, d => d.score);
    const maxScore = d3.max(frag, d => d.score);
    // const rangeScore = maxScore - minScore;

    // Setting the yScale of the data
    const yScale = d3.scaleLinear()
        .domain([minScore, maxScore])
        .range([graphHeight, 0]);
    
    // Setting the xScale of the data
    const xScale = d3.scaleLinear()
        .domain([minGenePos, maxGenePos])
        .range([0, graphWidth]);

    // Create and call all axis
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // giving the tag <rect> access to all the data
    const rects = graph.selectAll("rect")
        .data(frag);
    

    // Entering fragment onto the chart.
    rects.enter()
        .append("rect")
        .merge(rects)
        .attr('x', d => xScale(d.posFrom))
        .attr('y', d => yScale(d.score))
        .attr('height', 2)
        .attr('width', d => (xScale(d.posTo) - xScale(d.posFrom)))
        .attr('fill', 'grey');

    // graph.selectAll("rect")
    //     .data(frag)
    //     .exit()
    //     .remove();

    // giving geneChart rects.
    const genes = geneChart.selectAll('rect')
        .data(gene);

    // Entering genes onto the chart.
    genes.enter()
        .append("rect")
        .merge(genes)
        .attr('x', d => xScale(d.posFrom))
        .attr('height', 2)
        .attr('width', d => (xScale(d.posTo) - xScale(d.posFrom)))
        .attr('fill', 'red');
    
    // Labling genes.
    genes.enter()
        .append('text')
        .merge(genes)
        .attr('x', d => xScale(d.posFrom))
        .text(d => d.name);

}

export default draw;