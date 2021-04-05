import React, { useEffect, useRef, useState } from 'react';
import Aux from '../../hoc/Aux';
import axios from 'axios';
import FitnessLandscapeD3 from '../D3Components/FitnessLandscapeD3';
import Select from 'react-select'

const range = 10000;

function FitnessGraph() {

	const [data, setData] = useState(null);
	const [position, setPosition] = useState({ start: 0, end: 0 });
	const [current, setCurrent] = useState(null)
	const [options, setOptions] = useState(null);
	const currentGeneId = useRef(0);
	const initialied = useRef(false);

	useEffect(() => {
		if (!initialied.current) {
			initialieSelection();
			initialied.current = true;
		}

		fetchGraphData();
		// eslint-disable-next-line
	}, [position]);


	async function initialieSelection() {
		let res = await axios('/genes/id');
		setOptions(res.data.map((e) => ({ value: `${e['gene_id']}`, label: e['name'] })));
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

	async function handleSelect(e) {

		changeCurrent(e.value);
	}

	async function handleMove(new_gene_id) {

		changeCurrent(new_gene_id);
	}

	const changeCurrent = async (gene_id) => {

		currentGeneId.current = gene_id;

		let res = await axios(`/api/genes/${gene_id}/position`);
		let { s, f } = findRange(res.data[0]);
		setPosition({ start: s, end: f })
		setCurrent(res.data[0])
	}

	function findRange({ pos_from, pos_to }) {

		let interval = (pos_to - pos_from) / 2;
		let mid = pos_from + interval;
		let s = Math.round(mid - (range / 2));
		let f = Math.round(mid + (range / 2));
		return { s, f }
	}


	return (
		<Aux>

			{/* <div><b>From: </b>{position.start}</div>
			<div><b>To:</b> {position.end}</div>
			<div>{currentGeneId.current}</div> */}

			<div className='d-flex justify-content-between'>
				<button className='btn w-25'
					onClick={() => handleMove(parseInt(currentGeneId.current) - 1)}
					style={{ backgroundColor: "#fa7f72", color: "#ffffff" }} >←</button>
				<div style={{ width: '400px' }}>
					<Select
						options={options}
						onChange={handleSelect}
					/>
				</div>
				<button className='btn w-25'
					onClick={() => handleMove(parseInt(currentGeneId.current) + 1)}
					style={{ backgroundColor: "#fa7f72", color: "#ffffff" }} >→</button>
			</div>
			<div style={{ backgroundColor: '#eeeeee', width: '100%', borderRadius: '10px', padding: '5px' }}>
				<FitnessLandscapeD3
					xAxisLable="Position along the genome (bp)"
					yAxisLable="Fragment Fitness Score"
					data={data}
					current={current}
				/>
			</div>
		</Aux>
	)
}

export default FitnessGraph;