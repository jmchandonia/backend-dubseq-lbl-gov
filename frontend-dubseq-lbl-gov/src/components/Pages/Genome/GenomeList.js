import React, { Component } from 'react';
import Header from '../../Header/Header';
import Aux from '../../../hoc/Aux';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import { generatePath } from 'react-router-dom';

const RenderRow = (props) => {
	return props.keys.map((key, index) => (
		<td key={props.data[key]}>{props.data[key]}</td>
	))
}

class GenomeList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tableContent: [{ first: 1, second: 2 }],
		}
	}


	getKeys(obj) {
		return Object.keys(obj)
	}

	getHeaders(obj) {

		return this.getKeys(obj[0])
			.map((key, index) => (
				<th key={key}>{key.toUpperCase()}</th>
			))
	}

	getRowsData(obj) {
		var items = obj;
		var keys = this.getKeys(obj[0]);
		return items.map((row, index) => (
			<tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
		))
	}
	componentDidMount() {

		this.getOrganisms();
	}

	getOrganisms = async () => {

		let content = await axios.get("/api/organisms")
		this.setState({ tableContent: content.data });
	}

	didClick = async (index) => {
		
		this.props.history.push({
			pathname: generatePath("/organisms/:id", {
				id: index
			})
		});
	}

	render() {
		return (
			<Aux>
				<Header title="TablePage" />
				<div className='container'>
					<Table content={this.state.tableContent} title='Organisms' onClick={this.didClick} />
				</div>
			</Aux>
		)
	}
}


export default GenomeList;
