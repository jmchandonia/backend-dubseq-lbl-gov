import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Header from '../../Header/Header';
import ScoreGraph from '../../D3Components/FitLandscape';
import HeatMap from '../../D3Components/HeatMap';
import Layout from '../../Layout/Layout';

class GraphsPage extends Component {

	state = {
		vis: 'home'
	}

	changeGraph = (e) => {
		this.setState({ vis: e.target.getAttribute('data-value') })
	}



	render() {
		return (
			<Aux>
				<Header title='Graphs' />

				<Layout
					navbarContent={
						<ol>
							<li><button className='link' data-value='heatMap' onClick={this.changeGraph}>Heat Map</button></li>
							<li><button className='link' data-value='fitLayout' onClick={this.changeGraph}>Fit Landscape</button></li>
							<li><button className='link' data-value='compareExperiments' onClick={this.changeGraph}>Compare Experiments</button></li>
							<li><button className='link' data-value='compareGenes' onClick={this.changeGraph}>Compare Genes</button></li>
						</ol>
					}
					mainContent={<Aux>
						{this.state.vis === 'home' && <h1>Page for graphs</h1>}
						{this.state.vis === 'fitLayout' && <ScoreGraph />}
						{this.state.vis === 'heatMap' && <HeatMap />}
					</Aux>
					}
				/>
			</Aux>
		)
	}

}

export default GraphsPage;