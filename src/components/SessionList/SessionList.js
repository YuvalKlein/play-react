import React, { Component } from 'react';
// import './SessionList.css';
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {bindActionCreators} from "redux";
import axios from '../../axios-sessions';

import * as mainActions from "../../actions/mainAction";
import SessionView from './SessionView/SessionView';
import NewSession from './NewSession/NewSession';
import SessionInfo from '../SessionList/SessionInfo/SessionInfo';
import Spinner from '../UI/Spinner/Spinner';

class SessionList extends Component {
  state={
    sessionList: []
  };
  componentDidMount(){
    axios.get('/sessionList.json')
      .then(response => {

        this.setState({sessionList: Object.values(response.data)});
      });
  }
  
  handleAdd=(session)=>{
     let newSeesionList = this.state.sessionList;
        newSeesionList.push(session)
    this.setState({sessionList:newSeesionList});
    axios.post('/sessionList.json', session)
    this.props.XaddNewSession(session)
  };

  handleFBAdd=(session)=>{
    this.props.XaddNewSession(session)
  };

  render() {
    console.log("y");
    // let sessionL =this.state.sessionList
    // if(sessionL){
    //   const sessions = Object.values(sessionL).map((session, index) => {
    //     console.log("session", session);
    //     return (
    //       <SessionView key={index} session={session} />
    //     );
    //   });
    let sessionLFB =this.props.sessionList
    if(sessionLFB){
      const sessions = sessionLFB.map((session) => {
        return (
            <SessionView key={session.id} session={session} />
        );
      });
  
      return (
        <div >
            <h1>Today</h1>
          {sessions}
          <NewSession handleNewSession={this.handleFBAdd} user={this.props.user} auth={this.props.auth}/>
          <SessionInfo/>
        </div>
      );
    }else{
      return  <Spinner/> 
    }

  }
}
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
    { collection: 'sessionList', orderBy: ['date', 'desc']}
  ])
)(SessionList, axios);