import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import VerticalLayout from '../../Layouts/VerticalLayout';
import Histogram from '../../D3Components/Histogram';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

class GenomeLandingPage extends Component {



	render() {
		return (
			<Aux>

				<div className='wrapper'>
					<Header title={'landingPage'} />
					<div className='container'>

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