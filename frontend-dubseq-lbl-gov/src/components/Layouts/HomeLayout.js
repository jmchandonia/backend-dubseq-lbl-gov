import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './HomeLayout.module.css';

const layout = (props) => (

	<Aux>
		<div className={classes.container_self}>
			<h2>{props.rowOneTitle}</h2>
			<div className="card-deck">
				{props.rowOne}
			</div>
		</div>
		<div className={classes.container_self}>
			<h2>{props.rowTwoTitle}</h2>
			<div className="card-deck">
				{props.rowTwo}
			</div>
		</div>
	</Aux >
)

export default layout;