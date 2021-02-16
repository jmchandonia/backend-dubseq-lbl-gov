import React, { useEffect, useRef } from 'react';
import Aux from '../../hoc/Aux';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { max, min } from 'd3-array';
import { pointRadial, lineRadial, curveLinearClosed, curveMonotoneX } from 'd3-shape';
import { uid } from 'react-uid';
import axios from 'axios';

// Last datapoint should be fake.
let data = [
	{ x: 0, y: 51.5 },
	{ x: 1, y: 50.0 },
	{ x: 2, y: 49.0 },
	{ x: 3, y: 50.5 },
	{ x: 4, y: 50.75 },
	{ x: 5, y: 51.0 },
	{ x: 6, y: 50.0 },
	{ x: 7, y: 51.0 },
	{ x: 8, y: 52.75 },
	{ x: 9, y: 52.75 },
	{ x: 10, y: 53.25 },
	{ x: 11, y: 51.0 },
	{ x: 12, y: 50.0 },
	{ x: 13, y: 51.75 },
	{ x: 14, y: 50.0 },
	{ x: 15, y: 52.0 },
	{ x: 16, y: 52.0 },
	{ x: 17, y: 52.0 },
	{ x: 18, y: 52.25 },
	{ x: 19, y: 52.3 },
	{ x: 20 }
]

let margin = 10;
// let width = 954;
let width = 500;
let height = width;
let innerRadius = width / 3;
let outerRadius = width / 2 - margin;

function GenomeRadialD3(props) {

	const initialized = useRef(false);

	useEffect(async () => {
		if (initialized.current) {
			console.log("updateGraph");
			
		} else {
			initialize();
			initialized.current = true;
			await fetchData();
			updateGraph();
		}
	},[])

	async function fetchData() {
		let res = await axios('/api/libraries/1/fragmentcount');
		data = res.data.map(d => ({x: d.position, y: d.count}));
		console.log(data);
	}

	function initialize() {

		let svg = select('.canvas')
			.append('svg')
			.attr("viewBox", [-width / 2, -height / 2, width, height])
			.attr("stroke-linejoin", "round")
			.attr("stroke-linecap", "round");;
	}

	function updateGraph() {

		let svg = select('.canvas').select('svg');

		let xScale = scaleLinear()
			.domain([min(data, d => d.x), max(data, d => d.x) - 1])
			.range([0, 2 * Math.PI]);

		let yScale = scaleLinear()
			.domain([min(data, d => d.y), max(data, d => d.y)])
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
					// Fix the way A is seeing the previous tick
					.attr('d', (d, i) => (`
							M${pointRadial(xScale(d.tickval), innerRadius)}
							A${innerRadius}, ${innerRadius} 0, 0, 1 ${pointRadial(xScale(d.tickval - 1), innerRadius)}
						`)
					)
				)
				.call(g => g.append('text')
					.append('textPath')
					.attr('startOffset', 6)
					.each(d => console.log(d.id.href))
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
			.angle(d => xScale(d.x))

		svg.append("path")
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-width", 1.5)
			.attr("d", line
				.radius(d => yScale(d.y))
				(data));
	}


	return (
		<Aux>
			<div style={{ width: '800px' }}>
				<div className='canvas' />
			</div>
		</Aux>
	)
}

export default GenomeRadialD3;