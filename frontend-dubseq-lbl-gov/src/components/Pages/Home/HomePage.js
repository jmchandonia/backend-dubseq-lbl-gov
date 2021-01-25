import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header';
import Footer from '../../UI/Footer/Footer';
import SideBarLayout from '../../Layouts/SideBarLayout';
import HomePageLayout from '../../Layouts/HomeLayout';
import Card from '../../UI/Card/Card';
import SideBar from '../../UI/SideBar/SideBar';
import Content from '../../../hoc/Content/Content';

class HomeScreen extends Component {

	render() {
		return (
			<Aux>
				<Header title='HomePage' />
				<Content>
					<SideBarLayout
						navbarContent={
							<SideBar
								content={[
									{ path: '/search', name: 'Search' },
									{ path: '/graphPage', name: 'Graphs' },
									{ path: '/about', name: 'About' },
									{ path: '/testing', name: 'Testing' }
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
										<Card title='BagSeqLibrary' body='BagSeq.' link='/bagseq/libraries/1' />
										<Card title='Gene LandingPage' body='Genes.' link='/landingPage/2' />
									</Aux>
								} />
						}
					/>
				</Content>
				<Footer />
			</Aux>
		)
	}
}

export default HomeScreen;