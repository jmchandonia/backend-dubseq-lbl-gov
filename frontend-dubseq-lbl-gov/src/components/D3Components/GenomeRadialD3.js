import React, { useEffect, useRef } from 'react';
import Aux from '../../hoc/Aux';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { max, min } from 'd3-array';
import { pointRadial, lineRadial, curveLinearClosed } from 'd3-shape';
import { uid } from 'react-uid';

let margin = 10;
let width = 500;
let height = width;
let innerRadius = width / 3;
let outerRadius = width / 2 - margin;

function GenomeRadialD3(props) {

	const initialized = useRef(false);

	useEffect(() => {
		if (initialized.current) {
			updateGraph();
		} else {
			initialize();
			initialized.current = true;
		}
		// eslint-disable-next-line
	}, [props.content])


	function initialize() {

		let svg = select('.canvas')
			.append('svg')
			.attr("viewBox", [-width / 2, -height / 2, width, height])
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round");

		let innerCirumfranceBlue = (g) => g
			.append('circle')
			.attr('stroke', 'blue')
			.attr('stroke-width', 2)
			.attr('fill', 'none')
			.attr('r', 9 * innerRadius / 10);

		svg.append('g').call(innerCirumfranceBlue);

		// let innerCirumfranceRed = (g) => g
		// 	.append('circle')
		// 	.attr('stroke', 'red')
		// 	.attr('stroke-width', 1)
		// 	.attr('fill', 'none')
		// 	.attr('r', 9 * innerRadius / 12);
		// svg.append('g').call(innerCirumfranceRed);

		let title = svg.append('g')
			.attr('transform', 'translate(-60, -10)');

		title.append('text').text('Escherichia coli');
		title.append('text').attr('transform', 'translate(0, 15)').text('BW25113');
		title.append('text').attr('transform', 'translate(0, 30)').text('Dub-seq library');


	}

	function updateGraph() {

		let svg = select('.canvas').select('svg');

		let xScale = scaleLinear()
			.domain([min(props.content, d => d.position), max(props.content, d => d.position) - 1])
			.range([0, 2 * Math.PI]);

		let yScale = scaleLinear()
			.domain([min(props.content, d => d.count), max(props.content, d => d.count)])
			.range([innerRadius, outerRadius]);

		let xAxis = (g) => g
			.attr("font-family", "sans-serif")
			.attr("font-size", 10)
			.call(g => g.selectAll('g')
				.data(xScale.ticks(10).map(d => ({ "tickval": d })))
				.join('g')
				.each(d => d.id = uid(d))
				.call(g => g.append('path')
					.attr('stroke', '#000')
					.attr('stroke-opacity', 0.2)
					.attr('d', d => (`
							M${pointRadial(xScale(d.tickval), innerRadius)}
							L${pointRadial(xScale(d.tickval), outerRadius)}
						`)
					)
				)
				.call(g => g.append('path')
					.attr('id', d => d.id)
					.attr('fill', 'none')
					// Creates a path with d attr that draws an area from current x val to pevious
					// Find a better way to find the the previus x val.
					.attr('d', (d, i) => (`
							M${pointRadial(xScale(d.tickval), innerRadius)}
							A${innerRadius}, ${innerRadius} 0, 0, 1 ${pointRadial(xScale(d.tickval - 200000), innerRadius)}
						`)
					)
				)
				.call(g => g.append('text')
					.append('textPath')
					// .attr('startOffset', )
					.attr('xlink:href', d => '#' + uid(d))
					.text(d => d.tickval/1000000 + 'Mb'))

			)

		let yAxis = (g) => g
			.attr("text-anchor", "middle")
			.attr("font-family", "sans-serif")
			.attr("font-size", 10)
			.call(g => g.selectAll("g")
				.data(yScale.ticks(2).reverse())
				.join("g")
				.attr("fill", "none")
				.call(g => g.append("circle")
					.attr("stroke", "#000")
					.attr("stroke-opacity", 0.2)
					.attr("r", yScale))
				.call(g => g.append("text")
					.attr("y", d => -yScale(d))
					.attr("dy", "0.35em")
					.attr("stroke", "#fff")
					.attr("stroke-width", 5)
					.text((xScale, i) => `${xScale.toFixed(0)}`)
					.clone(true)
					.attr("y", d => yScale(d))
					.selectAll(function () { return [this, this.previousSibling]; })
					.clone(true)
					.attr("fill", "currentColor")
					.attr("stroke", "none")))


		svg.append('g').call(xAxis);
		svg.append('g').call(yAxis);

		let line = lineRadial()
			.curve(curveLinearClosed)
			.angle(d => xScale(d.position))
			.radius(d => yScale(d.count));


		svg.append("path")
			.attr("fill", "none")
			.attr("stroke", "red")
			.attr("stroke-width", 3)
			.attr("d", line(props.content))
	}


	return (
		<Aux>
			<div className='canvas' />
		</Aux>
	)
}

export default GenomeRadialD3;