import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import ShareButton from '../../UI/shareButton/shareButton';
import * as mainActions from "../../../actions/mainAction";

class AlertDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.props.toggleDialogShare}>
          Open alert dialog
        </Button>
        <Dialog
          open={this.props.shareDialogOpen}
          onClose={this.props.toggleDialogShare}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Invite friends to play with you"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <ShareButton urll='http://localhost:3000/'/>
                </DialogContentText>
            </DialogContent>
          <DialogActions>
            <Button onClick={this.props.toggleDialogShare} color="primary">
              Next time
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  shareDialogOpen: state.sessionReducer.shareDialogOpen,
  auth: state.firebaseReducer.auth,
  session: state.sessionReducer.session
});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);