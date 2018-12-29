import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {props.isAuth
            ? <NavigationItem link="/account" closed={props.closed}>Welcome {props.name}!</NavigationItem>
            : <NavigationItem link="/login" closed={props.closed}>Log In</NavigationItem>}
        <NavigationItem link="/" closed={props.closed}>Schedule</NavigationItem>
        <NavigationItem link="/MyClasses" closed={props.closed}>My Classes</NavigationItem>
        <NavigationItem link="/contact" closed={props.closed}>Contact Us</NavigationItem>
        {props.isAuth
            ? <NavigationItem link="/" closed={props.closed}>Loguot</NavigationItem>
            : null}
    </ul>
);

export default navigationItems;