import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header';
import Footer from '../../UI/Footer/Footer';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import HistogramD3 from '../../D3Components/HistogramD3';
import TableHorizontal from '../../UI/Table/TableHorizontal';
import HorizontalLayout from '../../Layouts/HorizontalLayout';
import Content from '../../../hoc/Content/Content';
import Title from '../../UI/Title/Title';

function BagSeqLandingPage() {

	const { id } = useParams();
	const [stats, setStats] = useState(null);
	const [experiments, setExperients] = useState(null);
	const [topPerformingGenes, setTopPerformingGenes] = useState(null);
	const [histData, setHistData] = useState(null);

	useEffect(() => {

		async function fetchData() {
			let res1 = await axios.get(`/api/libraries/${id}/stats`);
			setStats(res1.data);
			let res2 = await axios.get(`/api/libraries/${id}/experiments`);
			res2.data = addLink(res2.data, 'itnum', 'experiment id', '/bagseq/libraries/${id}/experiments/${id_experiment}')
			setExperients(res2.data);
			let res3 = await axios.get(`/api/libraries/${id}/highscoregenes`);
			setTopPerformingGenes(res3.data);
			let res4 = await axios(`/api/libraries/${id}/experiments/1/graphs`);
			setHistData(res4.data);
		}

		fetchData();
		console.log("Update");

		// eslint-disable-next-line
	}, [])

	function addLink(data, LinkCol, idCol, path) {
		return data.map(e => {
			// eslint-disable-next-line
			let id_experiment = e[idCol];
			console.log('THIS IS WRONG!!! fix!!!');
			let newPath = eval('`' + path + '`');
			e[LinkCol] = <Link to={newPath}>{e[LinkCol]}</Link>;
			return e;
		})
	}


	return (
		<Aux>
			<Header title='Library LandingPage' />
			<Content>
				<div className='container'>
					{stats && <Title title='BAGSeq Library' specific={stats[0]['Name:']}/>}
					{stats && histData && <HorizontalLayout content={[
						<TableHorizontal content={stats} title='General Information' />,
						<HistogramD3 data={histData} mountingId={`class_${1}`} />
					]} contentWidth={[6, 6]} />}
					<br />
					{experiments && <Table content={experiments} title='Experiments (high scoring genes - genes scored above 4)' />}
					<br />
					{topPerformingGenes && <Table content={topPerformingGenes} title='Top Performing Genes' />}
				</div>
			</Content>
			<Footer />
		</Aux>
	)
}

export default BagSeqLandingPage;