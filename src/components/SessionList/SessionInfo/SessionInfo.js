import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as mainActions from "../../../actions/mainAction"; 

import Map from '../../Map/Map';
import classes from './SessionInfo.css';

class SessionInfo extends React.Component {

  render() {
      // const icons = [];
      let curentSession=this.props.session.createdBy ?this.props.session :{createdBy:{}, players:[]}
    return (
      <div>
        <Modal isOpen={this.props.toggle}  >
          <ModalHeader toggle={()=>this.props.toggleInfo({})}>{curentSession.title}</ModalHeader>
          <ModalBody className={classes.SessionInfo}>
              <p>Craeted By: {curentSession.createdBy.fName +"  "+ curentSession.createdBy.lName} </p>
              <img alt="" className={classes.FaceImg} src={curentSession.createdBy.avatar}/>
              <p>{curentSession.details}</p>
              <div className={classes.Players}>{curentSession.players.map((player,i) => <div key={i}><img alt="" className={classes.FaceImg} src={player.avatar}/></div>)}</div>
              {/* <Map/> */}

          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.booked}>BOOK</Button>
            <Button color="secondary" onClick={this.props.toggleInfo}>EDIT</Button>
            <Button color="secondary" onClick={this.props.toggleInfo}>CANCEL</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    toggle: state.sessionReducer.sessionInfoToggle,
    session: state.sessionReducer.session,
  }
}

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};


export default connect(mapStateToProps,mapDispatchToProps)(SessionInfo);