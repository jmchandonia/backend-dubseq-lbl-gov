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

		select('.canvas')
			.append('svg')
			.attr("viewBox", [-width / 2, -height / 2, width, height])
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round");;
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
				.data(xScale.ticks(20).map(d => ({ "tickval": d })))
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
					.attr('fill', 'red')
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
					.attr('startOffset', 6)
					.attr('xlink:href', d => '#' + uid(d))
					.text(d => d.tickval))

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

		let innerCirumfrance = (g) => g
			.append('circle')
			.attr('stroke', 'blue')
			.attr('stroke-width', 5)
			.attr('fill', 'none')
			.attr('r', 9 * innerRadius / 10);

		let title = svg.append('g')
			.attr('transform', 'translate(-60, -10)');

		title.append('text').text('Escherichia coli');
		title.append('text').attr('transform', 'translate(0, 15)').text('BW25113');
		title.append('text').attr('transform', 'translate(0, 30)').text('Dub-seq library');

		svg.append('g').call(xAxis);
		svg.append('g').call(yAxis);
		svg.append('g').call(innerCirumfrance);

		let line = lineRadial()
			.curve(curveLinearClosed)
			.angle(d => xScale(d.position))
			.radius(d => yScale(d.count));


		svg.append("path")
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-width", 0.5)
			.attr("d", line(props.content))
	}


	return (
		<Aux>
			<div className='canvas' />
		</Aux>
	)
}

export default GenomeRadialD3;