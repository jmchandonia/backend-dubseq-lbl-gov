import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

function HomePageCarousel() {

	return (
		<Carousel>
			<Carousel.Item interval={1000}>
				<img
					className="d-block rounded mx-auto"
					src="/images/fitnes.png"
					alt="First slide"
				/>
				<Carousel.Caption>
					<h3>First slide label</h3>
					<p style={{ color: "black" }}>rcnA</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item interval={1000}>
				<img
					className="d-block rounded mx-auto"
					src="/images/ecoli.png"
					alt="Second slide"
				/>
				<Carousel.Caption>
					<h3>Second slide label</h3>
					<p style={{ color: "black" }}>Ecoli</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	)
}
export default HomePageCarousel;