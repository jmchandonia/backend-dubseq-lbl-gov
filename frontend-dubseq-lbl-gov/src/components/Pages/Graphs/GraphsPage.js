import React, { useEffect, useState } from 'react';
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header'
import ScoreGraph from '../../D3Components/FitLandscapeClass';
import { BrowserRouter as Router, Route, Link, Switch, useRouteMatch, useParams } from "react-router-dom";
import HeatMap from '../../D3Components/HeatMap';
import Layout from '../../Layouts/SideBarLayout';
import classes from './GraphsPage.module.css';
import Content from '../../../hoc/Content/Content';
import Footer from '../../UI/Footer/Footer';
import FitnessGraph from '../../Graphs/FitnessGraph';


const GraphsPage = () => {

	const [vis, setVis] = useState('home')
	let { path, url } = useRouteMatch()

	return (
		<Aux>
			<Header title={vis} />
			<Content>
				<Layout
					navbarContent={
						<ul>
							<li>
								<Link className={classes.link} to={`${url}/heatmap`} >Heat Map</Link>
							</li>
							<li>
								<Link className={classes.link} to={`${url}/fitness`} >Fit Landscape</Link>
							</li>
						</ul>
					}
					mainContent={
						<Switch>
							<Route exact path={path}>
								<h3>Please select a graph</h3>
							</Route>
							<Route path={`${path}/heatmap`} component={HeatMap} />
							<Route path={`${path}/fitness`} component={FitnessGraph} />
							{/* <Route path={`${path}/:graphId`}>
								<Graphs />
							</Route> */}
						</Switch>
					}
				/>
			</Content>
			<Footer />
		</Aux>
	)
}

function Graphs() {

	let { graphId } = useParams();

	return (
		<div>
			<h3>{graphId}</h3>
		</div>
	)
}

export default GraphsPage;