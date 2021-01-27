import React from 'react';
import Aux from '../../../hoc/Aux';
import classes from './Table.module.css';



const TableHorizontal = (props) => {

	function getKeys(obj) {
		return Object.keys(obj);
	}

	function renderRow(data) {

		let keys = getKeys(data);

		return keys.map(e =>
		(<tr>
			<th>{e}</th>
			<td>{data[e]}</td>
		</tr>)
		)
	}

	return (
		<Aux>
			<table className='table table-hover'>
				<h4>{props.title}</h4>
				<div className={classes.table_background}>
					<tbody>
						{props.content && renderRow(props.content[0])}
					</tbody>
				</div>
			</table>
		</Aux >
	)

}

export default TableHorizontal;