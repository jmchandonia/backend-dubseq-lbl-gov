import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

import "./HomePageCarousel.css";

function HomePageCarousel2() {

	return (
		<Carousel id='homeCarousel' >
			<Carousel.Item interval={2500} >
				<div className='carousel-content'>
					<div style={{ maxWidth: '400px' }}>
						<h3 className="carousel-text-title">Fitness Landscape</h3>
						<p style={{ color: "#0f3057" }}>Fragment and gene fitness dual-barcoded shotgun expression library sequencing (Dub-seq) scores. a Dub-seq fragment (strain) data for region surrounding rcnA under elevated nickel stress (y axis). Each line shows a Dub-seq fragment. Those that completely cover rcnA are in red. Both the mean and regression scores respect the known biology of rcnA as a nickel resistance determinant.</p>
						<button type="button" style={{ backgroundColor: "#fa7f72", color: "#ffffff" }} className="btn">More</button>
					</div>
					<img
						style={{ height: '75%', width: "auto" }}
						src="/images/fitnes.png"
						alt="First slide"
					/>
				</div>
			</Carousel.Item>
			<Carousel.Item interval={2500}>
				<div className='carousel-content'>
					<div style={{ maxWidth: '500px' }}>
						<h3 className="carousel-text-title">Circos</h3>
						<p style={{ color: "#0f3057" }} >E. coli dual-barcoded shotgun expression library sequencing (Dub-seq) library characterization. a Center: genomic coverage of the E. coli BW25113 Dub-seq library in 10 kb windows (blue track). Black and red line-tracks represent genes essential for viability when deleted5 that are encoded on the negative and positive strands, respectively, and are covered in the Dub-seq library. Left and right: regions of the E. coli chromosome covering acrB, ompF, yfgG, ygeH, rrlD, and rpoB. Each purple line represents a Dub-seq genomic fragment (the y axis is random).</p>
						<button type="button" style={{ backgroundColor: "#fa7f72", color: "#ffffff" }} className="btn">More</button>
					</div>
					<img
						style={{ height: '75%', width: "auto" }}
						src="/images/ecoli.png"
						alt="Second slide"
					/>
				</div>
			</Carousel.Item>
		</Carousel >
	)
}
export default HomePageCarousel2;