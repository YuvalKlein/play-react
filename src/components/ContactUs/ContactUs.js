import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import * as mainActions from '../../actions/mainAction';
import './contactUs.css';
import Classes from './contactUs.css';
import ContactDialog from '../Dialogs/ContactDialog/ContactDialog';
import { checkValidity } from '../LogIn/form/validation';

const contactUs = (props) => {
	const [ timeToGoBack, setTimeToGoBack ] = useState(false);
	const [ formIsValid, setFormIsValid ] = useState(false);
	const [ fullName, setFullName ] = useState('');
	const [ fullNameIsValid, setFullNameIsValid ] = useState(false);
	const [ subject, setSubject ] = useState('');
	const [ subjectIsValid, setSubjectIsValid ] = useState(false);
	const [ message, setMessage ] = useState('');
	const [ messageIsValid, setMessageIsValid ] = useState(false);
	const [ email, setEmail ] = useState('');
	const [ emailIsValid, setEmailIsValid ] = useState(false);
	const [ openContactDialog, setOpenContactDialog ] = useState(false);

	const handleAdd = () => {
		let ticket = {};
		ticket = {
			fullName: props.user ? props.user.firstName + ' ' + props.user.lastName : fullName,
			subject: subject,
			email: props.auth.email ? props.auth.email : email,
			message: message,
			uid: props.auth.uid ? props.auth.uid : null,
			created: new Date()
		};
		props.addNewTicket(ticket);
		setOpenContactDialog(true);
	};

	const handleFullNameChange = (event) => {
		console.log('event.target.value', event.target.value);
		setFullName(event.target.value);
		let valid = checkValidity;
		valid = valid(event.target.value, {
			required: true,
			minLength: 3
		});
		console.log('checkValidity', valid);

		setFullNameIsValid(valid);
	};

	const handleSubjectChange = (event) => {
		setSubject(event.target.value);
		let valid = checkValidity;
		valid = valid(event.target.value, {
			required: true,
			minLength: 3
		});
		setSubjectIsValid(valid);
	};

	const handleMessageChange = (event) => {
		setMessage(event.target.value);
		let valid = checkValidity;
		valid = valid(event.target.value, {
			required: true,
			minLength: 3
		});
		setMessageIsValid(valid);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
		let valid = checkValidity;
		valid = valid(event.target.value, {
			required: true,
			isEmail: true
		});
		setEmailIsValid(valid);
	};

	const handleCloseDialog = () => {
		setOpenContactDialog(false);
		setTimeToGoBack(true);
	};

	let goBack = null;

	if (timeToGoBack) {
		goBack = <Redirect to="/" />;
	}

	let emailField = props.auth.email ? (
		<input type="email" className={Classes.Input} value={props.auth.email} placeholder="Email" disabled={true} />
	) : (
		<input
			type="email"
			className={Classes.Input}
			placeholder="your@email.com"
			onChange={(e) => handleEmailChange(e)}
		/>
	);

	let hello = props.user.firstName ? (
		<h4 className={Classes.Title}>{props.user.firstName}, we'd love to hear from you!</h4>
	) : (
		<h4 className={Classes.Title}>Hey, we'd love to hear from you!</h4>
	);

	let nameField = props.user.firstName ? (
		<input
			type="text"
			className={Classes.Input}
			value={props.user.firstName + ' ' + props.user.lastName}
			disabled={true}
		/>
	) : (
		<input
			type="text"
			className={Classes.Input}
			onChange={(e) => handleFullNameChange(e)}
			placeholder="Full name"
		/>
	);

	console.log('fullNameIsValid: ', fullNameIsValid);
	console.log('messageIsValid: ', messageIsValid);
	console.log('subjectIsValid: ', subjectIsValid);
	console.log('emailIsValid: ', emailIsValid);

	return (
		<div className={Classes.Container}>
			{hello}
			{emailField}
			{nameField}
			<input
				type="text"
				className={Classes.Input}
				onChange={(e) => handleSubjectChange(e)}
				placeholder="Subject"
			/>
			<textarea className={Classes.Erea} onChange={(e) => handleMessageChange(e)} placeholder="Message" />
			<button
				className={Classes.Send}
				onClick={handleAdd}
				disabled={!(fullNameIsValid && messageIsValid && subjectIsValid && emailIsValid)}
			>
				Send
			</button>
			<ContactDialog open={openContactDialog} close={handleCloseDialog} />
			{goBack}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		auth: state.firebaseReducer.auth,
		user: state.firebaseReducer.profile
	};
};

function mapDispatchToProps(dispatch) {
	return { ...bindActionCreators(mainActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(contactUs);
