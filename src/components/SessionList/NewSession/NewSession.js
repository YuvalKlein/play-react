import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class NewSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dateSession:null,
      timeSession:null,
      title:null,
      location:null,
    };

    this.toggle = this.toggle.bind(this);
  }
  handleAdd(){
    this.toggle();
    console.log(this.props.user)
    let newS ={}
    if(this.props.user){
      newS = {
        date:this.state.dateSession,
        time:this.state.dateSession,
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
        }
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
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Add new Class</ModalHeader>
          <ModalBody>
          
              <input type='text' onChange={(event)=>{this.setState({title:event.target.value})}} placeholder='Title' />
              <input type='text' onChange={(event)=>{this.setState({location:event.target.value})}} placeholder='Location' />           
              <input type='time' onChange={(event)=>{this.setState({timeSession:event.target.value})}} placeholder='Location' />           
              <input type='date' onChange={(event)=>{this.setState({dateSession:event.target.value})}} placeholder='Location' />           

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