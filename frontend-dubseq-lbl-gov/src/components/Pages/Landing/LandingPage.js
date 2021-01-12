import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import VerticalLayout from '../../Layout/VerticalLayout';
import Header from '../../Header/Header';
import Table from '../../UI/Table/Table';
import HorizontalLayout from '../../Layout/HorizontalLayout';
import Histogram from '../../D3Components/Histogram';



class LandingPage extends Component {



	render() {

		let firstContent = [
			{
				"gene": "recA",
				"organism": "ecoli",
				"description": "description",
				"avg_fitness": 10
			},
			{
				"gene": "recA",
				"organism": "ecoli2",
				"description": "description",
				"avg_fitness": 20
			}
		]

		let secondContent = [
			{
				"gene": "reca",
				"organism": "ecoli3",
				"description": "description",
				"avg_fitness": 30
			}
		]

		let thirdContent = [
			{
				"gene": "reca",
				"organism": "ecoli3",
				"description": "description",
				"avg_fitness": 30
			},
			{
				"gene": "reca",
				"organism": "ecoli3",
				"description": "description",
				"avg_fitness": 30
			},
			{
				"gene": "reca",
				"organism": "ecoli3",
				"description": "description",
				"avg_fitness": 30
			}
		]

		let pageContent_H = [
			<Table content={firstContent} title='left' />,
			<Table content={secondContent} title='mid' />,
			<Table content={thirdContent} title='right' />
		]

		let pageContent_V = [
			<Table content={firstContent} title='first' />,
			<HorizontalLayout content={[<Histogram title="f"/>, <Histogram title="s"/>]} contentProperty={[50]} />,
			<HorizontalLayout content={pageContent_H} contentProperty={[20, 20, 20]} />
		]

		return (
			<Aux>
				<Header title="LandingPage" />
				<div className='container'>
					<VerticalLayout content={pageContent_V} />
				</div>
			</Aux>
		)
	}

}

export default LandingPage;