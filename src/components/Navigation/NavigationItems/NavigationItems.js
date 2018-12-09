import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/login" closed={props.closed}>Welcome!</NavigationItem>
        <NavigationItem link="/" closed={props.closed}>Schedule</NavigationItem>
        <NavigationItem link="/MyClasses" closed={props.closed}>My Classes</NavigationItem>
        <NavigationItem link="/contact" closed={props.closed}>Contact Us</NavigationItem>
        <NavigationItem link="/" closed={props.closed}>Loguot</NavigationItem>
    </ul>
);

export default navigationItems;