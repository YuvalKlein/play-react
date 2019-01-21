import React, { Component } from 'react';
// import './SessionList.css';
import {connect} from "react-redux";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {bindActionCreators} from "redux";
import axios from '../../axios-sessions';

import * as mainActions from "../../actions/mainAction";
import SessionView from './SessionView/SessionView';
import NewSession from './NewSession/NewSessionn';
import SessionInfo from '../SessionList/SessionInfo/SessionInfo';
import Spinner from '../UI/Spinner/Spinner';
import SignOutDialog from '../Dialogs/signOutDialog/signOutDialog';
import ShareButton from '../Dialogs/ShareDialog/ShareDialog';

class SessionList extends Component {
  state={
    session:{}
  }
  handleAdd=(session)=>{
    this.props.addNewSession(session)
  };

  render() {
    let sessionLFB =this.props.sessionList;

    if(sessionLFB){
      const sessions = sessionLFB.map((session,id) => {
        return (
            <SessionView key={session.id} session={session} />
        );
      });
  
      return (
        <div >
            <h1>Today</h1>
          {sessions}
          <ShareButton/>
          <NewSession handleNewSession={this.handleAdd} user={this.props.user} auth={this.props.auth}/>
          <SessionInfo/>
          <SignOutDialog />

        </div>
      );
    }else{
      return  <Spinner/> 
    }

  }
}
const mapStateToProps = state => {
  for (const s of state.firestoreReducer.ordered.sessionList||[])
  {
    if (s.id!='LHdfvYSGKNoIIhzt8Gk7') continue;
  }
  return {
  sessionList: state.firestoreReducer.ordered.sessionList,
  user: state.firebaseReducer.profile,
  auth: state.firebaseReducer.auth,
  
}};
function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
    { collection: 'sessionList'}
  ])
)(SessionList, axios);