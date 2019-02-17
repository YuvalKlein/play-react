import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import classes from './EditSession.css';
import Input from '../../UI/Input/Input';
import TextField from '@material-ui/core/TextField';

import Spinner from '../../UI/Spinner/Spinner';
import { checkValidity } from '../../LogIn/form/validation';

class EditSession extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: this.props.session.title,
			details: this.props.session.details,
			location: this.props.session.location,
			date: this.props.session.date,
			startTime: this.props.session.startTime,
			endTime: this.props.session.endTime,
			minPlayers: this.props.session.minPlayers,
			maxPlayers: this.props.session.maxPlayers
		};
	}

	handleEdit = () => {
		let editedSession = {};
		editedSession = {
			date: this.state.date,
			time: this.state.startTime,
			endTime: this.state.endTime,
			title: this.state.title,
			details: this.state.details,
			location: this.state.location,
			minPlayers: this.state.minPlayers,
			maxPlayers: this.state.maxPlayers,
			id: this.props.session.id
		};
		console.log('NESS', editedSession);
		this.props.editSessionHandle(editedSession);
		this.props.toggle('toggleEdit');
		this.props.toggleDialogShare(editedSession);
	};

	handleChange = (name, event) => {
		this.setState({
			[name]: event.target.value
		});
	};
	titleHandler = (title) => {
		this.setState({ title: title.target.value });
	};

	render() {
		if (!this.props.session) {
			return <Spinner />;
		}
		return (
			<div>
				<Modal
					isOpen={this.props.editOpen}
					toggle={() => this.props.toggle('toggleEdit')}
					className={classes.NewSession}
				>
					<ModalHeader toggle={() => this.props.toggle('toggleEdit')}>
						Edit {this.props.session.title}
					</ModalHeader>
					<ModalBody className={classes.Content}>
						<form>
							{/* {form} */}
							<Input
								className={classes.NewSession}
								value={this.state.title}
								valid={checkValidity(this.state.title, {
									required: true,
									minLength: 2
								})}
								touched={this.state.titleTouch}
								changed={(e) => this.handleChange('title', e)}
								placeholder="Title"
							/>
							<Input
								value={this.state.details}
								valid={checkValidity(this.state.details, {
									required: true,
									minLength: 2
								})}
								multiline={true}
								touched={this.state.detailsTouch}
								changed={(e) => this.handleChange('details', e)}
								placeholder="Details"
							/>
							<Input
								value={this.state.location}
								valid={checkValidity(this.state.location, {
									required: true,
									minLength: 2
								})}
								touched={this.state.locationTouch}
								changed={(e) => this.handleChange('location', e)}
								placeholder="Location"
							/>
							<Input
								id="date"
								placeholder="Date"
								type="date"
								defaultValue={this.state.date}
								// className={classes.textField}
								changed={(e) => this.handleChange('date', e)}
								InputLabelProps={{
									shrink: true
								}}
							/>
							<div style={{ textAlign: 'center' }}>
								<TextField
									id="time"
									onChange={(e) => this.handleChange('startTime', e)}
									label="Start at"
									type="time"
									defaultValue={this.state.startTime}
									style={{ margin: '10px' }}
									InputLabelProps={{
										shrink: true
									}}
									inputProps={{
										step: 300 // 5 min
									}}
								/>
								<TextField
									id="time2"
									onChange={(e) => this.handleChange('endTime', e)}
									label="End at"
									type="time"
									defaultValue={this.state.startTime}
									style={{ margin: '10px' }}
									InputLabelProps={{
										shrink: true
									}}
									inputProps={{
										step: 300 // 5 min
									}}
								/>
							</div>
							<p
								style={{
									textAlign: 'center',
									marginBottom: '0px',
									marginTop: '10px',
									color: 'rgb(169, 169, 169)'
								}}
							>
								Minimum Players
							</p>
							<Input
								id="standard-number"
								// label="Minimum Players"
								value={this.state.minPlayers}
								changed={(e) => this.setState({ minPlayers: e.target.value })}
								type="number"
								style={{ textAlign: 'center', marginTop: '0' }}
								InputLabelProps={{
									shrink: true
								}}
								margin="normal"
							/>
							<p
								style={{
									textAlign: 'center',
									marginBottom: '0px',
									marginTop: '10px',
									color: 'rgb(169, 169, 169)'
								}}
							>
								Maximum Players
							</p>
							<Input
								id="standard-number"
								value={this.state.maxPlayers}
								changed={(e) => this.setState({ maxPlayers: e.target.value })}
								type="number"
								style={{ textAlign: 'center', marginTop: '0' }}
								InputLabelProps={{
									shrink: true
								}}
								margin="normal"
							/>
							<div className={classes.Buttons}>
								<Button
									className={classes.SubmitButton}
									color="primary"
									onClick={() => this.handleEdit()}
								>
									EDIT
								</Button>
								<Button
									className={classes.SubmitButton}
									color="secondary"
									onClick={() => this.props.toggle('toggleEdit')}
								>
									Cancel
								</Button>
							</div>
						</form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default EditSession;
