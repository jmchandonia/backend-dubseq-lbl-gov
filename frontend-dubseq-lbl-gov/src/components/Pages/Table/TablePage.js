import React, { Component } from 'react';
import Header from '../../Header/Header';
import Aux from '../../../hoc/Aux';
import axios from 'axios';
import Table from '../../UI/Table/Table';

const RenderRow = (props) => {
	return props.keys.map((key, index) => (
		<td key={props.data[key]}>{props.data[key]}</td>
	))
}


class TablePage extends Component {

	constructor(props) {
		super(props)
		this.state ={
			tableContent: [{first:1, second:2}]
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
	componentDidMount(){
		let which = this.props.match.params.id;
		console.log(which);

		switch(which){
			case('1'):
				this.getOrganisms();
				break;
			case('2'):
				this.getExperiments();
				break;
			case('3'):
				this.getGenes();
				break;
			default:
				this.setState({tableContent: [] })
		}
	}
	getOrganisms = async () => {
        
        let content = await axios.get("api/organisms")
        await this.setState({ tableContent: content.data });
	}
	
	getExperiments = async () => {
		
		let content = await axios.get("/api/layout")
        await this.setState({ tableContent: content.data });
	}

	getGenes = async () => {
	
		let content = await axios.get("api/genes")
        await this.setState({ tableContent: content.data });
	}

	render() {
		return (
			<Aux>
				<Header title="TablePage" />
				<h2>{this.props.match.params.id}</h2>
				<div className='container'>
					<Table content={this.state.tableContent} title='Table'/>
				</div>
			</Aux>
		)
	}
}


export default TablePage;