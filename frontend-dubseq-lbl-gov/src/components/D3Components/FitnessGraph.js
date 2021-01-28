import React, { useEffect, useState } from 'react';
import Aux from '../../hoc/Aux';
import axios from 'axios';
import FitnessLandscapeD3 from './FitnessLandscapeD3';
import Select from 'react-select'

const range = 10000;

function FitnessGraph() {

	const [data, setData] = useState(null);
	const [start, setStart] = useState(0);
	const [end, setEnd] = useState(0);
	const [currentGeneId, setCurrentGeneId] = useState('');

	const options = [
		{ value: "2168", label: 'thiM' },
		{ value: "2169", label: 'rcnR' },
		{ value: "2170", label: 'rcnA' },
		{ value: "2171", label: 'rcnB' },
		{ value: "2172", label: 'yehA' }
	]

	useEffect(() => {
		fetchGraphData();
	}, [start, end])


	async function fetchGraphData(evn) {

		if (evn != null) evn.preventDefault();

		let data = { geneData: null, fragmentData: null };

		let res1 = await axios("/api/geneview", {
			params: {
				posFrom: start,
				posTo: end
			}
		})
		data.geneData = res1.data;

		let res2 = await axios("/api/fragview", {
			params: {
				posFrom: start,
				posTo: end
			}
		})
		data.fragmentData = res2.data;

		setData(data);
	}

	const handleSelect = async(e) => {
		setCurrentGeneId(e.value)
		
		let res = await axios(`/api/genes/${e.value}/position`) 

		let {s, f} = findRange(res.data[0]);
		setStart(s);
		setEnd(f)
	}

	function findRange({pos_from, pos_to}){
		
		let interval = (pos_to - pos_from)/2;
		let mid = pos_from + interval;
		let s = mid - (range/2);
		let f = mid + (range/2);
		return {s, f}
	}


	return (
		<Aux>
			<form>
				<label for="genes">Current:</label>
				<Select 
					options={options}
					onChange={handleSelect}
				/>
			</form>
			<form onSubmit={fetchGraphData}>
				<label htmlFor="startSelect">start:</label>
				<input type="number"
					value={start}
					id="startSelect"
					onChange={(e) => setStart(e.target.value)}
				/>
				<label htmlFor="endSelect">end:</label>
				<input type="number"
					value={end}
					id="endSelect"
					onChange={(e) => setEnd(e.target.value)}
				/>
				<button type="submit" className='btn btn-outline-dark'>view</button>
			</form>
			<FitnessLandscapeD3
				width={1000}
				height={600}
				xAxisLable="xAxis"
				yAxisLable="yAxis"
				data={data}
			/>
		</Aux>
	)
}

export default FitnessGraph;