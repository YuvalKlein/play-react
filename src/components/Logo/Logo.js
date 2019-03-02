import React from 'react';
import { NavLink } from 'react-router-dom';

import Logo from '../../assets/images/logo.bmp';
import classes from './Logo.css';

const logo = (props) => (
	<div className={classes.Logo} style={{ height: props.height }}>
		<NavLink to="/">
			<img src={Logo} alt="MyBurger" />
		</NavLink>
	</div>
);

export default logo;
