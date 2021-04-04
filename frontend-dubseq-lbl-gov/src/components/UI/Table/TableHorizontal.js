import React from 'react';
import Aux from '../../../hoc/Aux';
import classes from './Table.module.css';



const TableHorizontal = (props) => {

	function getKeys(obj) {
		return Object.keys(obj);
	}

	function renderRow(data) {

		let keys = getKeys(data);

		return keys.map((d, i) =>
		(<tr key={i}>
			<th>{d}</th>
			<td>{data[d]}</td>
		</tr>)
		)
	}

	return (
		<Aux>
			<h4 className={classes.table_title}>{props.title}</h4>
			<div className={classes.table_background}>
				<table className='table table-hover'>
					<tbody>
						{props.content && renderRow(props.content[0])}
					</tbody>
				</table>
			</div>
		</Aux >
	)

}

export default TableHorizontal;