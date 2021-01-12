import React, {Component} from 'react';
import Aux from '../../../hoc/Aux'
import Header from '../../Header/Header';
import './AboutPage.css'

class About extends Component {



	render () {
		return (
			<Aux>
				<Header title='AboutDubSeq'/>
				<div className='container'>About DubSeq Browser</div>
			</Aux>
		)
	}
}

export default About