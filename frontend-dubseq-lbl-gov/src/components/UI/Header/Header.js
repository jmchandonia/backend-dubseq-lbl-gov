import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';

const Header = (props) => (
	// <header className="navbar navbar-expnad-lg navbar-dark bg-dark">

	<div className={classes.header}>
		<header className="d-flex flex-row p-4 mb-3 bg-dark border-bottom shadow-sm">

			<div className="mr-auto">
				<Link className={classes.logo} to='/'>DubSeq Brower</Link>
			</div>
			<div>
				<Link to='/about'>About</Link>
			</div>
		</header>
	</div >
)

export default Header;