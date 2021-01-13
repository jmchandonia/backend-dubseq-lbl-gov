import React from 'react';
import Aux from '../../hoc/Aux';
import "./Layout.css";

const Layout = (props) => (

	<Aux>
		<main className='content'>
			<div className='row flex-xl-nowrap'>
				<div className="col-sm-2 bd-sidebar">
					<div className='nagivation-bar'>
						<div className='container'>
							{props.navbarContent}
						</div>
					</div>
				</div>
				<div className="col-sm-10">
					<div className='container'>
						{props.mainContent}
					</div>
				</div>
			</div>
		</main>
	</Aux>

)

export default Layout;
