import React, { useEffect, useState } from 'react'
import Aux from '../../../hoc/Aux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TableHorizontal from '../../UI/Table/TableHorizontal';
import Header from '../../UI/Header/Header';
import Content from '../../../hoc/Content/Content';
import Footer from '../../UI/Footer/Footer';
import Table from '../../UI/Table/Table';

export default function ExperiemntLandingPage() {

	const { id, id_experiment } = useParams();
	const [stats, setStats] = useState(null);
	const [genes, setGenes] = useState(null);
	const [fragments, setFragments] = useState(null);

	useEffect(() => {
		async function fetchData() {
			let res1 = await axios(`/bagseq/${id}/experiments/${id_experiment}`);
			setStats(res1.data);
			let res2 = await axios(`/bagseq/${id}/experiments/${id_experiment}/genes`);
			setGenes(res2.data);
			let res3 = await axios(`/bagseq/${id}/experiments/${id_experiment}/fragments`);
			setFragments(res3.data);
		}
		fetchData();
	})

	return (
		<Aux>
			<Header title='Experiment LandingPage' />
			<Content>
				<div className='container'>
					{stats && <h1 style={{ margin: '25px 0px 50px 0px', borderBottom: 'solid 2px black' }}>Experiment - <span style={{ color: 'red', fontWeight: 300 }}>{stats[0]['Name:']}</span></h1>}
					<TableHorizontal content={stats} title="General Information" />
					<br />
					<Table content={genes} title="Top Scoring Genes (top 20 highest scores)" />
					<br />
					<Table content={fragments} title="Top Sscoring Fragments" />
				</div>
			</Content>
			<Footer />
		</Aux>
	)

}

