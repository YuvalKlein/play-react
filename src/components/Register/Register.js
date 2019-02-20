import React from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import { storage } from '../../config/fbConfig';
import { signUp } from '../../actions/mainAction';
import classes from './Register.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';

import { controls } from './formFields';
import { checkValidity } from '../LogIn/form/validation';

class Register extends React.Component {
	state = {
		alreadyUser: true,
		selectedFile: null,
		controls: controls,
		gender: ''
	};

	fileSelecteHandler = (event) => {
		const image = event.target.files[0];
		const upload = storage.ref(`profile/${image.name}`).put(image);
		upload.on(
			'state_changed',
			(snapshot) => {},
			(error) => {
				console.log(error);
			},
			() => {
				storage.ref('profile').child(image.name).getDownloadURL().then((url) => {
					this.setState({ selectedFile: url });
				});
			}
		);
	};

	inputChangedHandler = (event, controlName) => {
		const updatedControls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: event.target.value,
				valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
				touched: true
			}
		};
		this.setState({ controls: updatedControls });
	};

	signUpHandler = (event) => {
		event.preventDefault();
		let user = {
			email: this.state.controls.email.value,
			password: this.state.controls.password.value,
			returnSecureToken: true,
			type: 'player',
			firstName: this.state.controls.firstName.value,
			lastName: this.state.controls.lastName.value,
			photoURL: this.state.selectedFile
				? this.state.selectedFile
				: 'https://firebasestorage.googleapis.com/v0/b/play-e37a6.appspot.com/o/profile%20pictures%2FNerd_with_Glasses_Emoji.png?alt=media&token=788fc5d7-e587-4f1d-8eea-a3d2b0c4605a',
			phone: this.state.controls.phone.value,
			birthDay: this.state.controls.birthDay.value,
			gender: this.state.gender,
			created: new Date()
		};
		console.log('signUpHandler', user);

		this.props.signUp(user);
	};

	alreadyUserHandler = () => {
		this.setState({ alreadyUser: !this.state.alreadyUser });
	};

	render() {
		let formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		const responseGoogle = (response) => {
			console.log(response);
		};
		let form = formElementsArray.map(
			(formElement) => (
				console.log('elementConfig', formElement.config),
				(
					<Input
						key={formElement.id}
						type={formElement.config.elementConfig.type}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						placeholder={formElement.config.elementConfig.placeholder}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				)
			)
		);

		if (this.props.loading) {
			form = <Spinner />;
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to="/" />;
		}

		return (
			<div className={classes.Login}>
				{authRedirect}
				<p>{this.props.authError}</p>
				<input type="file" onChange={this.fileSelecteHandler} />
				<form onSubmit={this.signUpHandler}>
					{form}

					<div className={classes.Gender}>
						<label>
							<input
								type="radio"
								name="gender"
								value="male"
								onChange={(e) => this.setState({ gender: e.target.value })}
							/>
							Male
						</label>

						<label>
							<input
								type="radio"
								name="gender"
								value="female"
								onChange={(e) => this.setState({ gender: e.target.value })}
							/>
							Female
						</label>
					</div>
					<div>
						<Button btnType="Success">Sign up</Button>
						<p>
							Already PLAYer? <NavLink to="/login">Sign in</NavLink>
						</p>
					</div>
				</form>
				<GoogleLogin
					clientId="203139564983-9gd9ebikj3pct8ptmkkt6r2atcf838qu.apps.googleusercontent.com"
					buttonText="Register"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		loading: state.userReducer.loading,
		error: state.userReducer.error,
		isAuthenticated: state.userReducer.token !== null,
		alreadyUser: state.userReducer.alreadyUser,
		authError: state.userReducer.authError
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (newUser) => dispatch(signUp(newUser))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
