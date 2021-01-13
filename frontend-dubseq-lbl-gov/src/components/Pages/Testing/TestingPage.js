import React from 'react'
import Aux from '../../../hoc/Aux';
import GeneSearchBox from '../../Pages/Search/GeneSearchBox';

class TestingPage extends React.Component {

	render() {
		return (
			<Aux>
				<div className='center'>
					<GeneSearchBox />
				</div>
				<div className='img'>kjhkjh</div>
			</Aux>
		)
	}
}

export default TestingPage;