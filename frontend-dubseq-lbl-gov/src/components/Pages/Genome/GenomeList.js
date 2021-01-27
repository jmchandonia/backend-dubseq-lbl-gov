import React, { useState, useEffect } from 'react';
import Header from '../../UI/Header/Header';
import Aux from '../../../hoc/Aux';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import { generatePath } from 'react-router-dom';
import Content from '../../../hoc/Content/Content';
import Footer from '../../UI/Footer/Footer';
import {Link} from 'react-router-dom';

function GenomeList() {

	const [genomeList, setGenomeList] = useState(null);

	useEffect(() => {

		const fetchData = async () => {
			let res = await axios(`/api/organisms`);
			res.data = res.data.map(e => {
				e['Link']=<Link to={`/organisms/${e.genome_id}`}>SeeMore</Link>;
				return e
			})
			setGenomeList(res.data);
		}

		fetchData();
		console.log('Update');
	}, [])


	const didClick = async (index) => {

		this.props.history.push({
			pathname: generatePath("/organisms/:id", {
				id: index
			})
		});
	}

	return (
		<Aux>
			<Header title="TablePage" />
			<Content>
				<div className='container'>
					<Table content={genomeList} title='Organisms' />
				</div>
			</Content>
			<Footer />
		</Aux>
	)

}



export default GenomeList;
