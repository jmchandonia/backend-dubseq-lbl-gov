import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Card.module.css';


const card = (props) => (

	<div className='card'>
		<div className={classes.card_dynamic}>
			<div className='container'>
				<h5 className="card-title">{props.title}</h5>
				<div className={classes.img}>
					{props.image == null ? <div>"def img"</div> : <img className="card-img-top" src={props.image} alt="Card cap" />}
				</div>
				<div className="card-body">
					<div className='card-text'>{props.body}</div>
					<Link to={props.link} className='stretched-link' />
				</div>
			</div>

		</div>
	</div>


)

export default card;