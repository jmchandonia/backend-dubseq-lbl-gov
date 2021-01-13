import React from 'react';
import Aux from '../../hoc/Aux';
import './HomeLayout.css';

const layout = (props) => (

	<Aux>
		<h2>{props.rowOneTitle}</h2>
		<div className="card-deck">
			{props.rowOne}
		</div>
		<div className='space-top'>
			<h2>{props.rowTwoTitle}</h2>
		</div>
		<div class="card-deck">
			{props.rowTwo}
		</div>
	</Aux>
)

export default layout;