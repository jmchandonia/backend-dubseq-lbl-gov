import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

const Navbar = (props) => (
	<header className="navbar navbar-expnad-lg navbar-dark bg-dark">
		
		<Link className='Logo' to='/'>DubSeqVis</Link>
		<div className='title'>{props.title}</div>
		<Link to='/about'>About</Link>
	</header>
)

export default Navbar;