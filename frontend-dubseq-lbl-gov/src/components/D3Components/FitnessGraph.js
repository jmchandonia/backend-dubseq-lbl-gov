import React, {useState} from 'react';
import Aux from '../../hoc/Aux';
import axios from 'axios';
import FitnessLandscapeD3 from './FitnessLandscapeD3';
import Table from '../UI/Table/Table';


function FitnessGraph() {

	const [data, setData] = useState(null);

	async function addDate() {
		
		let data = {geneData: null, fragmentData: null};

		let res1 = await axios.get("/api/geneview", {
            params: {
                posFrom: 0,
                posTo: 3000
            }
		})
		data.geneData = res1.data;
		
		let res2 = await axios.get("/api/fragview", {
            params: {
                posFrom: 0,
                posTo: 3000
            }
		})
		data.fragmentData = res2.data;
		
		setData(data);
	}

	return (
		<Aux>

			<FitnessLandscapeD3 
					width={1000}
					height={600}
					xAxisLable="xAxis"
					yAxisLable="yAxis"
					data={data}
			/>
			<button onClick={addDate}>add</button>
		</Aux>
	)
}

export default FitnessGraph;