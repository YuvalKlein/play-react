import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators, compose } from "redux";
import { firestoreConnect } from 'react-redux-firebase'

import * as mainActions from "../../../actions/mainAction"; 

// import Map from '../../Map/Map';
import classes from './SessionInfo.css';

class SessionInfo extends React.Component {
  handelRemoveSession = (session) => {
    this.props.toggleSessiomInfo();
    this.props.removeSession(session);
  }

  render() {
      let curentSession=this.props.session.createdBy ?this.props.session :{createdBy:{}, players:[]};
    return (
      <div>
        <Modal isOpen={this.props.toggle}  >
          <ModalHeader toggle={()=>this.props.toggleSessiomInfo({})}>{curentSession.title}</ModalHeader>
          <ModalBody className={classes.SessionInfo}>
              <p>Craeted By: {curentSession.createdBy.firstName +"  "+ curentSession.createdBy.lastName} </p>
              <p>on {}</p>
              <img alt="" className={classes.FaceImg} src={curentSession.createdBy.photoURL}/>
              <p>{curentSession.details}</p>
              {/* <div className={classes.Players}>{curentSession.players.map((player,i) => <div key={i}><img alt="" className={classes.FaceImg} src={player.photoURL}/></div>)}</div> */}
              {/* <Map/> */}

          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.booked}>BOOK</Button>
            <Button color="secondary" onClick={this.props.toggleInfo}>EDIT</Button>
            <Button color="secondary" onClick={() => this.handelRemoveSession(this.props.session)}>DELETE</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // const sessionList = state.firestoreReducer.data.sessionList;
  // const id = ownProps.match.params.id;
  // why I don't have params like in leacture 20 04:40
  return {
    toggle: state.sessionReducer.sessionInfoToggle,
    session: state.sessionReducer.session
    // how the session working when it goes to the sessionReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};


export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([{
    collection: 'sessionList'
  }])
)(SessionInfo);