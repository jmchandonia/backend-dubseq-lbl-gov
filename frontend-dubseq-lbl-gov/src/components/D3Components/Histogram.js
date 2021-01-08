import React, { Component } from 'react';
import { select } from 'd3-selection';
import { max, min } from 'd3-array';
import { scaleLinear, scaleBand } from 'd3-scale';
import Aux from '../../hoc/Aux';
import axios from 'axios';
import { axisBottom, axisLeft } from 'd3';



const svgWidth = 500;
const svgHeight = 300;
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 500 - margin.left - margin.right;
const graphHeight = 300 - margin.top - margin.bottom;

class Histogram extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					"name": "Gera",
					"age": 22
				}
			]
		};
	}


	// Callback function
	getData = () => {
		// must return the responce for synchronization.
		return axios.get('../records.json')
			.then((res) => {
				this.setState({ data: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	componentDidMount() {


		let svg = select('.canvas' + this.props.title)
			.append('svg')
			.attr('width', svgWidth)
			.attr('height', svgHeight);

		const graph = svg.append('g')
			.attr('class', 'histogramGraph' + this.props.title)
			.attr('width', graphWidth)
			.attr('height', graphHeight)
			.attr('transform', `translate(${margin.left}, ${margin.top})`)

		// Creating the graphs with axis
		graph.append('g')
			.attr('class', 'xAxisGroup' + this.props.title)
			.attr('transform', `translate(0, ${graphHeight})`);
		graph.append('g')
			.attr('class', 'yAxisGroup' + this.props.title)
			.attr('transfrom', `translate(${graphWidth}, 0)`);

		// Synchronizing with the callback.
		this.getData()
			.then(this.updateChart);
	}

	updateChart = () => {

		let minVal = min(this.state.data, d => d.age);
		let maxVal = max(this.state.data, d => d.age);

		let yScale = scaleLinear()
			.domain([0, maxVal])
			.range([graphHeight, 0]);

		let xScale = scaleBand()
			.domain(this.state.data.map(i => i.name))
			.range([0, graphWidth])
			.paddingInner(0.2)
			.paddingOuter(0.2);

		let graph = select('.histogramGraph' + this.props.title);

		let rects = graph.selectAll('rect')
			.data(this.state.data);

		// rewriting the already exsisting <rect> tag
		rects.attr('width', xScale.bandwidth)
			.attr('height', d => yScale(d.age))
			.attr('fill', 'orange')
			.attr('x', d => xScale(d.name))
			.attr('y', d => (graphHeight - yScale(d.age)));

		// adding new <rect> elements to the dom
		rects.enter()
			.append('rect')
			.attr('width', xScale.bandwidth)
			.attr('height', d => (graphHeight - yScale(d.age)))
			.attr('fill', 'orange')
			.attr('x', d => xScale(d.name))
			.attr('y', d => (yScale(d.age)));

		graph.append('text')
			.attr('transform', `translate(${graphWidth / 2}, ${graphHeight + margin.bottom - 5})`)
			.style("text-anchor", "middle")
			.text("X-Axis");

		graph.append('text')
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left)
			.attr("x", 0 - (graphHeight / 2))
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.text("Y-Axis");

		const xAxis = axisBottom(xScale);
		const yAxis = axisLeft(yScale);
		select('.xAxisGroup' + this.props.title).call(xAxis);
		select('.yAxisGroup' + this.props.title).call(yAxis);
	}

	render() {

		return (
			<Aux>
				<div className={"canvas" + this.props.title} />
			</Aux>
		)
	}

}

export default Histogram;