import React, { useState } from 'react';
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header'
import ScoreGraph from '../../D3Components/FitLandscapeClass';
import HeatMap from '../../D3Components/HeatMap';
import Layout from '../../Layouts/SideBarLayout';
import classes from './GraphsPage.module.css';
import Content from '../../../hoc/Content/Content';
import Footer from '../../UI/Footer/Footer';
import FitnessGraph from '../../Graphs/FitnessGraph';


export default function GraphsPage() {

	const [vis, setVis] = useState('heatMap')


	return (
		<Aux>
			<Header title={vis} />
			<Content>
				<Layout
					navbarContent={
						<ul>
							<li><button className={classes.link} value='heatMap' onClick={(e) => setVis(e.target.value)}>Heat Map</button></li>
							<li><button className={classes.link} value='Fitness Landscape' onClick={(e) => setVis(e.target.value)}>Fit Landscape</button></li>
							<li><button className={classes.link} value='compareExperiments' onClick={(e) => setVis(e.target.value)}>Compare Experiments</button></li>
							<li><button className={classes.link} value='compareGenes' onClick={(e) => setVis(e.target.value)}>Compare Genes</button></li>
						</ul>
					}
					mainContent={
						<Aux>
							{vis === 'home' && <h1>Page for graphs</h1>}
							{vis === 'Fitness Landscape' && <FitnessGraph />}
							{vis === 'heatMap' && <HeatMap />}
						</Aux>
					}
				/>
			</Content>
			<Footer />
		</Aux>
	)
}
