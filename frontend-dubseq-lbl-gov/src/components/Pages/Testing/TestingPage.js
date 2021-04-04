import React, { useEffect, useState } from 'react'
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header';
import Content from '../../../hoc/Content/Content';
import Footer from '../../UI/Footer/Footer';
import GeneDisplay from '../../D3Components/GeneDisplayD3';

function TestingPage() {

	const [show, setShow] = useState(false)

	let genomeLength = 1000
	let num_genes = 100

	useEffect(() => {

	}, [show])

	let randomData = randomGenes(num_genes, genomeLength)

	function randomGenes(num_genes, maxGenomeLength) {

		let elements = new Array(num_genes).fill(0)
		elements = elements.map((val, indx) => (indx == 0) ? 0 : parseInt(Math.random() * maxGenomeLength)).sort((a, b) => a - b)

		return elements.map((value, index, array) => {
			let start = value
			let end = ((index == array.length - 1) ? maxGenomeLength : array[index + 1])
			return {
				'name': Math.random().toString(36).substr(2, 3),
				'pos_from': start,
				'pos_to': end
			}
		})
	}

	function handleClick(){
		console.log('clicked', show)
		if (show == false) {
			setShow(true)
		}
		else if (show == true) {
			setShow(false)
		}
	}

	return (

		<Aux>
			<Header title='DubSeq Browser' />
			<Content>
				{show && <p>Clicked</p>}
				<GeneDisplay content={randomData} genomeLength={genomeLength} handleMouseClick={handleClick} />
			</Content>
			<Footer />
		</Aux>
	)

}

export default TestingPage;