import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Form, FormControl } from 'react-bootstrap';
import "./Header.css";

const Header = () => (
	<div className="header">
		<div className="navbar-wrapper p-4 shadow-sm">
			<div className="d-flex flex-wrap justify-content-between align-items-center">
				<div className='d-flex align-items-center'>
					<Link className="logo" to='/'>DubSeq Browser</Link>
					<div className="d-flex navbar-links-wrapper">
						<Link to='/graphs'>Graphs</Link>
						<Link to='/organisms'>Organisms</Link>
						<Link to='/experiments'>Experiments</Link>
						<Link to='/genes'>Genes</Link>
					</div>
				</div>
				<div className="d-flex navbar-links-wrapper">

					<Link to="/about">About</Link>
					<Link to="/testing">Testing</Link>

				</div>
			</div>


			{/* <Form inline>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				<button type="submit" style={{ backgroundColor: "#fa7f72", color: "#ffffff" }} className="navbar-search-button btn">Search</button>
			</Form> */}
		</div>

	</div >
)

export default Header;