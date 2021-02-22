import React from 'react'
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header';
import FitnessGraph from '../../Graphs/FitnessGraph';
import HistogramD3 from '../../D3Components/HistogramD3';
import HistogramGraph from '../../Graphs/HistogramGraph';
import GenomeRadialD3 from '../../D3Components/GenomeRadialD3';
import RadialGraph from '../../Graphs/RadialGraph';
import Content from '../../../hoc/Content/Content';
import Footer from '../../UI/Footer/Footer';
import Carousel from 'react-bootstrap/Carousel'



function TestingPage() {


	return (

		// <Aux>
		// 	<Header />
		// 	{/* <FitnessLandscapeScreener seed={2168}/> */}


		// 	{/* testgin new graph */}
		// 	{/* <FitnessGraph /> */}


		// 	{/* testing new Histogram. */}
		// 	{/* <HistogramGraph /> */}


		// 	{/* testing Radial Graph */}
		// 	<RadialGraph />
		// </Aux>
		<Aux>
			<Header title='DubSeq Browser' />
			<Content>
				<div style={{ marginTop: '-17px' }}>
					<Carousel>

						<Carousel.Item interval={2500}>
							<div style={{ backgroundColor: 'gray', height: '400px'}}>
								<img
									style={{ height: '400px' }}
									src="/images/fitnes.png"
									className="d-block rounded ml-auto"
								/>
								<Carousel.Caption>
									<div className="text-left">
										<h3>First slide label</h3>
										<p style={{ color: "black" }}>rcnA</p>
									</div>
								</Carousel.Caption>
							</div>
						</Carousel.Item>
						<Carousel.Item interval={2500}>
							<div style={{ backgroundColor: 'gray', height: '400px' }}>
								<img
									style={{ height: '400px' }}
									className="d-block rounded ml-auto"
									src="/images/ecoli.png"
									alt="Second slide"
								/>
								<Carousel.Caption>
									<div className="text-left">
										<h3>Second slide label</h3>
										<p style={{ color: "black" }}>Ecoli</p>
									</div>
								</Carousel.Caption>
							</div>
						</Carousel.Item>
					</Carousel>
				</div>
			</Content>
			<Footer />
		</Aux>
	)

}

export default TestingPage;