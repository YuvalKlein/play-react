import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import classes from './bookButton.css';
import * as mainActions from '../../../actions/mainAction';

const bookButton = (props) => {
    return(
        <button onClick={()=>props.clicked(props.clickedSession)} className={props.classN} >{props.title}</button>
        // <button onClick={()=>props.booked(props.session)} className={btnBook?classes.Cancel : classes.Book} >{btnBook?"CANCEL":"BOOK"}</button>
)};

const mapStateToProps = state => ({
    // inClass: state.sessionReducer.inClass
});

function mapDispatchToProps(dispatch) {
    return {...bindActionCreators(mainActions, dispatch)}
  };

export default connect(mapStateToProps, mapDispatchToProps)(bookButton);