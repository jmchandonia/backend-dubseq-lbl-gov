import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Header from '../../Header/Header';
import ScoreGraph from '../../D3Components/FitLandscape';
import HeatMap from '../../D3Components/HeatMap';
import Layout from '../../Layouts/SideBarLayout';
import classes from './GraphsPage.module.css';
import Content from '../../../hoc/Content/Content';
import Footer from '../../UI/Footer/Footer';


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
				<Content>
					<Layout
						navbarContent={
							<ol>
								<li><button className={classes.link} data-value='heatMap' onClick={this.changeGraph}>Heat Map</button></li>
								<li><button className={classes.link} data-value='fitLayout' onClick={this.changeGraph}>Fit Landscape</button></li>
								<li><button className={classes.link} data-value='compareExperiments' onClick={this.changeGraph}>Compare Experiments</button></li>
								<li><button className={classes.link} data-value='compareGenes' onClick={this.changeGraph}>Compare Genes</button></li>
							</ol>
						}
						mainContent={<Aux>
							{this.state.vis === 'home' && <h1>Page for graphs</h1>}
							{this.state.vis === 'fitLayout' && <ScoreGraph />}
							{this.state.vis === 'heatMap' && <HeatMap />}
						</Aux>
						}
					/>
				</Content>
				<Footer />
			</Aux>
		)
	}

}

export default GraphsPage;