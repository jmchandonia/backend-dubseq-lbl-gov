import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import SideBarLayout from '../../Layouts/SideBarLayout';
import HomePageLayout from '../../Layouts/HomeLayout';
import Card from '../../UI/Card/Card';
import SideBar from '../../UI/SideBar/SideBar';

class HomeScreen extends Component {

	render() {
		return (
			<Aux>
				<div className='wrapper'>
					<Header title='HomePage' />
					<SideBarLayout
						navbarContent={
							<SideBar
								content={[
									{path: '/search', name: 'Search'},
									{path: '/graphPage', name: 'Graphs'},
									{path: '/about', name: 'About'},
									{path: '/testing', name: 'Testing'}
								]}
							/>
						}
						mainContent={
							<HomePageLayout
								className='content'
								rowOneTitle={'Search'}
								rowTwoTitle={'LandingPage'}
								rowOne={
									<Aux>
										<Card title='By Organism' image={'/images/genome.svg'} body='Link to list of organisms.' link='/organisms' />
										<Card title='By Condition' image={'/images/experiment.svg'} body='Link to list of condition.' link='/conditions' />
										<Card title='By Gene' image={'/images/gene.svg'} body='Link to list of genes.' link='/genes' />
									</Aux>}
								rowTwo={
									<Aux>
										<Card title='Organims LandingPage' body='Organisms.' link='/landingPage/1' />
										<Card title='Gene LandingPage' body='Genes.' link='/landingPage/2' />
									</Aux>
								} />
						}
					/>
					<div className='push' />
				</div>
				<Footer />
			</Aux>
		)
	}
}

export default HomeScreen;