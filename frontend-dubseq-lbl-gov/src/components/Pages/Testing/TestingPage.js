import React from 'react'
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header';
import FitnessGraph from '../../Graphs/FitnessGraph';
import FitnessLandscapeScreener from '../../Graphs/FitnessLandscapeScreener';



function TestingPage() {


	return (

		<Aux>
			<Header />
			{/* <FitnessLandscapeScreener seed={2168}/> */}


			{/* testgin new graph */}
			<FitnessGraph />
		</Aux>
	)

}

export default TestingPage;