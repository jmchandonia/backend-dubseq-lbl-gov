import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Aux from '../../../hoc/Aux';
import classes from './Table.module.css';


function TableReact(props) {



	return (
		<Aux>
			<h4>{props.title}</h4>
			<div style={{ backgroundColor: "white", borderRadius: '1rem' }}>
				{props.content && <BootstrapTable
					keyField={props.keyField}
					data={props.content}
					columns={props.lables}
					bordered={false}
					bootstrap4
					hover
				/>}
			</div>
		</Aux>
	)
}

export default TableReact;