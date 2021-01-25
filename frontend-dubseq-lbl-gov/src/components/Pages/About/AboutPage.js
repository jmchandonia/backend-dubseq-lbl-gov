import React, {Component} from 'react';
import Aux from '../../../hoc/Aux'
import Content from '../../../hoc/Content/Content';
import Header from '../../Header/Header';
import Footer from '../../UI/Footer/Footer';

class About extends Component {

	render () {
		return (
			<Aux>
				<Header title='AboutDubSeq'/>
				<Content>
				<div className='container'>About DubSeq Browser</div>
				</Content>
				<Footer/>
			</Aux>
		)
	}
}

export default About