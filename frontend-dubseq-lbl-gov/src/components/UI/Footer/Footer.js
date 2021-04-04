import React from 'react';
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => (
	<footer className="footer">
		<div className='container py-1 footer-wrapper'>
			<div className='row'>
				<div className="col-md-1 footer-link">
					<Link to="/graphPage">Graphs</Link>
				</div>
				<div className="col-md-1 footer-link">
					<Link to="/testing">Testing</Link>
				</div>
				<div className='col-md-1 footer-link'>
					<Link to="/about">About</Link>
				</div>
				<div className='col-md-7'></div>
				<div className='col-md-2 text-right footer-copyright'>
					<p>DubSeq © 2021</p>
				</div>
			</div>
		</div>
	</footer>
)

export default Footer;