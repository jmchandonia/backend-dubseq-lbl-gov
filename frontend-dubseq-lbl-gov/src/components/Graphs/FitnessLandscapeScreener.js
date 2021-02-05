import React, { useEffect, useState, useRef } from 'react';
import Aux from '../../hoc/Aux';
import axios from 'axios';
import FitnessLandscapeD3 from '../D3Components/FitnessLandscapeD3';
import { useTimer } from 'react-timer-hook';

const range = 10000;

export default function FitnessLandscapeScreener(props) {

	const [data, setData] = useState(null);
	const [position, setPosition] = useState({start: 0, end:0});
	const currentGeneId = useRef(props.seed);


	useEffect(() => {
		fetchGraphData();
		console.log('useEffect');
		console.log('start: ' + position.start);
		console.log('end: ' + position.end);
		// eslint-disable-next-line
	}, [position])


	let expiryTimestamp = new Date();
	expiryTimestamp.setSeconds(expiryTimestamp.getSeconds())

	const { restart } = useTimer({
		expiryTimestamp,
		onExpire: async() => {
		
			await chageCurrentGene();
			currentGeneId.current += 1;

			expiryTimestamp = new Date();
			expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + props.timeInterval)
			console.log(expiryTimestamp);
			restart(expiryTimestamp);
		}
	})

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

	const chageCurrentGene = async() => {
		
		let res = await axios(`/api/genes/${currentGeneId.current}/position`) 


		console.log(res.data[0]);
		let {start, end} = findRange(res.data[0]);
		start = Math.round(start);
		end = Math.round(end);
		setPosition({start,end})
	}
	
	function findRange({pos_from, pos_to}){
		
		let interval = (pos_to - pos_from)/2;
		let mid = pos_from + interval;
		let start = mid - (range/2);
		let end = mid + (range/2);
		return {start, end}
	}


	return (
		<Aux>
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
