import React from 'react';
import classes from './Content.module.css';

const Content = (props) => (
	<div className={classes.content}>{props.children}</div>
)

export default Content;