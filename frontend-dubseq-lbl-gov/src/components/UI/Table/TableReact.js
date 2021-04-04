import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Aux from '../../../hoc/Aux';
import "./Table.css";


function TableReact(props) {

	return (
		<Aux>
			<h4 style={{fontWeight: "700", marginBottom: "30px"}}>{props.title}</h4>
			<div style={{ backgroundColor: "white", borderRadius: '1rem' }}>
				{props.content && <BootstrapTable
					keyField={props.keyField}
					data={props.content}
					columns={props.labels}
					bordered={false}
					bootstrap4
					hover
					wrapperClasses="table-responsive"
				/>}
			</div>
		</Aux>
	)
}

export default TableReact;