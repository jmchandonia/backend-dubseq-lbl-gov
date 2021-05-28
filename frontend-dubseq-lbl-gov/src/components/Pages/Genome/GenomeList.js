import React, { useState, useEffect } from 'react';
import Header from '../../UI/Header/Header';
import Aux from '../../../hoc/Aux';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import Content from '../../../hoc/Content/Content';
import Footer from '../../UI/Footer/Footer';
import { Link } from 'react-router-dom';
import TableReact from '../../UI/Table/TableReact';

const NCBI_TAXONOMY_ID_BROWSER = 'https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id='

function GenomeList() {

	const [genomeList, setGenomeList] = useState(null);

	useEffect(() => {

		async function fetchData() {
			let res = await axios(`/api/organisms`);
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
			text: 'Size',
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


	return (
		<Aux>
			<Header title="TablePage" />
			<Content>
				<div className='container'>
					{genomeList && <TableReact title="Organisms" keyField='genome_id' content={genomeList} labels={lables} />}
				</div>
			</Content>
			<Footer />
		</Aux>
	)

}



export default GenomeList;
