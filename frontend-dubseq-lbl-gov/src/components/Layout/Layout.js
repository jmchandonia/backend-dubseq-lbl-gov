import React from 'react';
import Aux from '../../hoc/Aux';
import "./Layout.css";

const Layout = (props) => (

	<Aux>
		<div className='row'>
			<div className="col-sm-2">
				<div className="sidebar">
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
	</Aux>

)

export default Layout;
