import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Aux from '../../hoc/Aux'
import HistogramD3 from '../D3Components/HistogramD3'


function HistogramGraph() {

	const [data, setData] = useState(null);


	useEffect(() => {
		async function fetchData(){
			let res = await axios('/api/organisms/1/graph')
			setData(res.data);
		}

		fetchData();
	},[])


	return (
		<Aux>
			<HistogramD3 data={data} mountingId={`class_${1}`} />
		</Aux>
	)
}

export default HistogramGraph

