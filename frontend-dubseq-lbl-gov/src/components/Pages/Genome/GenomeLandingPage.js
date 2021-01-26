import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header';
import Footer from '../../UI/Footer/Footer';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import Histogram from '../../D3Components/Histogram';
import TableHorizontal from '../../UI/Table/TableHorizontal';
import Content from '../../../hoc/Content/Content';

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
			<Header title={'GenomeLandingPage'} />
			<Content>
				<div className='container'>
					{stats && <h1 style={{margin: '25px 0px 50px 0px', borderBottom: 'solid 2px black'}}><span style={{color: 'red', fontWeight: 300}}>{stats[0]['Name:']}</span> - Landing Page</h1>}
					{stats && <TableHorizontal content={stats} title='Organims Information:' />}
					{library && <Table content={library} title='Libraries Created:' />}
					{experiments && <Table content={experiments} title='Top Conditions Performed:' />}
					<Histogram />
				</div>
			</Content>
			<Footer />
		</Aux>
	)
}

export default GenomeLandingPage;