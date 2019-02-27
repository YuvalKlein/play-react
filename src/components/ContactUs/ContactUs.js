import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import * as mainActions from '../../actions/mainAction';
import './contactUs.css';
import Classes from './contactUs.css';
import ContactDialog from '../Dialogs/ContactDialog/ContactDialog';

const contactUs = (props) => {
	const [ fullName, setFullName ] = useState('');
	const [ subject, setSubject ] = useState('');
	const [ message, setMessage ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ openContactDialog, setOpenContactDialog ] = useState(false);

	const handleAdd = () => {
		let ticket = {};
		ticket = {
			fullName: props.profile ? props.user.firstName + ' ' + props.user.lastName : fullName,
			subject: subject,
			email: props.auth.email ? props.auth.email : email,
			message: message,
			uid: props.auth.uid ? props.auth.uid : null
		};
		props.addNewTicket(ticket);
		setOpenContactDialog(true);
	};

	const handleFullNameChange = (event) => {
		setFullName(event.target.value);
	};

	const handleSubjectChange = (event) => {
		setSubject(event.target.value);
	};

	const handleMessageChange = (event) => {
		setMessage(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleCloseDialog = () => {
		setOpenContactDialog(false);
	};

	let emailField = props.auth.email ? (
		<input type="email" className={Classes.Input} value={props.auth.email} disabled={true} />
	) : (
		<input type="email" className={Classes.Input} placeholder="Email" onChange={(e) => handleEmailChange(e)} />
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
			<button className={Classes.Send} onClick={handleAdd}>
				Send
			</button>
			<ContactDialog open={openContactDialog} close={handleCloseDialog} />
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
