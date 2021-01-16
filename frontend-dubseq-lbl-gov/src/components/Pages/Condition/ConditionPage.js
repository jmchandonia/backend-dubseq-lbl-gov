import React, { Component } from 'react';
import Header from '../../Header/Header';
import Aux from '../../../hoc/Aux';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import SearchBox from '../Search/SearchBox';

const RenderRow = (props) => {
	return props.keys.map((key, index) => (
		<td key={props.data[key]}>{props.data[key]}</td>
	))
}

class ConditionPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tableContent: [{ first: 1, second: 2 }],
			search: 1,
			selectionData: ['metal', 'salt', 'antibiotic']
		}
	}


	// conditional formating to have a search bar


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
		// let which = this.props.match.params.id;

		this.getExperiments();

	}

	getExperiments = async () => {

		let content = await axios.get("/api/layout")
		await this.setState({ tableContent: content.data });
	}

	didClick = () => {
		this.setState({ search: 0 })
	}

	render() {
		return (
			<Aux>
				<Header title="TablePage" />

				<div className='container'>
					{this.state.search ? <SearchBox
						title='Search Condition'
						selectionTitle='Select experiment'
						selection={this.state.selectionData}
						searchTitle='condition'
						didClick={this.didClick} /> :
					<Table content={this.state.tableContent} title='Conditions' />}
				</div>

			</Aux>
		)
	}
}


export default ConditionPage;
