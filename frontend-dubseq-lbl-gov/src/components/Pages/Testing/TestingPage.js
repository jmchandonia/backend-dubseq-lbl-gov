import React from 'react'
import Aux from '../../../hoc/Aux';
import GeneSearchBox from '../Search/SearchBox';

class TestingPage extends React.Component {

	render() {
		return (
			<Aux>
				<div className='container'>
					<GeneSearchBox />
				</div>
			</Aux>
		)
	}
}

export default TestingPage;