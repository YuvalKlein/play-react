import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class ContactDialog extends React.Component {
	render() {
		return (
			<div>
				<Dialog
					open={this.props.open}
					onClose={this.props.close}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>Successfully sent, Thank you!</DialogContent>
					<DialogActions>
						<Button onClick={this.props.close} color="primary">
							CLOSE
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default ContactDialog;
