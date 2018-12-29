import React, { Component } from 'react';
// import './SessionList.css';
import {connect} from "react-redux";
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
    this.props.addNewSession(session)
  };

  render() {
    let sessionL =this.state.sessionList
    if(sessionL){
      const sessions = Object.values(sessionL).map((session, index) => {
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
      return  <Spinner/> 
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