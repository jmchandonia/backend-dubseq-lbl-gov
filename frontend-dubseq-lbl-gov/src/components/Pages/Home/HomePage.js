import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import { Link } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import HomePageLayout from '../../Layout/HomeLayout';
import GenomeSVG from '../../../images/genome.svg';
import GeneSVG from '../../../images/gene.svg';
import ExperimentSVG from '../../../images/experiment.svg';
import Card from '../../UI/Card/Card';
import './HomePage.css';


class HomeScreen extends Component {

	render() {
		return (
			<Aux>
				<Header title='HomePage' />
				<Layout navbarContent={
					<ul>
						<li><Link className='link' to='/search'>Search</Link></li>
						<li><Link className='link' to='/graphPage'>Graphs</Link></li>
						<li><Link className='link' to='/about'>About</Link></li>
						<li><div className='link'>Stats</div></li>
					</ul>}
					mainContent={
						<HomePageLayout
							rowOneTitle={'Search'}
							rowTwoTitle={'LandingPage'}
							rowOne={
								<Aux>
									<Card title='By Organism' image={GenomeSVG} body='Link to list of organisms.' link='/listPage/1' />
									<Card title='By Experiment' image={ExperimentSVG} body='Link to list of experiments.' link='/listPage/2' />
									<Card title='By Gene' image={GeneSVG} body='Link to list of genes.' link='/listPage/3'/>
								</Aux>}
							rowTwo={
								<Aux>
									<Card title='Organims LandingPage' body='Organisms.' link='/landingPage/1'/>
									<Card title='Gene LandingPage' body='Genes.' link='/landingPage/2' />
								</Aux>
							} />
					}
				/>
				<Footer />
			</Aux>
		)
	}
}

export default HomeScreen;