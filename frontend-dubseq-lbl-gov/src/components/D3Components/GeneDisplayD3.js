import React, { useEffect } from 'react'
import { select, selectAll } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { max, min } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';

const GeneDisplay = (props) => {

	let maxX = 1000
	let maxY = 200
	let svg


	let xScale = scaleLinear()
		.domain([0, props.genomeLength])
		.range([0, maxX])


	useEffect(() => {
		svg = select('.canvas')
			.append('svg')
			.attr('viewBox', `0 0 ${maxX} ${maxY}`)

		let geneChart = svg.append('g')
			.attr('class', 'geneGraph')
			.attr('width', maxX)
			.attr('height', maxY)

		geneChart.selectAll('line')
			.data(props.content)
			.enter()
			.append('line')
			.attr('x1', d => xScale(d.pos_from))
			.attr('x2', d => xScale(d.pos_to))
			.attr('y1', 100)
			.attr('y2', 150)
			.style('stroke', 'red')
			.style('stroke-width', 2)
			.style('stroke-linecap', 'round')
			.on('click', props.handleMouseClick)
			.on("mouseover", handleMouseOver)
			.on("mouseout", handleMouseOut);
	}, [props.content])

	function handleMouseOver(d, data) {

		let svg = select('.canvas').selectAll('svg')

		// Use D3 to select element, change color and size
		select(this)
			.style('stroke', 'blue')

		// Specify where to put label of text
		svg.append('text')
			.attr('id', "t" + data.pos_from + "-" + data.pos_to)
			.attr('x', xScale(data.pos_from))
			.attr('y', 80)
			.text(function () {
				return data.name;  // Value of the text
			});
	}

	function handleMouseOut(d, data) {
		select(this)
			.style('stroke', 'red')

		let svg = select('.canvas').selectAll('svg')

		svg.select("#t" + data.pos_from + "-" + data.pos_to).remove()
	}




	return (
		<div className='canvas' />
	)
}

export default GeneDisplay