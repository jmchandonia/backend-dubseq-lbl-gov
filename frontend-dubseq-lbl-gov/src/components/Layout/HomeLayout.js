import React from 'react';
import Aux from '../../hoc/Aux';


const layout = (props) => (

	<Aux>
		<h2>{props.rowOneTitle}</h2>
		<div class="card-deck">
			{props.rowOne}
		</div>
		<h2>{props.rowTwoTitle}</h2>
		<div class="card-deck">
			{props.rowTwo}
		</div>
	</Aux>
)

export default layout;