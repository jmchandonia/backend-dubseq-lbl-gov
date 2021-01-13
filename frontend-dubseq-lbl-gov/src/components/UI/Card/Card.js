import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';


const card = (props) => (


	<div className='card'>
		<div class='card-dynamic'>
			<div className='container'>
				<h5 class="card-title">{props.title}</h5>
				<div className='img'>
					{props.image == null ? <div>"def img"</div> : <img className="card-img-top" src={props.image} alt="Card cap" />}
				</div>
				<div class="card-body">
					<div className='card-text'>{props.body}</div>
					<Link to={props.link} className='stretched-link' />
				</div>
			</div>

		</div>
	</div>


)

export default card;