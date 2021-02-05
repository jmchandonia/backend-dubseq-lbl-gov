import React from 'react'
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header';
// import FitnessGraph from '../../Graphs/FitnessGraph';
import HistogramD3 from '../../D3Components/HistogramD3';
import HistogramGraph from '../../Graphs/HistogramGraph';



function TestingPage() {


	return (

		<Aux>
			<Header />
			{/* <FitnessLandscapeScreener seed={2168}/> */}


			{/* testgin new graph */}
			{/* <FitnessGraph /> */}


			{/* testing new Histogram. */}
			<HistogramGraph />
		</Aux>
	)

}

export default TestingPage;