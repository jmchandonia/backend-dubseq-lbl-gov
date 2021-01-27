import React, { useState, useEffect } from 'react';
import Header from '../../UI/Header/Header';
import Aux from '../../../hoc/Aux';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import SearchBox from '../Search/SearchBox';
import HorizontalLayout from '../../Layouts/HorizontalLayout';
import { useLocation, useHistory } from 'react-router-dom';
import Content from '../../../hoc/Content/Content';
import Footer from '../../UI/Footer/Footer';
import { Link } from 'react-router-dom'


const libraryIdLink = '/bagseq/libraries/${id}';

function ConditionPage() {
	const [tableContent, setTableContent] = useState(null);
	const [selectionData] = useState(['metal', 'salt', 'antibiotics']);
	const [inputData] = useState("");
	const [type, setType] = useState(null);


	// let query = new URLSearchParams(useLocation().search);
	let query = new URLSearchParams(useLocation().search);
	let history = useHistory();

	// When change to the query parameters are made, the useEffect hook is executed.
	useEffect(() => {

		const fetchData = async () => {
			const res = await axios("/api/experiments", {
				params: {
					...(type != null ? { type: type } : {}),
					// ...(query.get("condition") != null ? { condition: query.get("condition") } : {})
				}
			})
			setTableContent(addLink(res.data, 'Library name', 'Library id', libraryIdLink));
		}

		setType(query.get("type"));
		fetchData();
	}, [type]);

	function addLink(data, LinkCol, idCol, path) {
		return data.map(e => {
			// eslint-disable-next-line
			let id = e[idCol];
			let newPath = eval('`' + path + '`');
			e[LinkCol] = <Link to={newPath}>{e[LinkCol]}</Link>;
			return e;
		})
	}

	// When submit button is pushed, the url path gets altered
	function handleSubmit(e, formValues) {

		history.push({
			pathname: '/conditions',
			search: 'type=' + formValues[1]
		});
		console.log("Submit: " + formValues[1]);
		// e.preventDefault();
	}



	return (
		<Aux>
			<Header title="TablePage" />
			<Content>
				<h5>{type}</h5>
				<HorizontalLayout content={[
					<SearchBox
						title='Search Condition'
						selectionTitle='Select experiment'
						selection={selectionData}
						inputTitle='condition'
						inputDdata={inputData}
						didSubmit={handleSubmit} />,
					(tableContent && <Table content={tableContent} title='Conditions' />)
					// <Table content={tableContent} title='Conditions' />
				]} contentWidth={[3, 9]} />
			</Content>
			<Footer />
		</Aux>

	)

}
export default ConditionPage;
