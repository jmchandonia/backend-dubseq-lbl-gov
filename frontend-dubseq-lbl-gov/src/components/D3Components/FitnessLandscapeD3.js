import React, { useEffect, useRef } from 'react';
import Aux from '../../hoc/Aux';
import { select } from 'd3-selection';
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

			initialize();
			initialized.current = true;
		}
		// eslint-disable-next-line
	}, [props.data])

	function initialize() {

		graphWidth = props.width - margin.left - margin.right;
		graphHeight = props.height - margin.top - margin.bottom;

		let svg = select('.canvas')
			.append('svg')
			.attr("width", props.width)
			.attr("height", props.height);

		svg.append('defs')
			.append('marker')
			.attr('id', 'arrow')
			.attr('viewBox', [0, 0, 5, 5])
			.attr('refX', 5)
			.attr('refY', 2.5)
			.attr('markerWidth', 5)
			.attr('markerHeight', 5)
			.attr('orient', 'auto-start-reverse')
			.append('path')
			.attr('d', 'M0,0L5,2.5L0,5')
			.attr('stroke', 'red')
			.style('fill', 'none');

		// eslint-disable-next-line
		let geneChart = svg.append('g')
			.attr('class', 'geneChart')
			.attr('width', graphWidth)
			.attr('height', margin.top)
			.attr('transform', `translate(${margin.left}, 50)`);

		let lables = svg.append('g')
			.attr('width', graphWidth)
			.attr('height', graphHeight)
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

		svg.append('g')
			.attr('class', 'fragmentChart')
			.attr('width', graphWidth)
			.attr('height', graphHeight)
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

		lables.append('g')
			.attr('class', 'xAxisGroup')
			.attr('transform', `translate(0, ${graphHeight})`);

		lables.append('g')
			.attr('class', 'yAxisGroup')
			.attr('transfrom', `translate(${graphWidth}, 0)`);

		lables.append("text")
			.attr("transform", `translate(${graphWidth / 2}, ${graphHeight + margin.bottom - 5})`)
			.style("text-anchor", "middle")
			.text(props.xAxisLable);

		lables.append("text")
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

		// HardCode the minimum and the maximum of possible fragment scores.
		let yScale = scaleLinear()
			.domain([-5, 12])
			.range([graphHeight, 0]);

		// Suggest the number of ticks with axis().ticks(#)
		let xAxis = axisBottom(xScale).ticks(10);
		select('.xAxisGroup').call(xAxis);
		let yAxis = axisLeft(yScale);
		select('.yAxisGroup').call(yAxis);


		let fragmentChart = select('.fragmentChart');

		// Removing all from unused remove selection
		fragmentChart.selectAll('line').remove();

		// Adding fragments
		fragmentChart.selectAll('line')
			.data(props.data.fragmentData)
			.enter()
			.append('line')
			.attr('x1', d => xScale(d.posFrom))
			.attr('x2', d => xScale(d.posTo))
			.attr('y1', d => yScale(d.score))
			.attr('y2', d => yScale(d.score))
			.style('stroke', 'gray')
			.style('stroke-width', 2);


		let geneChart = select('.geneChart')

		// Remove all children of the 'g' being updated
		geneChart.selectAll('g').remove();

		// Adding blocks to hold gene and names
		geneChart.selectAll('g')
			.data(props.data.geneData)
			.enter()
			.append('g')
			.attr('class', 'geneTag')
			.attr('width', d => (xScale(d.posTo) - xScale(d.posFrom)))
			.attr('transform', d => `translate(${xScale(d.posFrom)}, 0)`);

		// adding gene lines
		geneChart.selectAll('g')
			.append('line')
			.attr('x2', d => (xScale(d.posTo) - xScale(d.posFrom)))
			.style('stroke', 'red')
			.style('stroke-width', 2)
			.attr('marker-start', d => ((d.strand === '+') ? '' : 'url(#arrow)'))
			.attr('marker-end', d => ((d.strand === '-') ? '' : 'url(#arrow)'));

		// adding gene name
		geneChart.selectAll('g')
			.append('text')
			.attr('y', -4)
			.text(d => d.name);

		// remove genetags that are no longer in selection 
		geneChart.selectAll('g')
			.data(props.data.geneData)
			.exit()
			.remove();
	}

	return (
		<Aux>
			<div className='canvas' />
		</Aux>
	)
}

export default FitnessLandscapeD3;