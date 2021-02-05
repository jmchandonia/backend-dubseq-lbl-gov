import React, { useEffect, useRef } from 'react';
import Aux from '../../hoc/Aux';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max, min } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';

const svgWidth = 500;
const svgHeight = 300;
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 500 - margin.left - margin.right;
const graphHeight = 300 - margin.top - margin.bottom;

function HistogramD3(props) {

	const initialized = useRef(false);

	useEffect(async () => {
		if (initialized.current) {
			updateGraph();
		} else {

			initialize();
			initialized.current = true;
		}
	})


	async function initialize() {

		let svg = select(`.${props.mountingId}`)
			.append('svg')
			.attr("width", svgWidth)
			.attr("height", svgHeight);

		const graph = svg.append('g')
			.attr('class', 'histogramGraph')
			.attr('width', graphWidth)
			.attr('height', graphHeight)
			.attr('transform', `translate(${margin.left}, ${margin.top})`)

		graph.append('g')
			.attr('class', 'xAxisGroup')
			.attr('transform', `translate(0, ${graphHeight})`);

		graph.append('g')
			.attr('class', 'yAxisGroup')
			.attr('transfrom', `translate(${graphWidth}, 0)`);
	}


	function updateGraph() {

		let xLable = Object.keys(props.data[0])[0];
		let yLable = Object.keys(props.data[0])[1];

		// eslint-disable-next-line
		let minVal = min(props.data, d => d[yLable]);
		let maxVal = max(props.data, d => d[yLable]);

		let yScale = scaleLinear()
			.domain([0, maxVal])
			.range([graphHeight, 0]);

		let xScale = scaleBand()
			.domain(props.data.map(i => i[xLable]))
			.range([0, graphWidth])
			.paddingInner(0.2)
			.paddingOuter(0.2);

		let graph = select(`.${props.mountingId}`).select('.histogramGraph');

		graph.append('text')
			.attr('transform', `translate(${graphWidth / 2}, ${graphHeight + margin.bottom - 5})`)
			.style("text-anchor", "middle")
			.text(xLable);

		graph.append('text')
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left)
			.attr("x", 0 - (graphHeight / 2))
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text(yLable);

		const xAxis = axisBottom(xScale);
		const yAxis = axisLeft(yScale);
		graph.select('.xAxisGroup').call(xAxis);
		graph.select('.yAxisGroup').call(yAxis);

		let rects = graph.selectAll('rect')
			.data(props.data);

		rects.attr('width', xScale.bandwidth)
			.attr('height', d => yScale(d[yLable]))
			.attr('fill', 'orange')
			.attr('x', d => xScale(d[xLable]))
			.attr('y', d => (graphHeight - yScale(d[yLable])));

		rects.enter()
			.append('rect')
			.attr('width', xScale.bandwidth)
			.attr('height', d => (graphHeight - yScale(d[yLable])))
			.attr('fill', 'orange')
			.attr('x', d => xScale(d[xLable]))
			.attr('y', d => (yScale(d[yLable])));


	}


	return (
		<Aux>
			<div className={props.mountingId} />
		</Aux>
	)

}

export default HistogramD3;