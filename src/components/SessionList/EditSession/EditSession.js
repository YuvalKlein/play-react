import React from 'react';
import 'date-fns';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import FloatButton from '../../UI/FloatButton/FloatButton';
import classescss from './EditSession.css';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';

class EditSession extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalSession: false,
			selectedDate: new Date('2014-08-18T21:11:54'),
			minPlayers: 1,
			maxPlayers: 1,
			location: 'Where will you play?',
			date: null,
			time: new Date('2014-08-18T21:11:54'),
			endTime: new Date('2014-08-18T22:11:54'),
			title: '',
			details: ''
		};

		this.toggle = this.toggle.bind(this);
	}

	handleDone() {
		let newS = {};
		newS = {
			date: this.state.date,
			time: this.state.time,
			endTime: this.state.endTime,
			title: this.state.title,
			details: this.state.details,
			location: this.state.location,
			players: [
				{
					firstName: this.props.user.firstName,
					uid: this.props.auth.uid,
					lastName: this.props.user.lastName,
					photoURL: this.props.user.photoURL
				}
			],
			created: new Date(),
			createdBy: {
				firstName: this.props.user.firstName,
				uid: this.props.auth.uid,
				lastName: this.props.user.lastName,
				photoURL: this.props.user.photoURL
			},
			minPlayers: this.state.minPlayers,
			maxPlayers: this.state.maxPlayers
		};
		this.props.handleNewSession(newS);
		this.toggle();
	}
	toggle() {
		this.setState({
			modalSession: !this.state.modalSession
		});
	}

	handleDateChange = (date) => {
		this.setState({ selectedDate: date });
	};

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Modal isOpen={this.state.modalSession} toggle={this.toggle} className={classescss.NewSession}>
					<ModalHeader toggle={this.toggle}>Add new Class</ModalHeader>
					<ModalBody className={classes.Content}>
						<form
							onSubmit={this.handleAdd.bind(this)}
							className={classes.container}
							style={{ display: 'inline' }}
							autoComplete="on"
						>
							<TextField
								required
								id="standard-name"
								label="Title"
								className={classes.textField}
								onChange={this.handleChange('title')}
								margin="normal"
							/>
							<TextField
								required
								id="standard-multiline-static"
								label="Details"
								multiline
								rows="3"
								onChange={this.handleChange('details')}
								className={classes.textField}
								margin="normal"
							/>

							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Grid container className={classes.grid} justify="space-around">
									<DatePicker
										margin="normal"
										label="Time picker"
										id="standard-name"
										type="date"
										value={this.state.selectedDate}
										className={classes.textField}
										// InputLabelProps={{
										// 	shrink: true
										// }}
										onChange={this.handleChange('date')}
									/>
									<TimePicker
										required
										margin="normal"
										label="Start Time"
										onChange={this.handleChange('time')}
									/>
									<TimePicker
										required
										margin="normal"
										label="End Time"
										onChange={this.handleChange('endTime')}
									/>
								</Grid>
							</MuiPickersUtilsProvider>
							<TextField
								required
								id="standard-name"
								label="Location"
								className={classes.textField}
								onChange={this.handleChange('location')}
								margin="normal"
							/>

							<Grid container className={classes.grid} justify="space-around">
								<TextField
									required
									id="standard-number"
									label="Minimum Players"
									value={this.state.minPlayers}
									onChange={this.handleChange('minPlayers')}
									type="number"
									className={classes.textField}
									InputLabelProps={{
										shrink: true
									}}
									margin="normal"
								/>
								<TextField
									required
									id="standard-number"
									label="Maximum Players"
									value={this.state.maxPlayers}
									onChange={this.handleChange('maxPlayers')}
									type="number"
									className={classes.textField}
									InputLabelProps={{
										shrink: true
									}}
									margin="normal"
								/>
							</Grid>
							<div className={classescss.Buttons}>
								<Button
									className={classescss.SubmitButton}
									color="primary"
									onClick={this.handleAdd.bind(this)}
								>
									ADD
								</Button>
								<Button className={classescss.SubmitButton} color="secondary" onClick={this.toggle}>
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
