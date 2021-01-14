import React from 'react'
import Aux from '../../../hoc/Aux';
import GeneSearchBox from '../../Pages/Search/GeneSearchBox';
import classes from './TestingPage.module.css';

class TestingPage extends React.Component {

	render() {
		return (
			<Aux>
				<div className={classes.center}>
					<GeneSearchBox />
				</div>
			</Aux>
		)
	}
}

export default TestingPage;