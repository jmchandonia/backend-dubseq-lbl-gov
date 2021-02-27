import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

function HomePageCarousel2() {

	return (
		<div style={{ marginTop: '-17px' }}>
			<Carousel>

				<Carousel.Item interval={2500}>
					<div style={{ backgroundColor: 'gray', height: '400px' }}>
						<img
							style={{ height: '400px', width: "700px", marginRight: '200px', marginLeft: 'auto' }}
							src="/images/fitnes.png"
							className="d-block rounded"
						/>
						<Carousel.Caption>
							<div className="text-left" style={{ width: '50%' }}>
								<h3>Fitness Landscape</h3>
								<p style={{ color: "black" }}>Fragment and gene !tness dual-barcoded shotgun expression library sequencing (Dub-seq) scores. a Dub-seq fragment (strain) data for region surrounding rcnA under elevated nickel stress (y axis). Each line shows a Dub-seq fragment. Those that completely cover rcnA are in red. Both the mean and regression scores re"ect the known biology of rcnA as a nickel resistance determinant</p>
								<button type="button" className="btn btn-primary">More</button>
							</div>
						</Carousel.Caption>
					</div>
				</Carousel.Item>
				<Carousel.Item interval={2500}>
					<div style={{ backgroundColor: 'gray', height: '400px' }}>
						<img
							style={{ height: '400px', marginRight: '200px', marginLeft: 'auto' }}
							className="d-block rounded ml-auto"
							src="/images/ecoli.png"
							alt="Second slide"
						/>
						<Carousel.Caption>
							<div className="text-left" style={{ width: '75%' }}>
								<h3>Circos</h3>
								<p style={{ color: "black" }} >E. coli dual-barcoded shotgun expression library sequencing (Dub-seq) library characterization. a Center: genomic coverage of the E. coli BW25113 Dub-seq library in 10 kb windows (blue track). Black and red line-tracks represent genes essential for viability when deleted5 that are encoded on the negative and positive strands, respectively, and are covered in the Dub-seq library. Left and right: regions of the E. coli chromosome covering acrB, ompF, yfgG, ygeH, rrlD, and rpoB. Each purple line represents a Dub-seq genomic fragment (the y axis is random).</p>
								<button type="button" className="btn btn-primary">More</button>
							</div>
						</Carousel.Caption>
					</div>
				</Carousel.Item>
			</Carousel>
		</div>
	)
}
export default HomePageCarousel2;