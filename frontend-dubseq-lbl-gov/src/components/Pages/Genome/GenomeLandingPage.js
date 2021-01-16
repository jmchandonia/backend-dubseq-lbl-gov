import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import VerticalLayout from '../../Layouts/VerticalLayout';
import Histogram from '../../D3Components/Histogram';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { useLocation } from "react-router-dom";


function useQuery(){
	return new URLSearchParams(useLocation().search);
}


function QueryScreen() {

	let query = useQuery();
	return (
		<div>
			<h1>{query.get("id")}</h1>
		</div>
	)
}

class GenomeLandingPage extends Component {


	render() {

		return (
			<Aux>

				<div className='wrapper'>
					<Header title={'GenomeLandingPage'} />
					<div className='container'>
						{/* <h2>{this.props.match.params.id}</h2> */}
						<QueryScreen />
						<VerticalLayout content={[<Histogram />]} />
						<div className='push' />
					</div>
				</div>
				<Footer />
			</Aux>
		)
	}

}

export default GenomeLandingPage;