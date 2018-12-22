import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Map from '../../Map/Map';
import classes from './SessionInfo.css';

class SessionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    //   date:null,
    //   time:null,
    //   endTime:null,
    //   title:null,
    //   location:null,
    //   minPlayers:null,
    //   maxPlayers:null,
    //   players: [{avatar:null}]
    };

    this.toggle = this.toggle.bind(this);
  }
  
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
      const icons = [];
      
    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle}>+ ADD</Button> */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody className={classes.SessionInfo}>
          
              <p>{this.props.createdBy}</p>
              {/* {avatars}          */}
              <Map/>

          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SessionInfo;