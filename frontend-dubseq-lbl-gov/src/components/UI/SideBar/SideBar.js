import React from 'react';
import classes from './SideBar.module.css';
import { Link } from 'react-router-dom';

const sideBar = (props) => (
	<div className={classes.nav_content}>
		<ul>
			{props.content.map((data, index) =>
				<li key={index} className={classes.link}>
					<Link id={classes.link_button} to={data.path}>
						{data.name}
					</Link>
				</li>)
			}
		</ul>
	</div>
)

export default sideBar;