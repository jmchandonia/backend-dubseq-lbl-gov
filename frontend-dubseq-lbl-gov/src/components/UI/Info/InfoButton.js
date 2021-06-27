
import React from 'react';
import classes from "./InfoButton.module.css";
import { BsFillInfoCircleFill } from 'react-icons/bs'

let Info = () => (
	<div className={classes.info}>
		<BsFillInfoCircleFill />
		<span className={classes.extra_info} style={{color: 'black'}}>A little info</span>
	</div>
)

export default Info