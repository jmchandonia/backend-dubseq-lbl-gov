import React, { useEffect, useRef, useState } from 'react';
import Aux from '../../hoc/Aux';
import axios from 'axios';
import FitnessLandscapeD3 from '../D3Components/FitnessLandscapeD3';
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import { createProxyMiddleware } from 'http-proxy-middleware';

const range = 10000;

// HELPER FUNCTIONS.
function findRange({ pos_from, pos_to }) {

	let interval = (pos_to - pos_from) / 2;
	let mid = pos_from + interval;
	let s = Math.round(mid - (range / 2));
	let f = Math.round(mid + (range / 2));
	return { s, f }
}


function FitnessGraph() {

	const [data, setData] = useState([]);
	const [position, setPosition] = useState({ start: 0, end: 0 });
	const [current, setCurrent] = useState(null)
	const currentGeneId = useRef(0);
	const initialied = useRef(false);
	const [organism, setOrganism] = useState([]);
	const [selectedOrganism, setSelectedOrganism] = useState(1)
	const [experiments, setExperiments] = useState([])
	const [selectedExperiment, setSelectedExperiment] = useState(1)


	// Getting organisms.
	useEffect(() => {
		const fetchGenome = async () => {
			let res = await axios('organisms')
			setOrganism(res.data.map(e => ({ value: e['genome_id'], label: e['name'] })))
		}
		fetchGenome();
	}, [])

	// Getting extepriments.
	useEffect(() => {
		const fetchExperiment = async () => {
			let res = await axios(`organisms/${selectedOrganism}/experiments`)
			setExperiments(res.data.map(e => ({ value: e['barseq_experiment_id'], label: e['name'] })))
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

			{/* <div><b>From: </b>{position.start}</div>
			<div><b>To:</b> {position.end}</div>
			<div>{currentGeneId.current}</div> */}
			<div className={'w-25'}>
				<Select placeholder={"Select Organism"} defaultValue={selectedOrganism} options={organism} onChange={e => setSelectedOrganism(e.value)} />
				<Select placeholder={"Select Experiment"} defaultValue={selectedOrganism} options={experiments} onChange={e => setSelectedExperiment(e.value)} />
				<AsyncSelect placeholder={"Select Genes"} loadOptions={getGenes} onChange={gene => changeCurrent(gene.value)} />
			</div>
			<div className='d-flex justify-content-end'>
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
						onClick={() => setPosition({ start: position.start - 100, end: position.end + 100 })}
						style={{ backgroundColor: "#0062cc", color: "#ffffff" }} >-</button>
					<button className='btn'
						onClick={() => setPosition({ start: position.start + 100, end: position.end - 100 })}
						style={{ backgroundColor: "#0062cc", color: "#ffffff" }} >+</button>
					<button className='btn'
						onClick={() => changeCurrent(currentGeneId.current)}
						style={{ backgroundColor: "#0062cc", color: "#ffffff" }} >Reset</button>
				</div>
				
			</div>
			<div style={{ backgroundColor: '#eeeeee', width: '100%', borderRadius: '10px', padding: '5px' }}>
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