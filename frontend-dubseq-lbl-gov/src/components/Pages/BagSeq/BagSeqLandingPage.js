import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import Histogram from '../../D3Components/Histogram';

function BagSeqLandingPage() {

	const { id } = useParams();
	const [stats, setStats] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			let res = await axios.get(`/api/bagseq/${id}`);
			setStats(res.data);
		}

		fetchData();
		console.log("Update");
	}, [])



	return (
		<Aux>
			<div className='wrapper'>
				<Header title={'GenomeLandingPage'} />
				<div className='container'>
					{stats && <Table content={stats} title='Stats' />}
					<Histogram />
				</div>
			</div>
			<Footer />
		</Aux>
	)
}

export default BagSeqLandingPage;