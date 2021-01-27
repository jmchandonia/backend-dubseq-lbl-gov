import React, { useEffect, useState, useRef } from 'react';
import { select } from 'd3-selection';
import Aux from '../../hoc/Aux';
import { scaleLinear } from 'd3-scale';
import { max, min } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';

const margin = { top: 100, right: 20, bottom: 50, left: 50 };

let graphWidth = 0;
let graphHeight = 0;

function FitnessLandscapeD3(props) {

	const initialized = useRef(false);
	useEffect(() => {
		if (initialized.current) {
			updateGraph();
		} else {

			graphWidth = props.width - margin.left - margin.right;
			graphHeight = props.height - margin.top - margin.bottom;

			initialize();
			initialized.current = true;
		}
	},[props.data])

	function initialize() {

		let svg = select('.canvas')
            .append('svg')
            .attr("width", props.width)
			.attr("height", props.height);
			
		let geneChart = svg.append('g')
			.attr('class', 'geneChart')
			.attr('width', graphWidth)
			.attr('height', margin.top)
			.attr('transform', `translate(${margin.left}, 50)`);

		let fragmentChart = svg.append('g')
            .attr('class', 'fragmentChart')
            .attr('width', graphWidth)
            .attr('height', graphHeight)
			.attr('transform', `translate(${margin.left}, ${margin.top})`);
			
		fragmentChart.append('g')
            .attr('class', 'xAxisGroup')
			.attr('transform', `translate(0, ${graphHeight})`);
		
		fragmentChart.append('g')
            .attr('class', 'yAxisGroup')
			.attr('transfrom', `translate(${graphWidth}, 0)`);
			
		fragmentChart.append("text")
            .attr("transform", `translate(${graphWidth / 2}, ${graphHeight + margin.bottom - 5})`)
            .style("text-anchor", "middle")
			.text(props.xAxisLable);
			
		fragmentChart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (graphHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(props.yAxisLable);
	}

	function updateGraph() {

		console.log("update graph");

		let minGenePos = min(props.data.fragmentData, d => d.posFrom);
		let maxGenePos = max(props.data.fragmentData, d => d.posTo);
		
		let minScore = min(props.data.fragmentData, d => d.score);
		let maxScore = max(props.data.fragmentData, d => d.score);
		
		let xScale = scaleLinear()
            .domain([minGenePos, maxGenePos])
			.range([0, graphWidth]);
			
		let yScale = scaleLinear()
            .domain([minScore, maxScore])
			.range([graphHeight, 0]);
			
		let xAxis = axisBottom(xScale);
		select('.xAxisGroup').call(xAxis);
		let yAxis = axisLeft(yScale);
		select('.yAxisGroup').call(yAxis);

		select('.fragmentChart').selectAll('rect')
            .data(props.data.fragmentData)
            .enter()
            .append('rect');

		select('.fragmentChart').selectAll('rect')
            .data(props.data.fragmentData)
            .exit()
			.remove();
			
		select('.fragmentChart').selectAll('rect')
            .data(props.data.fragmentData)
            .attr('x', d => xScale(d.posFrom))
            .attr('y', d => yScale(d.score))
            .attr('height', 2)
            .attr('width', d => (xScale(d.posTo) - xScale(d.posFrom)))
			.attr('fill', 'grey');
			
		select('.geneChart').selectAll('rect')
            .data(props.data.geneData)
            .enter()
			.append("rect");
			
		select('.geneChart').selectAll('rect')
            .data(props.data.geneData)
            .exit()
			.remove();
			
		select('.geneChart').selectAll('rect')
            .data(props.data.geneData)
            .attr('x', d => xScale(d.posFrom))
            .attr('height', 2)
            .attr('width', d => (xScale(d.posTo) - xScale(d.posFrom)))
			.attr('fill', 'red');
			
		select('.geneChart').selectAll('text')
            .data(props.data.geneData)
            .enter()
			.append('text');
			
		select('.geneChart').selectAll('text')
            .data(props.data.geneData)
            .exit()
			.remove();
			
		select('.geneChart').selectAll('text')
            .data(props.data.geneData)
            .attr('x', d => xScale(d.posFrom))
            .text(d => d.name);
	}

	return (
		<Aux>
			<div className='canvas' />
		</Aux>
	)
}

export default FitnessLandscapeD3;