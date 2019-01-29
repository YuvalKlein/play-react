import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import FloatButton from '../../UI/FloatButton/FloatButton';
import classes from './NewSession.css';
import Input from '../../UI/Input/Input';
import { NavLink } from 'react-router-dom';

const myFields = {
	title: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Title'
		},
		value: '',
		validation: {
			required: true,
			minLength: 2
		},
		valid: false,
		touched: false
	},
	date: {
		elementType: 'input',
		elementConfig: {
			type: 'date',
			placeholder: 'Date'
		},
		value: '',
		validation: {
			required: true
		},
		valid: false,
		touched: false
	},
	time: {
		elementType: 'input',
		elementConfig: {
			type: 'time',
			placeholder: 'start time'
		},
		value: '',
		validation: {
			required: true
		},
		valid: false,
		touched: false
	},
	endTime: {
		elementType: 'input',
		elementConfig: {
			type: 'time',
			placeholder: 'end time'
		},
		value: '',
		validation: {
			required: true
		},
		valid: false,
		touched: false
	},
	details: {
		elementType: 'textarea',
		elementConfig: {
			type: 'textarea',
			placeholder: 'Details'
		},
		value: '',
		validation: {
			required: true
		},
		valid: false,
		touched: false
	},
	location: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Location'
		},
		value: '',
		validation: {
			required: true,
			minLength: 2
		},
		valid: false,
		touched: false
	},
	minPlayers: {
		elementType: 'input',
		elementConfig: {
			type: 'number',
			placeholder: 'minimun players'
		},
		value: 2,
		validation: {},
		valid: true
	},
	maxPlayers: {
		elementType: 'input',
		elementConfig: {
			type: 'number',
			placeholder: 'maximun players'
		},
		value: 2,
		validation: {},
		valid: true
	}
};
class NewSession extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			fields: myFields,
			formIsValid: false
		};

		this.toggle = this.toggle.bind(this);
	}

	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		console.log('length', value.length);
		console.log('isValid', isValid);
		return isValid;

		// if (rules.isEmail) {
		// 	const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		// 	isValid = pattern.test(value) && isValid;
		// }

		// if (rules.isNumeric) {
		// 	const pattern = /^\d+$/;
		// 	isValid = pattern.test(value) && isValid;
		// }
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedFields = {
			...this.state.fields
		};
		const updatedFormElement = {
			...updatedFields[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedFields[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedFields) {
			formIsValid = updatedFields[inputIdentifier].valid && formIsValid;
		}

		this.setState({ fields: updatedFields, formIsValid: formIsValid });
	};

	handleAdd() {
		console.log('fields', this.state.fields);
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

		console.log('formisvalid', this.state.formIsValid);

		return (
			<div>
				{addButton}
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={classes.NewSession}>
					<ModalHeader toggle={this.toggle}>Add new Class</ModalHeader>
					<ModalBody className={classes.Content}>
						<form>
							{form}
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
