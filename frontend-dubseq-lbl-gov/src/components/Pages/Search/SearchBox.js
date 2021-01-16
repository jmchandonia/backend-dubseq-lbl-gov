import React from 'react'
import classes from './SearchBox.module.css';

const SearchBox = (props) => {

	return (
		<div className={classes.center} >
			<div className='card' style={{ width: "18rem" }}>
				<div className='card-body'>
					<h5 className='card-title'>{props.title}</h5>

					<form>
						<div className='md-3'>
							<div className='form-lable'>{props.selectionTitle}:</div>
							<select className='form-select'>
								{props.selection.map((data, index) => <option key={index} value={index}>{data}</option>)}

							</select>
						</div>
						<div className='md-3'>
							<div className='form-lable'>{props.searchTitle}:</div>
							<input className='form-control'></input>
						</div>
						<button type="submit" className="btn btn-primary" onClick={props.didClick}>Submit</button>
					</form>

				</div>
			</div>
		</div>
	)
}

export default SearchBox;