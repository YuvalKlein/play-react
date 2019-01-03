import React from 'react';
import { connect } from 'react-redux';

import { logoutFB } from '../../../actions/mainAction';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const navigationItems = (props) => { 
    const {auth} = props;
    return (
    <ul className={classes.NavigationItems}>
        {auth.uid
            ? <NavigationItem link="/account" closed={props.closed}>Welcome {props.name}!</NavigationItem>
            : <NavigationItem link="/login" closed={props.closed}>Log In</NavigationItem>}
        <NavigationItem link="/" closed={props.closed}>Schedule</NavigationItem>
        <NavigationItem link="/MyClasses" closed={props.closed}>My Classes</NavigationItem>
        <NavigationItem link="/contact" closed={props.closed}>Contact Us</NavigationItem>
        {auth.uid
            ? <NavigationItem link="/logout" closed={props.closed}>Loguot</NavigationItem>
            : null}
    </ul>
)};

const mapStateToProps = (state) => {
    return {
        auth: state.firebaseReducer.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      signOut: () => dispatch(logoutFB())
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(navigationItems);