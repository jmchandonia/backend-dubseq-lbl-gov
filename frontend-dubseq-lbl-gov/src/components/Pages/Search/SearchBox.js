import React, { useState } from 'react'
import classes from './SearchBox.module.css';

const SearchBox = (props) => {

	const [select, setSelect] = useState(0);
	const [input, setInput] = useState('');



	const handleSubmit = () => {
		props.didSubmit([select, input])
	}

	return (
		<div className={classes.center} >
			<div className='card'>
				<div className='card-body'>
					<h5 className='card-title'>{props.title}</h5>

					<form onSubmit={handleSubmit}>
						<div className='md-3'>
							<div className='form-lable'>{props.selectionTitle}:</div>
							<select className='form-select'>
								{props.selection.map((data, index) => <option key={index} value={index}>{data}</option>)}
							</select>
						</div>
						<div className='md-3'>
							<div className='form-lable'>{props.searchTitle}:</div>
							<input value={input} onChange={e => setInput(e.target.value)} className='form-control'></input>
						</div>
						<input type='submit' value='Submit' style={{ margin: '5px 0px' }} className="btn btn-primary" />
					</form>

				</div>
			</div>
		</div>
	)
}

export default SearchBox;