import React from 'react';
import './Footer.css';

const Footer = () => (
	<footer className='footer'>
		<div className='container py-1'>
			<div className='row'>
				<div className='col-sm-4'>
					<p>this is the left portion of the footer</p>
					<small class="d-block mb-3 text-muted">© 2020</small>
				</div>
				<div className='col-sm-4'>
					<p>this is the middle portion of the footer</p>
				</div>
				<div className='col-sm-4'>
					<p>this is the right portion of the footer</p>
				</div>
			</div>
		</div>
	</footer>
)

export default Footer;