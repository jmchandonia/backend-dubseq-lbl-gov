import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import Header from '../../UI/Header/Header';
import Footer from '../../UI/Footer/Footer';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import RadialGraph from '../../Graphs/RadialGraph';
import TableHorizontal from '../../UI/Table/TableHorizontal';
import HorizontalLayout from '../../Layouts/HorizontalLayout';
import Content from '../../../hoc/Content/Content';
import { Link } from 'react-router-dom';
import Title from '../../UI/Title/Title';

function GenomeLandingPage() {

	const { id } = useParams();
	const [stats, setStats] = useState(null);
	const [library, setLibrary] = useState(null);
	const [experiments, setExperients] = useState(null);
	// const [histData, setHistData] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			let res1 = await axios(`/api/organisms/${id}/stats`);
			setStats(res1.data);
			let res2 = await axios(`/api/organisms/${id}/libraries`);
			res2.data = res2.data.map(e => {
				e.Name = <Link to={`/bagseq/libraries/${e.id}`}>{e.Name}</Link>;
				return e;
			})
			setLibrary(res2.data);
			let res3 = await axios(`/api/organisms/${id}/experiments`);
			setExperients(res3.data);
			// let res4 = await axios(`/api/organisms/${id}/graphs`);
			// setHistData(res4.data);
		}

		fetchData();
		console.log("Update");

		// eslint-disable-next-line
	}, [])

	return (
		<Aux>
			<Header title={'GenomeLandingPage'} />
			<Content>
				<div className='container'>
					{/* {stats && <h1 style={{ margin: '25px 0px 50px 0px', borderBottom: 'solid 2px black' }}> Organism - <span style={{ color: 'red', fontWeight: 300 }}>{stats[0]['Name:']}</span></h1>} */}
					{stats && <Title title={'Organism'} specific={stats[0]['Name:']} />}
					{stats && <HorizontalLayout content={[
						<TableHorizontal content={stats} title='General Information' />,
						<RadialGraph />
					]} contentWidth={[6, 6]} />}
					<br />
					{library && <Table content={library} title='Libraries Created' />}
					<br />
					{experiments && <Table content={experiments} title='Top Conditions Performed' />}
				</div>
			</Content>
			<Footer />
		</Aux>
	)
}

export default GenomeLandingPage;