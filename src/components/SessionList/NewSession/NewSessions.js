import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import FloatButton from '../../UI/FloatButton/FloatButton';
import classescss from './NewSession.css';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200
	},
	dense: {
		marginTop: 19
	},
	menu: {
		width: 200
	}
});

class NewSession extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
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

	handleAdd() {
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
			modal: !this.state.modal
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
		let addButton = null;
		this.props.auth.uid
			? (addButton = <FloatButton clicked={this.toggle} />)
			: (addButton = (
					<NavLink to="/login">
						<FloatButton />
					</NavLink>
				));

		const { classes } = this.props;

		return (
			<div>
				{addButton}
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={classescss.NewSession}>
					<ModalHeader toggle={this.toggle}>Add new Class</ModalHeader>
					<ModalBody className={classescss.Content}>
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
							<TextField
								required
								id="date"
								label="Date"
								type="date"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
							/>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Grid container className={classes.grid} justify="space-around">
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

export default withStyles(styles)(NewSession);
