import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import FloatButton from '../../UI/FloatButton/FloatButton';
import classes from './NewSession.css';
import Input from '../../UI/Input/Input';
import { NavLink } from 'react-router-dom';

import { checkValidity } from '../../LogIn/form/validation';
import { myFields } from './formFields';
import DatePicker from "react-datepicker";

class NewSession extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			fields: myFields,
			formIsValid: false,
      startDate: new Date(),
      startTime:new Date(),
			endTime:null
    };

		this.toggle = this.toggle.bind(this);
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedFields = {
			...this.state.fields
		};
		const updatedFormElement = {
			...updatedFields[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedFields[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedFields) {
			formIsValid = updatedFields[inputIdentifier].valid && formIsValid;
		}

		this.setState({ fields: updatedFields, formIsValid: formIsValid });
	};

	handleAdd() {
		if (
			this.state.fields.title.value.length > 1 &&
			this.state.fields.date.value.length > 1 &&
			this.state.fields.time.value.length > 1
		) {
			let newS = {};
			newS = {
				date: this.state.fields.date.value,
				time: this.state.fields.time.value,
				endTime: this.state.fields.endTime.value,
				title: this.state.fields.title.value,
				details: this.state.fields.details.value,
				location: this.state.fields.location.value,
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
				minPlayers: this.state.fields.minPlayers.value,
				maxPlayers: this.state.fields.maxPlayers.value
			};
			this.props.handleNewSession(newS);
			this.toggle();
		}
	}
	toggle() {
		this.setState({
			modal: !this.state.modal,
			fields: myFields
		});
	}
  handleChange=(date)=> {
    this.setState({
      startDate: date
    });
  };
  handleChangeStartTime=(date)=> {
    this.setState({
      startTime: date
    });
  };
  handleChangeEndTime=(date)=> {
    this.setState({
      endTime: date
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

		let form = formElementsArray.map((formElement) => (
			<Input
				className={classes.NewSession}
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.config.value}
				invalid={!formElement.config.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.config.touched}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
				label={formElement.config.elementConfig.placeholder}
				valueType={formElement.config.elementConfig.type}
			/>
		));

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
							{form}
              Date:<DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                minDate={new Date()}
              />
              Start time:<DatePicker
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
