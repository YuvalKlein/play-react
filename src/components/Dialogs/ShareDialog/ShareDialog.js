import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
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
		console.log(this.props);
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
							urll={'https:/playsport.co.il/' + this.props.session.id}
							name={
								this.props.user ? (
									this.props.user.firstName + ' invite you to play ' + this.props.session.title
								) : null
							}
							clicked={this.props.toggleDialogShare}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.props.toggleDialogShare} color="primary">
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
	session: state.sessionReducer.session
});

function mapDispatchToProps(dispatch) {
	return { ...bindActionCreators(mainActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
