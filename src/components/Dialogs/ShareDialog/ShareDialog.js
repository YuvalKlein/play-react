import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ShareButton from '../../UI/shareButton/shareButton';
import * as mainActions from '../../../actions/mainAction';

class AlertDialog extends React.Component {
	state = {
		open: false
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
				<Dialog
					open={this.props.shareDialogOpen}
					onClose={this.props.toggleDialogShare}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{'Invite friends to play with you'}</DialogTitle>
					<DialogContent>
						<ShareButton
							urll={'https:/playsport.co.il/' + this.props.sessionID}
							name={
								this.props.user ? (
									this.props.user.firstName + ' invite you to play ' + this.props.sessionTitle
								) : null
							}
							session={this.props.session}
							clicked={this.props.toggleDialogShare}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.props.toggleDialogShare(this.props.session)} color="primary">
							Next time
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	shareDialogOpen: state.sessionReducer.shareDialogOpen,
	user: state.firebaseReducer.profile,
	session: state.sessionReducer.session,
	sessionID: state.sessionReducer.sessionID,
	sessionTitle: state.sessionReducer.sessionTitle
});

function mapDispatchToProps(dispatch) {
	return { ...bindActionCreators(mainActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
