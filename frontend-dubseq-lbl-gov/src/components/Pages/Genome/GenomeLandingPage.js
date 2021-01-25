import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import Histogram from '../../D3Components/Histogram';
import TableHorizontal from '../../UI/Table/TableHorizontal';

function GenomeLandingPage() {

	const { id } = useParams();
	const [stats, setStats] = useState(null);
	const [library, setLibrary] = useState(null);
	const [experiments, setExperients] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			let res1 = await axios.get(`/api/organisms/${id}/stats`);
			setStats(res1.data);
			let res2 = await axios.get(`/api/organisms/${id}/libraries`);
			setLibrary(res2.data);
			let res3 = await axios.get(`/api/organisms/${id}/experiments`);
			setExperients(res3.data);
		}

		fetchData();
		console.log("Update");
	}, [])



	return (
		<Aux>
			<div className='wrapper'>
				<Header title={'GenomeLandingPage'} />
				<div className='container'>
					{stats   		&& <TableHorizontal content={stats} title='Basic Statistics' />}
					{library 		&& <Table content={library} 		title='Library' />}
					{experiments	&& <Table content ={experiments}	title='Top 10 Experiment'/>}
					<Histogram />
				</div>
			</div>
			{/* <Footer /> */}
		</Aux>
	)
}

export default GenomeLandingPage;