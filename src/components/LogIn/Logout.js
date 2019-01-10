import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {bindActionCreators} from "redux";
import * as mainActions from "../../actions/mainAction"; 


class Logout extends Component {
    componentDidMount () {
        this.props.logout();
    }
    render () {
        return <Redirect to="/"/>;
    };
};

function mapDispatchToProps(dispatch) {
    return {...bindActionCreators(mainActions, dispatch)}
  };

export default connect(null, mapDispatchToProps)(Logout);