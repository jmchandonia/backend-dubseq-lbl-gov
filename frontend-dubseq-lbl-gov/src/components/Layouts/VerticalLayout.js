import React from 'react';
import Aux from '../../hoc/Aux';

const VerticalLayout = (props) => (
	<Aux>
		{props.content.map((data, index) => <div key={index}>{data}</div>)}
	</Aux>
)

export default VerticalLayout;