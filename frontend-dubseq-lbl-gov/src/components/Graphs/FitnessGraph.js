import React, { useEffect, useRef, useState } from 'react';
import Aux from '../../hoc/Aux';
import axios from 'axios';
import FitnessLandscapeD3 from '../D3Components/FitnessLandscapeD3';
import Select from 'react-select'

const range = 10000;

function FitnessGraph() {

	const [data, setData] = useState(null);
	const [position, setPosition] = useState({ start: 0, end: 0 });
	const currentGeneId = useRef(0);
	const initialied = useRef(false);
	const options = useRef([]);


	useEffect(async () => {
		if (!initialied.current) {
			await initialieSelection();
			console.log(options.current);
			initialied.current = true;
		}

		fetchGraphData();
		console.log('update')

	}, [position]);


	async function initialieSelection() {
		let res = await axios('/genes/id');
		options.current = res.data.map((e) => ({ value: `${e['gene_id']}`, label: e['name'] }))
	}

	async function fetchGraphData() {

		let data = { geneData: null, fragmentData: null };

		let res1 = await axios("/api/geneview", {
			params: {
				posFrom: position.start,
				posTo: position.end
			}
		})
		data.geneData = res1.data;

		let res2 = await axios("/api/fragview", {
			params: {
				posFrom: position.start,
				posTo: position.end
			}
		})
		data.fragmentData = res2.data;

		setData(data);
	}

	const handleSelect = async (e) => {
		changeCurrent(e.value)
	}

	const handleMove = async (new_gene_id) => {
		changeCurrent(new_gene_id);
	}

	const changeCurrent = async (gene_id) => {

		currentGeneId.current = gene_id;

		let res = await axios(`/api/genes/${gene_id}/position`);
		console.log(res.data[0]);
		let { s, f } = findRange(res.data[0]);
		setPosition({ start: s, end: f })
	}

	function findRange({ pos_from, pos_to }) {
		console.log('from' + pos_from)
		let interval = (pos_to - pos_from) / 2;
		let mid = pos_from + interval;
		let s = Math.round(mid - (range / 2));
		let f = Math.round(mid + (range / 2));
		return { s, f }
	}


	return (
		<Aux>
			<Select
				options={options.current}
				onChange={handleSelect}
			/>
			<div><b>From: </b>{position.start}</div>
			<div><b>To:</b> {position.end}</div>
			<div>{currentGeneId.current}</div>

			<button onClick={() => handleMove(currentGeneId.current + 1)}>Right</button>
			<button onClick={() => handleMove(currentGeneId.current - 1)}>Left</button>
			<FitnessLandscapeD3
				width={1000}
				height={600}
				xAxisLable="Position along the genome (bp)"
				yAxisLable="Fragment Fitness Score"
				data={data}
			/>
		</Aux>
	)
}

export default FitnessGraph;