import React from 'react'

const geneSearchBox = (props) => {

	return (
		<div className='card'>
			<div className='container'>
				<form>
					<div className='md-3'>
						<lable for='organism' className='form-lable'>Select Organism:</lable>
						<select className='form-select'>
							<option selected>Choose an Organism</option>
							<option value='1'>ecoli</option>
							<option value='2'>Escherichia</option>
							<option value='3'>Pseudomonas</option>
							<option value='4'>Yeast</option>
						</select>
					</div>
					<div className='md-3'>
						<lable for='gene' className='form-lable'>Gene:</lable>
						<input className='form-control'></input>
					</div>
				</form>

			</div>
		</div>
	)
}

export default geneSearchBox;