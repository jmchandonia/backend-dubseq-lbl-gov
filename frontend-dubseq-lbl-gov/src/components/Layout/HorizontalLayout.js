import React from 'react';
import Aux from '../../hoc/Aux';

const HorizontalLayout = (props) => (
	<Aux>
		<div className='row'>
			{props.content.map((data, index) =>
				<div key={index} className='col'>
					<div style={{ width: props.contentProperty[index] + "%" }}>{data}</div>
				</div>)
			}
		</div>
	</Aux>
)

export default HorizontalLayout;
