import React, { Component } from 'react';
// import './SessionList.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { Button } from 'reactstrap';

import * as mainActions from "./../../actions/mainAction";
import SessionView from './SessionView/SessionView';
import NewSession from './NewSession/NewSession';
let mockData = require('./mockData')

class SessionList extends Component {
 
  componentWillMount(){
    this.props.createSessionList(mockData.sessionList);
  }
  render() {
    let sessionList = this.props.sessionList
    if(sessionList){
      const sessions = sessionList.map((session, index) => {
        return (
          <SessionView key={index} session={session}/>
        );
      });
  
      return (
        <div >
            <h1>SessionList</h1>
          {sessions}
          <NewSession/>
        </div>
      );
    }else{
      return  <h2>Loading...</h2>  
    }

  }
}
const mapStateToProps = state => ({
  name: state.mainReducer.name,
  sessionList: state.mainReducer.sessionList,

});
function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};
export default connect(mapStateToProps,mapDispatchToProps)(SessionList);