import React from 'react';
import HorizontalLayout from './HorizontalLayout';

const Layout = (props) => (
	<HorizontalLayout content={[props.navbarContent, props.mainContent]} contentWidth={[2, 10]} />
)

export default Layout;
