import React, { useState, useEffect } from 'react';
import Header from '../../UI/Header/Header';
import Aux from '../../../hoc/Aux';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import Content from '../../../hoc/Content/Content';
import Footer from '../../UI/Footer/Footer';
import { Link } from 'react-router-dom';
import TableReact from '../../UI/Table/TableReact';

function GenomeList() {

	const [genomeList, setGenomeList] = useState(null);

	useEffect(() => {

		async function fetchData() {
			let res = await axios(`/api/organisms`);
			res.data = res.data.map(e => {
				e['link'] = <Link to={`/organisms/${e.genome_id}`}>SeeMore</Link>;
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
			text: 'Id',
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
			text: 'Taxonomy id',
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
			text: 'Experiemnt count',
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
