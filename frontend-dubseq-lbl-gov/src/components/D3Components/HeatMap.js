import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import Chart from "react-apexcharts";
import axios from 'axios';


function HeatMap() {

	const [data, setData] = useState([])
	const [organisms, setOrganisms] = useState([]);
	const [selectedOrganism, setSelectedOrganism] = useState(null)
	const [experiments, setExperiments] = useState([])
	const [selectedExperiments, setSelectedExperiment] = useState([])
	const [selectedGenes, setSelectedGenes] = useState([])

	useEffect(() => {

		if (selectedOrganism == null || selectedExperiments.length == 0 || selectedGenes.length == 0) return

		console.log(selectedOrganism)
		console.log(selectedExperiments)
		console.log(selectedGenes)
		async function fetchData() {
			let res = await axios.post(`/api/heatmap/${selectedOrganism}`, {
				geneIds: selectedGenes.map(gene => gene['value']),
				experimentIds: selectedExperiments.map(experiment => experiment['value'])
			})
			console.log(res.data)
			let series = {}
			res.data.forEach((d) => {
				// if column does not exist
				if (!series[d['condition_name']]) {
					series[d['condition_name']] = []
				}
				// if the column already exists add a row
				let arr = series[d['condition_name']]
				arr.push({
					x: d['gene_name'] ? d['gene_name'] : d['locus_tag'],
					y: Math.round(d['score'] * 1000) / 1000
				})

			})

			// console.log(series)

			let array = []
			Object.keys(series).forEach((columnName) => array.push({ name: columnName, data: series[columnName] }))

			setData(array)
		}

		fetchData()
	}, [selectedExperiments, selectedGenes])

	// Getting organisms.
	useEffect(() => {
		const fetchOrganisms = async () => {
			let res = await axios('organisms')
			setOrganisms(res.data)
		}
		fetchOrganisms();
	}, [])

	// Getting extepriments.
	useEffect(() => {
		if (!selectedOrganism) return
		const fetchExperiment = async () => {
			let res = await axios(`organisms/${selectedOrganism}/experiments`)
			// console.log(res.data)
			setExperiments(res.data)
		}

		if (organisms.length == 0) return
		fetchExperiment();
	}, [selectedOrganism])

	// used to query genes.
	let getGenes = async (start) => {

		if (!selectedOrganism) return

		try {
			let res = await axios(`organisms/${selectedOrganism}/genes/${start.toLowerCase()}`)
			console.log(res.data)
			return res.data.map(e => ({ value: e['gene_id'], label: e['name'] }))
		} catch (err) {
			console.log(err)
			return []
		}
	}

	return (
		<div>
			<Select placeholder={"Select Organism"}
				options={organisms.map(e => ({ value: e['genome_id'], label: e['name'] }))}
				onChange={e => setSelectedOrganism(e.value)} />
			<Select placeholder={"Select Experiment"}
				isDisabled={!selectedOrganism}
				isMulti={true}
				options={experiments.map(e => ({ value: e['barseq_experiment_id'], label: e['name'] }))}
				onChange={e => setSelectedExperiment(e)} />
			<AsyncSelect placeholder={"Select Genes"}
				isDisabled={!selectedOrganism}
				isMulti={true}
				loadOptions={getGenes}
				onChange={e => setSelectedGenes(e)} />
			<Chart
				options={{
					plotOptions: {
						heatmap: {
							colorScale: {
								ranges: [{
									from: -5,
									to: 15,
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
		</div>
	)
}

export default HeatMap;