import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from './NewSession.css';

class NewSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      date:null,
      time:null,
      endTime:null,
      title:null,
      location:null,
      minPlayers:null,
      maxPlayers:null
    };

    this.toggle = this.toggle.bind(this);
  }
  handleAdd(){
    this.toggle();
    console.log(this.props.user)
    let newS ={}
    if(this.props.user){
      newS = {
        id: new Date,
        date:this.state.date,
        time:this.state.time,
        endTime:this.state.endTime,
        title:this.state.title,
        location:this.state.location,
        players: [{
          fName: this.props.user.firstName,
          lName: this.props.user.lastName,
          avatar: this.props.user.avatar
        }],
        createdBy: {
          fName: this.props.user.firstName,
          lName: this.props.user.lastName,
          avatar: this.props.user.avatar
        },
        minPlayers: this.state.minPlayers,
        maxPlayers: this.state.maxPlayers
      }
      this.props.handleNewSession(newS)
    }

  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  titleHandler=(title) => {
    this.setState({title:title.target.value})    
  }

  render() {
    let user = this.props.user;
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>+ ADD</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={classes.NewSession} >
          <ModalHeader toggle={this.toggle}>Add new Class</ModalHeader>
          <ModalBody className={classes.Content}>
          
              <input type='text' onChange={(event)=>{this.setState({title:event.target.value})}} placeholder='Title' />
              <input type='text' onChange={(event)=>{this.setState({location:event.target.value})}} placeholder='Location' />           
              <input type='time' onChange={(event)=>{this.setState({time:event.target.value})}} />           
              <input type='time' onChange={(event)=>{this.setState({endTime:event.target.value})}} />           
              <input type='date' onChange={(event)=>{this.setState({date:event.target.value})}} />           
              <input type='number' onChange={(event)=>{this.setState({minPlayers:event.target.value})}} placeholder='Minimum Players'/>           
              <input type='number' onChange={(event)=>{this.setState({maxPlayers:event.target.value})}} placeholder='Maximum Players'/>           

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleAdd.bind(this)}>ADD</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default NewSession;