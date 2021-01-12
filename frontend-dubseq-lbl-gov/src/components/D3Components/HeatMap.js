import React, { Component } from 'react';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import * as d3 from 'd3';


class HeatMap extends Component {

	componentDidMount() {

		let margin = { top: 30, right: 30, bottom: 30, left: 30 };
		let width = 450 - margin.left - margin.right;
		let height = 450 - margin.top - margin.bottom;

		let svg = select(".canvas").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


		let myGroups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
		let myVars = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8", "v9", "v10"]

		// Build X scales and axis:
		let x = scaleBand()
			.range([0, width])
			.domain(myGroups)
			.padding(0.01);
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(axisBottom(x))

		// Build Y scales and axis:
		let y = scaleBand()
			.range([height, 0])
			.domain(myVars)
			.padding(0.01);
		svg.append("g")
			.call(axisLeft(y));

		// Build color scale
		var myColor = scaleLinear()
			.range(["white", "#69b3a2"])
			.domain([1, 100])



		//Read the data
		d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function (data) {

			svg.selectAll()
				.data(data, function (d) { return d.group + ':' + d.variable; })
				.enter()
				.append("rect")
				.attr("x", function (d) { return x(d.group) })
				.attr("y", function (d) { return y(d.variable) })
				.attr("width", x.bandwidth())
				.attr("height", y.bandwidth())
				.style("fill", function (d) { return myColor(d.value) })

		})
	}


	render() {
		return (
			<div>
				<div>HeatMap</div>
				<div className='canvas' />
			</div>
		)
	}
}

export default HeatMap;