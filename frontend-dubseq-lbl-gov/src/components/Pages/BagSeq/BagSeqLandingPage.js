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
import TableReact from '../../UI/Table/TableReact';

function BagSeqLandingPage() {

	const { id } = useParams();
	const [stats, setStats] = useState(null);
	const [experiments, setExperients] = useState(null);
	const [topPerformingGenes, setTopPerformingGenes] = useState(null);
	const [histData, setHistData] = useState(null);

	useEffect(() => {

		async function fetchData() {
			let res1 = await axios.get(`/api/libraries/${id}/stats`);
			console.log(res1.data)
			setStats(res1.data);
			let res2 = await axios.get(`/api/libraries/${id}/experiments`);
			res2.data = addLink(res2.data, 'itnum', ['experiment id'], '/bagseq/libraries/${id}/experiments/${id_experiment}')
			setExperients(res2.data);
			let res3 = await axios.get(`/api/libraries/${id}/highscoregenes`);
			console.log(res3.data)
			res3.data = res3.data.map((row, index) => ({
				...row,
				'uid': index,
				'Gene name': <Link to={`/graphs/fitness/?gene_id=${row['gene_id']}`}>{row['Gene name']}</Link>
			}))

			setTopPerformingGenes(res3.data);

			// Histogram
			// let res4 = await axios(`/api/libraries/${id}/experiments/1/graphs`);
			// setHistData(res4.data);
		}

		fetchData();
		console.log("Update");

		// eslint-disable-next-line
	}, [])

	function addLink(data, LinkCol, idCol, path) {
		console.warn("WARNIGN: Using eval is NOT SAFE, Change this code")
		return data.map(e => {
			// eslint-disable-next-line
			let id_experiment = e[idCol];
			let newPath = eval('`' + path + '`');
			e[LinkCol] = <Link to={newPath}>{e[LinkCol]}</Link>;
			return e;
		})
	}


	let StatsLabels = [
		{
			dataField: 'name',
			text: 'Name',
		},
		{
			dataField: 'bagseq_library_id',
			text: 'Library ID',
		},
		{
			dataField: 'host_genome_name',
			text: 'Host Genome Name',
		},
		{
			dataField: 'host_genome_id',
			text: 'Host Genome ID',
		},
		{
			dataField: 'fragment_count',
			text: 'Fragment Count',
		},
		{
			dataField: 'experiment_count',
			text: 'Experiment Count',
		}
	]

	let ExperimentLabels = [
		{
			dataField: 'Condition',
			text: 'Condition',
			sort: true
		},
		{
			dataField: 'High Scoring Genes',
			text: 'High Scoring Genes',
			sort: true
		},
		{
			dataField: 'itnum',
			text: 'itnum',
			sort: true
		},
		{
			dataField: 'experiment id',
			text: 'Experiment Id',
			sort: true
		},
	]

	let TopPerformingLabels = [
		{
			dataField: 'Gene name',
			text: 'Gene Name',
			sort: true
		},
		{
			dataField: 'Gene score',
			text: 'Gene Score',
			sort: true
		},
		{
			dataField: 'Condition',
			text: 'Condition',
			sort: true
		},
	]


	return (
		<Aux>
			<Header title='Library LandingPage' />
			<Content>
				<div className='container'>
					{stats && <Title title='Dub-seq Library' specific={stats[0]['name']} />}
					{stats && histData && <HorizontalLayout content={[
						<TableHorizontal content={stats} labels={StatsLabels} title='General Information' />,
						// <HistogramD3 data={histData} mountingId={`class_${1}`} />
					]} contentWidth={[6, 6]} />}
					<br />
					{experiments && <TableReact content={experiments} keyField='experiment id' labels={ExperimentLabels} title='Experiments (high scoring genes - genes scored above 4)' />}
					<br />
					{topPerformingGenes && <TableReact content={topPerformingGenes} keyField='uid' labels={TopPerformingLabels} title='Top Performing Genes' />}
				</div>
			</Content>
			<Footer />
		</Aux>
	)
}

export default BagSeqLandingPage;