import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import FloatButton from '../../UI/FloatButton/FloatButton';
import classes from './NewSession.css';
import Input from '../../UI/Input/Input';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import { checkValidity } from '../../LogIn/form/validation';
import { myFields } from './formFields';
import DatePicker from 'react-datepicker';

class NewSession extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			fields: myFields,
			title: '',
			titleTouch: false,
			details: '',
			detailsTouch: false,
			location: '',
			locationTouch: false,
			formIsValid: false,
			date: new Date(),
			startTime: new Date(),
			endTime: new Date(),
			minPlayers: 2,
			maxPlayers: 2
		};

		this.toggle = this.toggle.bind(this);
	}

	handleAdd() {
		let newS = {};
		newS = {
			date: this.state.date,
			time: this.state.startTime,
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
		console.log('NESS', newS);
		this.props.handleNewSession(newS);
		this.setState({
			title: '',
			titleTouch: false,
			details: '',
			detailsTouch: false,
			location: '',
			locationTouch: false
		});
		this.toggle();
	}
	toggle() {
		this.setState({
			modal: !this.state.modal,
			fields: myFields
		});
	}

	handleChange = (name, event) => {
		console.log('name:::', name, event.target.value);
		let newName = name + 'Touch';
		let newValid = name + 'Valid';
		let nameValid = checkValidity(event.target.value, {
			required: true,
			minLength: 2
		});
		let valid = false;
		if (
			[ newValid ] &&
			this.state.titleValid &&
			this.state.detailsValid &&
			this.state.locationValid &&
			this.state.dateValid
		) {
			valid = true;
		} else {
			valid = false;
		}
		console.log('valid', valid);
		console.log('nameValid', newValid, nameValid);
		this.setState({
			[name]: event.target.value,
			[newName]: true,
			[newValid]: nameValid,
			formIsValid: valid
		});
	};
	titleHandler = (title) => {
		this.setState({ title: title.target.value });
	};

	render() {
		let formElementsArray = [];
		for (let key in this.state.fields) {
			formElementsArray.push({
				id: key,
				config: this.state.fields[key]
			});
		}

		let addButton = null;
		this.props.auth.uid
			? (addButton = <FloatButton clicked={this.toggle} />)
			: (addButton = (
					<NavLink to="/login">
						<FloatButton />
					</NavLink>
				));

		return (
			<div>
				{addButton}
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={classes.NewSession}>
					<ModalHeader toggle={this.toggle}>Add new Class</ModalHeader>
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
								// defaultValue={this.state.date}
								// className={classes.textField}
								changed={(e) => this.handleChange('date', e)}
								InputLabelProps={{
									shrink: true
								}}
							/>
							<TextField
								id="time"
								onChange={(e) => this.handleChange('startTime', e)}
								label="Start at"
								type="time"
								// defaultValue={this.state.startTime}
								className={classes.textField}
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
								// defaultValue={this.state.startTime}
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								inputProps={{
									step: 300 // 5 min
								}}
							/>
							{/* Date:<DatePicker
								selected={this.state.date}
								onChange={(e) => this.handleChange(e)}
								minDate={new Date()}
								showDisabledMonthNavigation
							/> */}
							{/* Start time:<DatePicker
								selected={this.state.startTime}
								onChange={this.handleChangeStartTime}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={120}
								dateFormat="h:mm aa"
								timeCaption="Time"
							/>
							End time:<DatePicker
								selected={this.state.endTime}
								onChange={this.handleChangeEndTime}
								showTimeSelect
								showTimeSelectOnly
								timeIntervals={120}
								dateFormat="h:mm aa"
								timeCaption="Time"
							/> */}
							<Input
								id="standard-number"
								label="Minimum Players"
								value={this.state.minPlayers}
								changed={(e) => this.setState({ minPlayers: e.target.value })}
								type="number"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								margin="normal"
							/>
							<Input
								id="standard-number"
								label="Maximum Players"
								value={this.state.maxPlayers}
								changed={(e) => this.setState({ maxPlayers: e.target.value })}
								type="number"
								className={classes.textField}
								InputLabelProps={{
									shrink: true
								}}
								margin="normal"
							/>
							<div className={classes.Buttons}>
								<Button
									className={classes.SubmitButton}
									color="primary"
									onClick={this.handleAdd.bind(this)}
									disabled={!this.state.formIsValid}
								>
									ADD
								</Button>
								<Button className={classes.SubmitButton} color="secondary" onClick={this.toggle}>
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

export default NewSession;
