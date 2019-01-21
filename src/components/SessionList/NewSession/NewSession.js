import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FloatButton from '../../UI/FloatButton/FloatButton';
import classes from './NewSession.css';

class NewSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      date:null,
      time:null,
      details: null,
      endTime:null,
      title:null,
      location:null,
      minPlayers:1,
      maxPlayers:1
    };

    this.toggle = this.toggle.bind(this);
  }
  handleAdd(){
    this.toggle();
    let newS ={}
    newS = {
      date:this.state.date,
      time:this.state.time,
      endTime:this.state.endTime,
      title:this.state.title,
      details:this.state.details,
      location:this.state.location,
      players: [{
        firstName: this.props.user.firstName,
        uid: this.props.auth.uid,
        lastName: this.props.user.lastName,
        photoURL: this.props.user.photoURL,
      }],
      created: new Date(),
      createdBy: {
        firstName: this.props.user.firstName,
        uid: this.props.auth.uid,
        lastName: this.props.user.lastName,
        photoURL: this.props.user.photoURL,
      },
      minPlayers: this.state.minPlayers,
      maxPlayers: this.state.maxPlayers
    }
    this.props.handleNewSession(newS);
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
    let addButton = null;
    this.props.auth.uid ? addButton = <FloatButton clicked={this.toggle}/> : addButton=<NavLink to='/login' ><FloatButton /></NavLink> 

    return (
      <div>
        {addButton}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={classes.NewSession} >
       
          <ModalHeader toggle={this.toggle}>Add new Class</ModalHeader>
          <ModalBody className={classes.Content}>
          
              <input type='text' onChange={(event)=>{event.target.value.length>0?this.errorTitle=null && this.setState({title:event.target.value}):this.errorTitle= <p>Error</p>}} placeholder='Title' required />{this.errorTitle}
              <textarea type='text' onChange={(event)=>{this.setState({details:event.target.value})}} placeholder='Detials' required/>
              <input type='text' onChange={(event)=>{this.setState({location:event.target.value})}} placeholder='Location' required />           
              <input type='time' onChange={(event)=>{this.setState({time:event.target.value})}} required/>           
              <input type='time' onChange={(event)=>{this.setState({endTime:event.target.value})}}  required/>           
              <input type='date' onChange={(event)=>{this.setState({date:event.target.value})}} required />           
              <input type='number' value={this.state.minPlayers} onChange={(event)=>{this.setState({minPlayers:event.target.value})}} placeholder='Minimum Players' required/>           
              <input type='number' value={this.state.maxPlayers} onChange={(event)=>{this.setState({maxPlayers:event.target.value})}} placeholder='Maximum Players' required/>           

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