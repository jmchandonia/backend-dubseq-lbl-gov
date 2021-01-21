import React, { useState, useEffect } from 'react';
import Header from '../../Header/Header';
import Aux from '../../../hoc/Aux';
import axios from 'axios';
import Table from '../../UI/Table/Table';
import SearchBox from '../Search/SearchBox';
import HorizontalLayout from '../../Layouts/HorizontalLayout';
import { useLocation, useHistory } from 'react-router-dom';



// function useQuery(){
// 	return new URLSearchParams(useLocation().search);
// }

function ConditionPage() {
	const [tableContent, setTableContent] = useState(null);
	const [selectionData] = useState(['metal', 'salt', 'antibiotics']);
	const [inputData] = useState("");
	const [type, setType] = useState(null);


	let query = new URLSearchParams(useLocation().search);
	let history = useHistory();

	// When change to the query parameters are made, the useEffect hook is executed.
	useEffect(async () => {

		// let type = query.get("type");
		setType(query.get("type"));

		let content = await axios.get("/api/experiments", {
			params: {
				...(type != null ? { type: type } : {}),
				// ...(query.get("condition") != null ? { condition: query.get("condition") } : {})
			}
		})
		setTableContent(content.data);

		console.log("type: " + type);

	}, [type]);


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

			<HorizontalLayout content={[
				<SearchBox
					title='Search Condition'
					selectionTitle='Select experiment'
					selection={selectionData}
					inputTitle='condition'
					inputDdata={inputData}
					didSubmit={handleSubmit} />,
				<Table content={tableContent} title='Conditions' />
			]} contentWidth={[3, 9]} />

		</Aux>

	)

}


// class ConditionPage extends Component {

// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			tableContent: null,
// 			selectionData: ['metal', 'salt', 'antibiotic'],
// 			inputData: "",
// 		}
// 	}

// 	componentDidMount() {
// 		this.getExperiments();
// 	}

// 	// componentDidUpdate() {
// 	// 	this.getExperiments();
// 	// }

// 	getExperiments = async () => {

// 		let content = await axios.get("/api/experiments", {
// 			params: {
// 				...(this.props.location.type != null ? { type: this.props.location.type } : {}),
// 				...(this.props.location.condition != null ? { condition: this.props.location.condition } : {})
// 			}
// 		})
// 		console.log(this.props.location.match.condition);
// 		this.setState({ tableContent: content.data });
// 	}

// 	handleSubmit = (e, formValues) => {

// 		this.props.history.push({
// 			pathname: '/conditions',
// 			search: '?type=' + formValues[1]
// 		})

// 		// e.preventDefault();
// 	}

// 	render() {
// 		return (
// 			<Aux>
// 				<Header title="TablePage" />

// 				<HorizontalLayout content={[
// 					<SearchBox
// 						title='Search Condition'
// 						selectionTitle='Select experiment'
// 						selection={this.state.selectionData}
// 						inputTitle='condition'
// 						inputDdata={this.state.inputData}
// 						didSubmit={this.handleSubmit} />,
// 					<Table content={this.state.tableContent} title='Conditions' />
// 				]} contentWidth={[3, 9]} />

// 			</Aux>
// 		)
// 	}
// }

export default ConditionPage;
