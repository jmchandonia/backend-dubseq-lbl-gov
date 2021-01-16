import React from 'react';
import Aux from '../../../hoc/Aux';


const RenderRow = (props) => {
	return props.keys.map((key, index) => (
		<td key={index}>{props.data[key]}</td>
	))
}

const Table = (props) => {


	function getKeys(obj) {
		return Object.keys(obj)
	}

	function getHeaders(obj) {

		return getKeys(obj[0])
			.map((key, index) => (
				<th key={key}>{key.toUpperCase()}</th>
			))
	}

	function getRowsData(content) {
		var items = content;
		var keys = getKeys(content[0]);
		return items.map((row, index) => (
			<tr key={index}>
				<RenderRow data={row} keys={keys} />
				{props.links && <td><button>{index}</button></td>}
			</tr>
		))
	}

	return (
		<Aux>
			<h2>{props.title}</h2>
			<table className='table table-hover' id='students'>
				<thead>
					<tr>{getHeaders(props.content)}
						{props.links && <th>link</th>}
					</tr>

				</thead>
				<tbody>
					{getRowsData(props.content)}
				</tbody>
			</table>
		</Aux >
	)

}

export default Table;