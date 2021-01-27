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
				<Header title='DubSeq Browser' />
				<Content>
					<SideBarLayout
						navbarContent={
							<SideBar
								content={[
									// { path: '/search', name: 'Search' },
									{ path: '/graphPage', name: 'Graphs' },
									{ path: '/about', name: 'About' },
									{ path: '/testing', name: 'Testing' }
								]}
							/>
						}
						mainContent={
							<HomePageLayout
								className='content'
								// rowOneTitle={'Search'}
								// rowTwoTitle={'LandingPage'}
								rowOne={
									<Aux>
										<Card title='Fitness Landscape' image={'/images/fitnes.png'} imageClass={'img_large'} link='/graphPage'/>
									</Aux>}
								rowTwo={
									<Aux>
										<Card title='Organisms' image={'/images/genome.svg'} link='/organisms' />
										<Card title='Conditions' image={'/images/experiment.svg'} link='/conditions' />
										<Card title='Genes' image={'/images/gene.svg'} link='/genes' />
									</Aux>
								}
								 />
						}
					/>
				</Content>
				<Footer />
			</Aux>
		)
	}
}

export default HomeScreen;