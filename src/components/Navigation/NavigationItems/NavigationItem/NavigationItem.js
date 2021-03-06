import React from 'react';
import {NavLink} from "react-router-dom";

import classes from './NavigationItem.css'

const navigationItem = (props) => {
    return(
    <li className={classes.NavigationItem}>
        <NavLink to={props.link} 
            className={props.active ? classes.active : null}
            onClick={props.closed}
            >{props.children}</NavLink>
    </li>
);}

export default navigationItem;