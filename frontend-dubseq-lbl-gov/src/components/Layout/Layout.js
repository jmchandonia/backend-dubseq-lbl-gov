import React from 'react';
import Aux from '../../hoc/Aux';
import "./Layout.css";

const Layout = (props) => (

	<Aux>
		<div className="container-fluid">
			<div className='row flex-xl-nowrap'>
				{/* <div className="col-12 col-md-3 col-xl-2 bd-sidebar" style={{ padding: 0}}> */}
				<div className="col-xl-2 bd-sidebar" style={{ padding: 0}}>
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
		</div>
	</Aux>

)

export default Layout;
