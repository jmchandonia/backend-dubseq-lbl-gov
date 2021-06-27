import React, { Component } from 'react';
import Header from '../../UI/Header/Header';
import Aux from '../../../hoc/Aux';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import SearchBox from '../Search/SearchBox';
import Footer from '../../UI/Footer/Footer';
import Content from '../../../hoc/Content/Content';

const RenderRow = (props) => {
	return props.keys.map((key, index) => (
		<td key={props.data[key]}>{props.data[key]}</td>
	))
}

class GenePage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tableContent: [{ first: 1, second: 2 }],
			search: true,
			selectionData: ['one', 'two', 'three'],
			isLoadingData: false
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
	}

	getGenes = async (event) => {
		event.preventDefault();


		console.log("Getting data")
		this.setState({isLoadingData: true})
		let content = await axios("/api/genes")
		console.log("DONE Getting data")
		this.setState({isLoadingData: false})
		this.setState({ tableContent: content.data });
		this.setState({ search: false })
	}



	render() {
		return (
			<Aux>
				<Header title="TablePage" />
				<Content>
					<div className='container'>
						{this.state.search ?
							<SearchBox
								title='Search Gene'
								selectionTitle='Select organism'
								selection={this.state.selectionData}
								inputTitle='gene'
								didSubmit={this.getGenes} 
								isLoadingData={this.state.isLoadingData}/> :
							<Table content={this.state.tableContent} title='Genes' />}
					</div>
				</Content>
				<Footer />
			</Aux>
		)
	}
}


export default GenePage;
