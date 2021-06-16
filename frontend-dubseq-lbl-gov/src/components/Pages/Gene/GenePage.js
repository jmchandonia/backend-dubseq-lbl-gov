import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TableReact from '../../UI/Table/TableReact';
import Header from '../../UI/Header/Header';
import Footer from '../../UI/Footer/Footer';
import Content from '../../../hoc/Content/Content';
import Aux from '../../../hoc/Aux';
import { Link } from 'react-router-dom'
import TableReactPaginated from '../../UI/Table/TableReactPaginated';

function GenePage() {

	const [genes, setGenes] = useState([])

	useEffect(() => {

		let fetchData = async () => {
			let res = await axios('/api/getGenes')
			res = addLink(res.data, "name", ['gene_id'], '/genes/?')
			setGenes(res)
		}

		fetchData()
	}, [])


	// DESTINATION STRING MUST BE FORMATED CORRECTLY 
	// 'bagseq/libraries/?/experiments/?'
	function addLink(data, destLinkCol, idSrcCol, path) {
		return data.map(e => {
			let newPath = path;
			idSrcCol.forEach(id => {
				newPath = newPath.replace("?", e[id])
			})
			e[destLinkCol] = <Link to={newPath}>{e[destLinkCol]}</Link>;
			return e;
		})
	}

	let labels = [
		{
			dataField: 'gene_id',
			text: 'ID',
			sort: true
		},
		{
			dataField: 'name',
			text: 'Name',
			sort: true
		},
		{
			dataField: 'gene_type',
			text: 'Type',
			sort: true
		},
		{
			dataField: 'pos_from',
			text: 'Position From',
			sort: true
		},
		{
			dataField: 'pos_to',
			text: 'Position To',
			sort: true
		},
		{
			dataField: 'strand',
			text: 'Strand',
			sort: true
		},
		{
			dataField: 'product',
			text: 'Product',
			sort: true
		}
	]


	return (
		<Aux>
			<Header title='Genes' />
			<Content>
				<div className='container'>
					<h4 style={{ fontWeight: "700", marginBottom: "30px" }}>{"Genes"}</h4>
					<div style={{ backgroundColor: "white", borderRadius: '1rem' }}>
						<TableReactPaginated keyField={'gene_id'} data={genes} columns={labels}/>
					</div>
				</div>
			</Content>
			<Footer />
		</Aux>
	)
}

export default GenePage;