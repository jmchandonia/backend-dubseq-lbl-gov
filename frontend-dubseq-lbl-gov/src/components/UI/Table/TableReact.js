import React from 'react'
import Aux from '../../../hoc/Aux';
import { useSortBy, useTable } from 'react-table'
import classes from './Table.module.css';


function TableReact() {
	// function TableReact({data}) {

	// let columns = Object.keys(data[0]).reduce((obj, val) => {
	// 	obj.push({Header: val, accessor: val});
	// 	return obj;
	// }, []);

	let data = [
		{
			col1: 'Hello',
			col2: 'World',
		},
		{
			col1: 'react-table',
			col2: 'rocks',
		},
		{
			col1: 'whatever',
			col2: 'you want',
		},
	]

	let columns = [
		{
			Header: 'Column 1',
			accessor: 'col1', // accessor is the "key" in the data
		},
		{
			Header: 'Column 2',
			accessor: 'col2',
		},
	]


	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({ columns, data }, useSortBy)


	return (
		<Aux>
			<div className={classes.center}>
				<table {...getTableProps()} className='table'>
					<thead>
						{headerGroups.map(headerGroup => (
							<tr  {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())} >
										{column.render('Header')}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? ' 🔽'
													: ' 🔼'
												: ''}
										</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()} >
						{rows.map(row => {
							prepareRow(row)
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map(cell => {
										return (
											<td  {...cell.getCellProps()} >
												{cell.render('Cell')}
											</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</Aux>
	)
}


export default TableReact;