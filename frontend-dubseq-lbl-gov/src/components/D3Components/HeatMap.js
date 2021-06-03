import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import axios from 'axios';


function HeatMap() {

	const [data, setData] = useState([])


	useEffect(() => {

		async function fetchData() {
			let res = await axios.post(`/api/heatmap/${1}`, {
				geneIds: [1, 2, 3],
				experimentIds: [1, 2, 3, 4, 5, 6, 7]
			})

			console.log(res.data)
			let series = {}
			res.data.forEach((d) => {
				// if column does not exist
				if (!series[d['condition_name']]) {
					series[d['condition_name']] = [
						{
							x: d['gene_name'],
							y: Math.round(d['score'] * 1000) / 1000
						}
					]
				}
				// if the column already exists add a row
				else {
					let arr = series[d['condition_name']]
					arr.push({
						x: d['gene_name'],
						y: Math.round(d['score'] * 1000) / 1000
					})
				}
			})

			// console.log(series)

			let array = []
			Object.keys(series).forEach((columnName) => array.push({ name: columnName, data: series[columnName] }))


			setData(array)
		}


		fetchData()
	}, [])





	return (
		<Chart
			options={{
				plotOptions: {
					heatmap: {
						colorScale: {
							ranges: [{
								from: -20,
								to: 20,
								color: '#00A100',
								name: 'score'
							}
							]
						}
					}
				}
			}}
			series={data}
			type="heatmap"
			width="75%"
		/>
	)
}

export default HeatMap;