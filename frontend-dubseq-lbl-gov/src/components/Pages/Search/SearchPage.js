import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Header from '../../Header/Header';



class SearchPage extends Component {




	render() {

		return (
			<Aux>
				<Header title='Search' />
				<div className='container'>
					<div className='card'>
						<div className='card-body'>
							<div className='card-title'>
								<h3>Search</h3>
							</div>
							<div className='card-text'>
								<div className='container'>
									<form>
										<div className='form-group'>
											<input type='checkbox' className='form-check-input' />
											<lable for='geneSearch'>Gene: </lable>
											<input id='geneSearch' type='text' placeholder='Example: rcnA' />
										</div>
										<div className='form-group'>
											<input type='checkbox' className='form-check-input' />
											<lable for='OrganismSearch'>Organism: </lable>
											<input id='OrganismSearch' type='text' placeholder='Example: ecoli' />
										</div>
										<div className='form-group'>
											<input type='checkbox' className='form-check-input' />
											<lable for='ExperimentSearch'>Experiemnt: </lable>
											<input id='ExperimentSearch' type='text' placeholder='Example: sodium chloride' />
										</div>
										<button className='btn-success'>Submit</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Aux>
		)
	}
}

export default SearchPage;