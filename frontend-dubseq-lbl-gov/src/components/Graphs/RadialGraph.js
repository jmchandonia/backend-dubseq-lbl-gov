import React, { useEffect, useState } from 'react'
import GenomeRadialD3 from '../D3Components/GenomeRadialD3'
import axios from 'axios';

function RadialGraph() {

	const [data, setData] = useState(null);

	useEffect(() => {

		fetchData();
		console.log("RadialGraph Update")
	}, [])

	async function fetchData() {

		let res = await axios('/api/libraries/1/fragmentcount');
		setData(res.data);
	}

	return (
		<GenomeRadialD3 content={data} />
	)
}

export default RadialGraph;