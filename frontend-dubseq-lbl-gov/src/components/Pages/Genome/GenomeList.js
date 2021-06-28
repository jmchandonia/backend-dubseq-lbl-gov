import React, { useState, useEffect } from 'react';
import Header from '../../UI/Header/Header';
import Aux from '../../../hoc/Aux';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import Content from '../../../hoc/Content/Content';
import Footer from '../../UI/Footer/Footer';
import { Link } from 'react-router-dom';
import TableReact from '../../UI/Table/TableReact';
import TableReactExpandable from '../../UI/Table/TableReactExpandable';

const NCBI_TAXONOMY_ID_BROWSER = 'https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id='

function GenomeList() {

	const [genomeList, setGenomeList] = useState(null);

	useEffect(() => {

		async function fetchData() {
			// https://docs.google.com/spreadsheets/d/1OJNuSJz9_057EFYK5IbSUbV0dIMaY7Po3cnTlkhThq4/edit#gid=0
			let res = await axios.post('v2/api/query/0')
			res.data = res.data.map(e => {
				e['link'] = <Link to={`/organisms/${e.genome_id}`}>See More</Link>;
				e['ncbi_taxonomy_id'] =
					<a
						href={`${NCBI_TAXONOMY_ID_BROWSER}${e.ncbi_taxonomy_id}`}
						target="_blank">
						{e.ncbi_taxonomy_id}
					</a>
				return e;
			})
			setGenomeList(res.data);
		}

		fetchData();
		console.log('Update');

		// eslint-disable-next-line
	}, [])

	const lables = [
		{
			dataField: 'genome_id',
			text: 'ID',
			sort: true
		}, {
			dataField: 'name',
			text: 'Name',
			sort: true
		}, {
			dataField: 'size',
			text: 'Size (kbps)',
			sort: true
		}, {
			dataField: 'ncbi_taxonomy_id',
			text: 'Taxonomy ID',
			sort: true
		}, {
			dataField: 'phylum',
			text: 'Phylum',
			sort: true
		}, {
			dataField: 'count',
			text: 'Count',
			sort: true
		}, {
			dataField: 'library_count',
			text: 'Library count',
			sort: true
		}, {
			dataField: 'experiment_count',
			text: 'Experiment count',
			sort: true
		}, {
			dataField: 'link',
			text: 'Link',
			sort: true
		}
	]



	let expandRowFunction = (row, row_ind) => {
		return (
			<div>
				<button className='btn btn-success'>Download</button>
				<Link to={`/graphs/heatmap/${row['genome_id']}`} className='btn btn-primary'>Heat-map</Link>
				<Link to={`/graphs/fitness/${row['genome_id']}`} className='btn btn-warning'>Fitness</Link>
			</div>
		)
	}


	return (
		<Aux>
			<Header title="TablePage" />
			<Content>
				<div className='container'>
					<TableReactExpandable title="Organisms" keyField='genome_id' content={genomeList} labels={lables} expandRowFunction={expandRowFunction} />
				</div>
			</Content>
			<Footer />
		</Aux>
	)

}



export default GenomeList;
