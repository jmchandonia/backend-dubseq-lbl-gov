import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GraphPage from './components/Pages/Graphs/GraphsPage';
import HomePage from './components/Pages/Home/HomePage';
import About from './components/Pages/About/AboutPage';
import TablePage from './components/Pages/Table/TablePage';
import SearchPage from './components/Pages/Search/SearchPage';
import LandingPage from './components/Pages/Landing/LandingPage';
import TestingPage from './components/Pages/Testing/TestingPage';
import ConditionPage from './components/Pages/Condition/ConditionPage';
import GenePage from './components/Pages/Gene/GenePage';
import GenomePage from './components/Pages/Genome/GenomeList';
import GenomeLandingPage from './components/Pages/Genome/GenomeLandingPage';
import BagSeqLandingPage from './components/Pages/BagSeq/BagSeqLandingPage';
import ExperiemntLandingPage from './components/Pages/Condition/ExperimentLandingPage';


class App extends Component {
	render() {
		return (
			<Router>
				<Route exact path='/' component={HomePage} />
				<Route path='/graphPage' component={GraphPage} />
				<Route path='/about' component={About} />
				<Route path='/listPage/:id' component={TablePage} />
				<Route path='/search' component={SearchPage} />
				<Route path='/landingPage/:id' component={LandingPage} />
				<Route path='/testing' component={TestingPage} />
				<Route exact path='/organisms' component={GenomePage} />
				<Route strict path='/organisms/:id' component={GenomeLandingPage} />
				<Route path='/conditions' component={ConditionPage} />
				<Route path='/genes' component={GenePage} />
				<Route exact path='/bagseq/libraries/:id' component={BagSeqLandingPage} />
				<Route exact path='/bagseq/libraries/:id/experiments/:id_experiment' component={ExperiemntLandingPage} />
			</Router>
		);
	}
}

export default App;
