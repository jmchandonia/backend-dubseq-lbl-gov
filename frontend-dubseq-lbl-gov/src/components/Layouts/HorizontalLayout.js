import React from 'react';
import Aux from '../../hoc/Aux';


const HorizontalLayout = (props) => (
	<Aux>
		<div style={{ margin: '0px 15px 0px 0px' }}>
			<div className='row'>
				{props.content.map((data, index) =>
					<div key={index} className={`col-sm-${props.contentWidth[index]}`}>
						{data}
					</div>)
				}
			</div>
		</div >
	</Aux>
)

export default HorizontalLayout;