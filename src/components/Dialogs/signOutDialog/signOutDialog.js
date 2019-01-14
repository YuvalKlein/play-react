import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as mainActions from "../../../actions/mainAction";

class AlertDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickYes = (props) => {
      this.removeFromSessionHandler(props);
      this.props.toggleSignOutDialog();
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  removeFromSessionHandler=()=>{  
    console.log('session', this.props.session.players);
    const players = this.props.session.players.filter(player => player.uid !== this.props.auth.uid);
    console.log('players', players);
    this.props.removeFromSession(this.props.session, players);
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.signOutDialogOpen}
          onClose={this.props.toggleSignOutDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure you want to signout?"}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText id="alert-dialog-description">
              
            </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.toggleSignOutDialog} color="primary">
              NO
            </Button>
            <Button onClick={this.handleClickYes} color="primary" autoFocus>
              YES
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    signOutDialogOpen: state.sessionReducer.signOutDialogOpen,
    auth: state.firebaseReducer.auth,
    session: state.sessionReducer.session
});

function mapDispatchToProps(dispatch) {
    return {...bindActionCreators(mainActions, dispatch)}
  };

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);