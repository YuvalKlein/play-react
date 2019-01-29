import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mainActions from '../../../actions/mainAction';

class AlertDialog extends React.Component {
	state = {
		open: false
	};

	handleClickYes = (props) => {
		if (this.props.session.players.length === 1) {
			this.props.removeSession(this.props.session);
			this.props.toggleSignOutDialog(this.props.session);
		} else {
			this.removeFromSessionHandler();
			this.props.toggleSignOutDialog(this.props.session);
		}
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	removeFromSessionHandler = () => {
		console.log('session', this.props.session.players);
		const players = this.props.session.players.filter((player) => player.uid !== this.props.auth.uid);
		console.log('players', players);
		this.props.removeFromSession(this.props.session, players);
	};

	render() {
		// let message = '';
		// this.props.session.players.length === 1 ? message = 'This will remove the class, are you sure?' : message = "Are you sure you want to signout?";
		return (
			<div>
				<Dialog
					open={this.props.signOutDialogOpen}
					onClose={() => this.props.toggleSignOutDialog(this.props.session)}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">Are you really want to cancel?</DialogTitle>
					<DialogContent>
						{/* <DialogContentText id="alert-dialog-description">
              
            </DialogContentText> */}
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.props.toggleSignOutDialog({ session: {} })} color="primary">
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

const mapStateToProps = (state) => ({
	signOutDialogOpen: state.sessionReducer.signOutDialogOpen,
	auth: state.firebaseReducer.auth,
	session: state.sessionReducer.session
});

function mapDispatchToProps(dispatch) {
	return { ...bindActionCreators(mainActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
