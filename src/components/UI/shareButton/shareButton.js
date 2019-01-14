import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

import * as mainActions from "../../../actions/mainAction";
import {FacebookShareButton, WhatsappShareButton} from 'react-share';

const shareButton = (props) => {
    
    return (
        <>
            <FacebookShareButton/>
            <WhatsappShareButton/>
        </>
    );
};

const mapStateToProps = state => {
    return {
    sessionList: state.firestoreReducer.ordered.sessionList,
    user: state.firebaseReducer.profile,
    auth: state.firebaseReducer.auth
  }};
  function mapDispatchToProps(dispatch) {
    return {...bindActionCreators(mainActions, dispatch)}
  };
  export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
      { collection: 'sessionList'}
    ])
  )(shareButton);