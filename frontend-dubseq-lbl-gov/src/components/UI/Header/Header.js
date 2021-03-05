import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => (
	<div className={classes.header}>
		<Navbar bg="dark" className="d-flex flex-row p-4 bg-dark border-bottom shadow-sm, justify-content-between">
			<Link className={classes.logo} to='/'>DubSeq Brower</Link>
			<Form inline>
				<FormControl type="text" placeholder="Search" className=" mr-sm-2" />
				<Button type="submit" >Search</Button>
			</Form>
		</Navbar>
	</div >
)

export default Header;