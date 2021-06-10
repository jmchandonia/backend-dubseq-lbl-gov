import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone, PaginationProvider, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';

import './TableReactPaginated.css'

export default function TableReactPaginated(props) {

	const options = {
		custom: true,
		totalSize: props.data.length
	};

	return props.data.length !== 0 ?
		(<PaginationProvider pagination={paginationFactory(options)}>
			{({ paginationProps, paginationTableProps }) =>
				<div>
					
					<div className='d-flex justify-content-between pagination-toggles'>
						<SizePerPageDropdownStandalone
							{...paginationProps}
						/>

						<PaginationListStandalone 
							{...paginationProps}
						/>
					</div>
					<BootstrapTable
						keyField={props.keyField}
						data={props.data}
						columns={props.colums}
						bordered={false}
						bootstrap4
						hover
						{...paginationTableProps}
					/>
				</div>
			}
		</PaginationProvider>)
		: (<h4>Page Loading</h4>)
}