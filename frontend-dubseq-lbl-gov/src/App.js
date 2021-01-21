import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import GenomeLandingPage from "./components/Pages/Genome/GenomeLandingPage";


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
				<Switch>
					{/* <Route path='/organisms' component={GenomePage} /> */}
					<Route exact strict path='/organisms' component={GenomePage} />
					<Route path='/organisms/' component={GenomeLandingPage} />
				</Switch>
				<Route path='/conditions' component={ConditionPage} />
				<Route path='/genes' component={GenePage} />
			</Router>
		);
	}
}

export default App;
