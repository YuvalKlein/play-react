import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as mainActions from "./../../../actions/mainAction";
class NewSession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      dateSession:null,
      timeSession:null,
      title:null,
      instructor:null,
      location:null,
      players:null
    };

    this.toggle = this.toggle.bind(this);
  }
  handleAdd(){
    this.toggle();
    let newS = {
      date:this.state.dateSession,
      sessionName:this.state.title,
      instructor:this.state.instructor,
      location:this.state.location,
      players:[this.state.players]
    }
    this.props.addNewSession(newS)

  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  titleHandler=(title) => {
    console.log('title',title.target.value);
    this.setState({title:title.target.value})    
  }

  render() {
    console.log(    this.state.title)
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>+ ADD</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
          <ModalHeader toggle={this.toggle}>Add new Class</ModalHeader>
          <ModalBody>
          
              <input type='text' onChange={(event)=>{this.setState({title:event.target.value})}} placeholder='Class Title' />
           

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
const mapStateToProps = state => ({});
function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default connect(mapStateToProps,mapDispatchToProps)(NewSession);