import React, { useEffect, useRef, useState } from 'react';
import Aux from '../../hoc/Aux';
import axios from 'axios';
import FitnessLandscapeD3 from '../D3Components/FitnessLandscapeD3';
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import { useLocation } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap'

const range = 10000;
const zoom = 0.2

// HELPER FUNCTIONS.
function findRange({ pos_from, pos_to }) {

	let interval = (pos_to - pos_from) / 2;
	let mid = pos_from + interval;
	let s = Math.round(mid - (range / 2));
	let f = Math.round(mid + (range / 2));
	return { s, f }
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function FitnessGraph() {

	let query = useQuery();
	const [data, setData] = useState([]);
	const [position, setPosition] = useState({ start: 0, end: 0 });
	const currentGeneId = useRef(0);
	const [organisms, setOrganisms] = useState([]);
	const [selectedOrganism, setSelectedOrganism] = useState(query.get("organism"))
	const [experiments, setExperiments] = useState([])
	const [selectedExperiment, setSelectedExperiment] = useState(query.get("experiment"))


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
		const fetchExperiment = async () => {
			let res = await axios(`organisms/${selectedOrganism}/experiments`)
			setExperiments(res.data)
		}

		fetchExperiment();
	}, [selectedOrganism])


	// Changing the graph.
	useEffect(() => {

		async function fetchGraphData() {

			let data = { geneData: null, fragmentData: null };

			let res1 = await axios('/gene', {
				params: {
					genome_id: selectedOrganism,
					exp_id: selectedExperiment,
					pos_from: position.start,
					pos_to: position.end
				}
			})
			data.geneData = res1.data.map(e => {
				e['posFrom'] = e['pos_from']
				e['posTo'] = e['pos_to']
				return e
			});
			let res2 = await axios('/fragment', {
				params: {
					genome_id: selectedOrganism,
					exp_id: selectedExperiment,
					pos_from: position.start,
					pos_to: position.end
				}
			})

			data.fragmentData = res2.data.map(e => {
				e['posFrom'] = e['pos_from']
				e['posTo'] = e['pos_to']
				return e
			});

			setData(data);
		}
		fetchGraphData()

	}, [position])

	// used to query genes.
	let getGenes = async (start) => {

		try {
			let res = await axios(`organisms/${selectedOrganism}/${selectedExperiment}/genes/${start.toLowerCase()}`)
			return res.data.map(e => ({ value: e['gene_id'], label: e['name'] }))
		} catch (err) {
			console.log(err)
			return []
		}
	}

	// change the current showing gene_id.
	const changeCurrent = async (gene_id) => {

		currentGeneId.current = gene_id

		let res = await axios(`/api/getGenes/${gene_id}`);

		let { s, f } = findRange(res.data[0]);

		setPosition({ start: s, end: f })
		// setCurrent(res.data[0])
	}

	return (
		<Aux>

			<div className='d-flex justify-content-between align-items-end'>
				<div className={'w-50'}>
					<Select placeholder={"Select Organism"}ç
						defaultValue={selectedOrganism}
						options={organisms.map(e => ({ value: e['genome_id'], label: e['name'] }))}
						onChange={e => setSelectedOrganism(e.value)} />
					<Select placeholder={"Select Experiment"}
						defaultValue={selectedOrganism}
						options={experiments.map(e => ({ value: e['barseq_experiment_id'], label: e['name'] }))}
						onChange={e => setSelectedExperiment(e.value)} />
					<AsyncSelect placeholder={"Select Genes"} loadOptions={getGenes} onChange={gene => changeCurrent(gene.value)} />
				</div>
				<div className='w-25'>
					<button className='btn'
						onClick={() => changeCurrent(parseInt(currentGeneId.current) - 1)}
						style={{ backgroundColor: "#fa7f72", color: "#ffffff" }} >←</button>
					<button className='btn'
						onClick={() => changeCurrent(parseInt(currentGeneId.current) + 1)}
						style={{ backgroundColor: "#fa7f72", color: "#ffffff" }} >→</button>
				</div>
				<div className='w-25'>
					<button className='btn'
						onClick={() => {
							let shift = (position.end - position.start) * zoom
							setPosition({ start: parseInt(position.start - shift), end: parseInt(position.end + shift) })
						}}
						style={{ backgroundColor: "#0062cc", color: "#ffffff" }} >-</button>
					<button className='btn'
						onClick={() => {
							let shift = (position.end - position.start) * (zoom ** 2)
							setPosition({ start: parseInt(position.start + shift), end: parseInt(position.end - shift) })
						}}
						style={{ backgroundColor: "#0062cc", color: "#ffffff" }} >+</button>
					<button className='btn'
						onClick={() => changeCurrent(currentGeneId.current)}
						style={{ backgroundColor: "#0062cc", color: "#ffffff" }} >Reset</button>
				</div>

			</div>
			<div style={{ backgroundColor: '#eeeeee', width: '100%', borderRadius: '10px', padding: '5px' }}>
				{/* <Card style={{ width: '18rem' }}>
					<ListGroup variant="flush">
						{organisms.filter(e => e.id == selectedExperiment).map(e => <ListGroup.Item>{e.name}</ListGroup.Item>)}
						{experiments.filter(e => e.id == selectedExperiment).map(e => <ListGroup.Item>{e.name}</ListGroup.Item>)}
						<ListGroup.Item>{data.geneData ? data.geneData.filter(gene => (gene.gene_id == currentGeneId.current)).shift() : "_none"}</ListGroup.Item>
					</ListGroup>
				</Card> */}
				<FitnessLandscapeD3
					xAxisLable="Position along the genome (bp)"
					yAxisLable="Fragment Fitness Score"
					data={data}
					current={data.geneData ? data.geneData.filter(gene => (gene.gene_id == currentGeneId.current)).shift() : {}}
					handleClickGene={changeCurrent}
				/>
			</div>
		</Aux>
	)
}

export default FitnessGraph;