import React, { useEffect, useState } from 'react'
import Aux from '../../../hoc/Aux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TableHorizontal from '../../UI/Table/TableHorizontal';
import Header from '../../UI/Header/Header';
import Content from '../../../hoc/Content/Content';
import Footer from '../../UI/Footer/Footer';
import Table from '../../UI/Table/Table';
import Title from '../../UI/Title/Title';
import TableReact from '../../UI/Table/TableReact';

export default function ExperiemntLandingPage() {

	const { id, id_experiment } = useParams();
	const [stats, setStats] = useState(null);
	const [genes, setGenes] = useState(null);
	const [fragments, setFragments] = useState(null);

	useEffect(() => {
		async function fetchData() {
			let res1 = await axios(`/libraries/${id}/experiments/${id_experiment}/stats`);
			setStats(res1.data);
			let res2 = await axios(`/libraries/${id}/experiments/${id_experiment}/genes`);
			setGenes(res2.data);
			let res3 = await axios(`/libraries/${id}/experiments/${id_experiment}/fragments`);
			setFragments(res3.data);
		}
		fetchData();
	})


	let topScoringGensLabels = [
		{
			dataField: 'name',
			text: 'Name',
			sort: true
		},
		{
			dataField: 'gene id',
			text: 'Gene ID',
			sort: true
		},
		{
			dataField: 'gene score',
			text: 'Gene Score',
			sort: true
		},

	]

	let topScoringFragments = [
		{
			dataField: 'barcode',
			text: 'Barcode',
			sort: true
		},
		{
			dataField: 'fragment id',
			text: 'Fragments Id',
			sort: true
		},
		{
			dataField: 'average score',
			text: 'Average Score',
			sort: true
		},
	]

	return (
		<Aux>
			<Header title='Experiment LandingPage' />
			<Content>
				<div className='container'>
					{stats && <Title title='Experiment' specific={stats[0]['Name:']} />}
					{stats && <TableHorizontal content={stats} title="General Information" />}
					<br />
					{/* {genes && <Table content={genes} title="Top Scoring Genes (top 20 highest scores)" />} */}
					{genes && <TableReact content={genes} keyField='id' labels={topScoringGensLabels} title="Top Scoring Genes (top 20 highest scores)" />}
					<br />
					{/* {fragments && <Table content={fragments} title="Top Scoring Fragments" />} */}
					{fragments && <TableReact content={fragments} keyField='id' labels={topScoringFragments} title="Top Scoring Fragments" />}
				</div>
			</Content>
			<Footer />
		</Aux>
	)

}

