import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header';
import Footer from '../../UI/Footer/Footer';
import axios from 'axios';
import RadialGraph from '../../Graphs/RadialGraph';
import TableHorizontal from '../../UI/Table/TableHorizontal';
import HorizontalLayout from '../../Layouts/HorizontalLayout';
import Content from '../../../hoc/Content/Content';
import { Link } from 'react-router-dom';
import Title from '../../UI/Title/Title';
import TableReact from '../../UI/Table/TableReact';

function GenomeLandingPage() {

	const { id } = useParams();
	const [stats, setStats] = useState(null);
	const [library, setLibrary] = useState(null);
	const [experiments, setExperients] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			let res1 = await axios(`/api/organisms/${id}/stats`);
			setStats(res1.data);

			let res2 = await axios(`/api/organisms/${id}/libraries`);
			res2.data = addLink(res2.data, 'Name', ['id'], `/bagseq/libraries/<>`)
			setLibrary(res2.data);

			let res3 = await axios(`/api/organisms/${id}/topexperiments`);
			res3.data = addLink(res3.data, 'name', ['barseq_experiment_id'], `/bagseq/libraries/${id}/experiments/<>`)
			res3.data = addLink(res3.data, 'gene_name', ['barseq_experiment_id', 'gene_id'], `/graphs/fitness/?genome_id=${id}&experiment_id=<>&gene_id=<>`)
			setExperients(res3.data);
			// let res4 = await axios(`/api/organisms/${id}/graphs`);
			// setHistData(res4.data);
		}

		fetchData();
		console.log("Update");

		// eslint-disable-next-line
	}, [])


	// DESTINATION STRING MUST BE FORMATED CORRECTLY 
	// 'bagseq/libraries/?/experiments/?'
	function addLink(data, destLinkCol, idSrcCol, path) {
		return data.map(e => {
			let newPath = path;
			idSrcCol.forEach(id => {
				newPath = newPath.replace("<>", e[id])
			})
			e[destLinkCol] = <Link to={newPath}>{e[destLinkCol]}</Link>;
			return e;
		})
	}


	let StatsLabels = [
		{
			dataField: 'name',
			text: 'Name'
		},
		{
			dataField: 'genome_id',
			text: 'ID'
		},
		{
			dataField: 'size',
			text: 'Size (kbps)'
		},
		{
			dataField: 'ncbi_taxonomy_id',
			text: 'TaxonomyId'
		},
		{
			dataField: 'phylum',
			text: 'Phylum'
		},
		{
			dataField: 'gene_count',
			text: 'Gene Count'
		},
		{
			dataField: 'experiment_count',
			text: 'Experiment Count'
		},
		{
			dataField: 'condition_count',
			text: 'Condition Count'
		},
	]

	let LibrariesLabels = [
		{
			dataField: 'Name',
			text: 'Name',
			sort: true
		},
		{
			dataField: 'id',
			text: 'Id',
			sort: true
		},
		{
			dataField: 'Experiments',
			text: 'Experiments',
			sort: true
		},
		{
			dataField: 'Fragments',
			text: 'Fragments',
			sort: true
		},
	]

	let TopPerformingLabels = [
		{
			dataField: 'name',
			text: 'Name',
			sort: true
		},
		{
			dataField: 'type',
			text: 'Type',
			sort: true
		},
		{
			dataField: 'gene_name',
			text: 'Gene',
			sort: true
		},
		{
			dataField: 'max gene score',
			text: 'MaxGeneScore',
			sort: true
		}
	]



	return (
		<Aux>
			<Header title={'GenomeLandingPage'} />
			<Content>
				<div className='container' style={{ paddingBottom: "40px" }}>
					{stats && <Title title={'Organism'} specific={stats[0]['name']} />}
					{stats && <HorizontalLayout content={[
						<TableHorizontal content={stats} labels={StatsLabels} title='General Information' />,
						<RadialGraph />
					]} contentWidth={[6, 6]} />}
					<div style={{ marginTop: "50px" }}>
						{library && <TableReact content={library} keyField='id' labels={LibrariesLabels} title='Libraries Created' />}
					</div>

					<div style={{ marginTop: "70px" }}>
						{experiments && <TableReact content={experiments} keyField='max gene score' labels={TopPerformingLabels} title='Top Experiments Performed' />}
					</div>

				</div>
			</Content>
			<Footer />
		</Aux>
	)
}

export default GenomeLandingPage;