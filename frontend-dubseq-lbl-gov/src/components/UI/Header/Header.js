import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Form, FormControl } from 'react-bootstrap';
import "./Header.css";

const Header = () => (
	<div className="header">
		<Navbar className="navbar-wrapper d-flex flex-row p-4 shadow-sm justify-content-between">
			<div className="d-flex justify-content-left align-items-center">
				<Link className="logo" to='/'>DubSeq Browser</Link>
				<div className="navbar-links-wrapper d-flex justify-content-left">
					<Link to="/graphPage">Graphs</Link>
					<Link to="/testing">Testing</Link>
					<Link to="/about">About</Link>
					
				</div>
			</div>

			<Form inline>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" />
				<button type="submit" style={{ backgroundColor: "#fa7f72", color: "#ffffff" }} className="navbar-search-button btn">Search</button>
			</Form>
		</Navbar>
	</div >
)

export default Header;