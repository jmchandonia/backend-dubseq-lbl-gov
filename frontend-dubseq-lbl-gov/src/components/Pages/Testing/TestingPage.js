import React from 'react'
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header';
import FitnessGraph from '../../Graphs/FitnessGraph';
import HistogramD3 from '../../D3Components/HistogramD3';
import HistogramGraph from '../../Graphs/HistogramGraph';
import GenomeRadialD3 from '../../D3Components/GenomeRadialD3';



function TestingPage() {


	return (

		<Aux>
			<Header />
			{/* <FitnessLandscapeScreener seed={2168}/> */}


			{/* testgin new graph */}
			{/* <FitnessGraph /> */}


			{/* testing new Histogram. */}
			{/* <HistogramGraph /> */}


			{/* testing Radial Graph */}
			<GenomeRadialD3 />
		</Aux>
	)

}

export default TestingPage;