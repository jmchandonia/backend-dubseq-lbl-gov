import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header';
import Footer from '../../UI/Footer/Footer';
import SideBarLayout from '../../Layouts/SideBarLayout';
import HomePageLayout from '../../Layouts/HomeLayout';
import Card from '../../UI/Card/Card';
import SideBar from '../../UI/SideBar/SideBar';
import Content from '../../../hoc/Content/Content';
import HomePageCarousel from '../../UI/HomePageCarousel/HomePageCarousel2';

class HomePage extends Component {

	render() {
		return (
			<Aux>
				<Header title='DubSeq Browser' />
				<Content>
					<HomePageCarousel />
					<SideBarLayout
						navbarContent={
							<SideBar
								content={[
									{ path: '/graphPage', name: 'Graphs' },
									{ path: '/about', name: 'About' },
									{ path: '/testing', name: 'Testing' }
								]}
							/>
						}
						mainContent={<div className='container'>
							<hr style={{ margin: '5rem' }} />
							<div style={{ backgroundColor: 'while', opacity: '0.9' }}>
								<div className='row'>
									<div className='col-7'>
										<h2>Browse Organisms</h2>
										<p style={{ color: 'gray', fontWeight: '600' }}>As a demonstration of this approach, we generate an Escherichia coli (E. coli) Dub-seq library and assayed the phe- notypic consequences of overexpressing nearly all genes on E. coli fitness under dozens of experimental conditions.</p>
									</div>
									<div className='col-5'>
										<Card title='Organisms' image={'/images/genome.svg'} link='/organisms' />
									</div>
								</div>
							</div>
							<hr style={{ margin: '5rem' }} />
							<div style={{ backgroundColor: 'while', opacity: '0.9' }}>
								<div className='row'>
									<div className='col-5'>
										<Card title='Experiments' image={'/images/experiment.svg'} link='/organisms' />
									</div>
									<div className='col-7'>
										<h2>Browse Experiments</h2>
										<p style={{ color: 'gray', fontWeight: '600' }}>In these pooled fitness experiments, the barcode abundance changes depending upon the fitness pheno- type imparted by the barcode-associated genome fragments.</p>
									</div>
								</div>
							</div>
							<hr style={{ margin: '5rem' }} />
							<div style={{ backgroundColor: 'while', opacity: '0.9' }}>
								<div className='row'>
									<div className='col-7'>
										<h2>Browse Genes</h2>
										<p style={{ color: 'gray', fontWeight: '600' }}>We show that Dub-seq yields gene fitness data that is consistent with known biology and also provides novel gene function insights. We vali- date some of these new findings by overexpressing individual genes and quantifying these strains’ fittness</p>
									</div>
									<div className='col-5'>
										<Card title='Genes' image={'/images/gene.svg'} link='/organisms' />
									</div>
								</div>
							</div>
						</div>}
					/>

				</Content>
				<Footer />
			</Aux>
		)
	}
}

export default HomePage;