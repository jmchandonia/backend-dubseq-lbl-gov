import React, { useEffect, useState } from 'react'
import GenomeRadialD3 from '../D3Components/GenomeRadialD3'
import axios from 'axios';

function RadialGraph() {

	const [data, setData] = useState(null);

	useEffect(() => {

		async function fetchData() {

			let res = await axios('/api/libraries/1/fragmentcount');
			setData(res.data);
		}

		fetchData();
		console.log("RadialGraph Update")
	}, [])



	return (
		<GenomeRadialD3 content={data} title='Escherichia-coli BW25113 dubseq-library' />
	)
}

export default RadialGraph;