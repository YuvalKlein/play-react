import React, { Component } from 'react';
// import './SessionList.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import axios from '../../axios-sessions';

import * as mainActions from "../../actions/mainAction";
import SessionView from './SessionView/SessionView';
import NewSession from './NewSession/NewSession';
import SessionInfo from '../SessionList/SessionInfo/SessionInfo';
let mockData = require('./mockData');

class SessionList extends Component {
  state={
    count:0
  };
  componentWillMount(){
    this.props.createSessionList(mockData.sessionList);
  }
  handleAdd=(session)=>{
    this.setState({count: this.state.count++});
    this.props.addNewSession(session)
  };
  render() {
    let sessionList = this.props.sessionList
    
    if(sessionList){
      const sessions = sessionList.map((session, index) => {
        return (
          <SessionView key={index} session={session} />
        );
      });
  
      return (
        <div >
            <h1>Today</h1>
          {sessions}
          <NewSession handleNewSession={this.handleAdd } user={this.props.user}/>
          <SessionInfo/>
        </div>
      );
    }else{
      return  <h2>Loading...</h2>  
    }

  }
}
const mapStateToProps = state => ({
  sessionList: state.sessionReducer.sessionList,
  user:state.userReducer,

});
function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};
export default connect(mapStateToProps,mapDispatchToProps)(SessionList, axios);