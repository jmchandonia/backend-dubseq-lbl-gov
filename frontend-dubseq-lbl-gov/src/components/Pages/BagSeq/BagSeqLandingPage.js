import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import Histogram from '../../D3Components/Histogram';
import TableHorizontal from '../../UI/Table/TableHorizontal';

function BagSeqLandingPage() {

	const { id } = useParams();
	const [stats, setStats] = useState(null);
	const [organism, setOrganism] = useState(null);
	const [experiments, setExperients] = useState(null);
	const [topPerformingGenes, setTopPerformingGenes] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			let res =  await axios.get(`/api/bagseq/${id}/stats`);
			setStats(res.data);
			let res1 = await axios.get(`/api/bagseq/${id}/organism`);
			setOrganism(res1.data);
			let res2 = await axios.get(`/api/bagseq/${id}/experiments`);
			setExperients(res2.data);
			let res3 = await axios.get(`/api/bagseq/${id}/maxperforminggene`);
			setTopPerformingGenes(res3.data);
		}

		fetchData();
		console.log("Update");
	}, [])

	return (
		<Aux>
			<div className='wrapper'>
				<Header title={!organism ? '' : organism[0]['name']} />
				<div className='container'>
					{stats && 				<TableHorizontal content={stats} title='Basic Stats'/>}
					{experiments && 		<Table content={experiments} title='experiments'/>}
					{topPerformingGenes && 	<Table content={topPerformingGenes} title='Top Genes'/>}
					<Histogram />
				</div>
			</div>
			<Footer />
		</Aux>
	)
}

export default BagSeqLandingPage;