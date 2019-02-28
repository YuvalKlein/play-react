import React from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { signIn } from '../../actions/mainAction';
import classes from './LogIn.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import loginForm from './form/form';

class LogIn extends React.Component {
	state = {
		emailValue: '',
		emailValid: false,
		passwordValid: false,
		passwordValue: ''
	};
	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLengh) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (event, controlName) => {
		let value = this.checkValidity(event.target.value, loginForm[controlName].validation);
		if (controlName === 'email') {
			this.setState({ emailValue: event.target.value, emailValid: value });
		} else {
			this.setState({ passwordValue: event.target.value, passwordValid: value });
		}
	};

	submitHandler = (event) => {
		event.preventDefault();
		let creds = {
			email: this.state.emailValue,
			password: this.state.passwordValue,
			returnSecureToken: true
		};
		this.props.signIn(creds);
	};

	render() {
		let formElementsArray = [
			{
				id: 'email',
				config: loginForm.email,
				valid: this.state.emailValid,
				value: this.state.emailValue
			},
			{
				id: 'password',
				config: loginForm.password,
				valid: this.state.passwordValid,
				value: this.state.passwordValue
			}
		];

		const responseGoogle = (response) => {
			console.log(response);
		};

		let form = formElementsArray.map((formElement) => (
			<Input
				key={formElement.id}
				elementType={formElement.config.elementType}
				elementConfig={formElement.config.elementConfig}
				value={formElement.value}
				invalid={!formElement.valid}
				shouldValidate={formElement.config.validation}
				touched={formElement.value.length > 0}
				changed={(event) => this.inputChangedHandler(event, formElement.id)}
				placeholder={formElement.config.elementConfig.placeholder}
				type={formElement.config.elementConfig.type}
			/>
		));

		if (this.props.loading) {
			form = <Spinner />;
		}

		if (this.props.isAuthenticated) {
			return <Redirect to="/" />;
		} else {
			return (
				<div className={classes.Login}>
					<p>{this.props.authError}</p>
					<form onSubmit={this.submitHandler}>
						{form}
						<div>
							<Button btnType="Success">Sign in</Button>

							<p>
								New PLAYer? <NavLink to="/register">Join Us</NavLink>
							</p>
						</div>
					</form>
					{/* <GoogleLogin
						clientId="203139564983-9gd9ebikj3pct8ptmkkt6r2atcf838qu.apps.googleusercontent.com"
						buttonText="Login"
						onSuccess={responseGoogle}
						onFailure={responseGoogle}
					/> */}
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.userReducer.loading,
		error: state.userReducer.error,
		isAuthenticated: state.firebaseReducer.auth.uid !== undefined,
		// alreadyUser: state.userReducer.alreadyUser,
		authError: state.userReducer.authError
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
