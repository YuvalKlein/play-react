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
		gender: '',
		formIsValid: false
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
					console.log('url', url);
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
		let formIsValid = true;
		for (let inputIdentifier in updatedControls) {
			formIsValid = updatedControls[inputIdentifier].valid && formIsValid && this.state.gender;
		}
		this.setState({ controls: updatedControls, formIsValid: formIsValid });
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
		let imageUploder = (
			<div>
				<label htmlFor="file-input">
					<img src="add-user-icon.jpg" alt="add-user-icon" />
				</label>

				<input id="file-input" onChange={this.fileSelecteHandler} type="file" style={{ display: 'none' }} />
			</div>
		);

		if (this.state.selectedFile) {
			imageUploder = (
				<div>
					<label htmlFor="file-input">
						<img className={classes.Pic} src={this.state.selectedFile} alt="user-icon" />
					</label>
					<input id="file-input" onChange={this.fileSelecteHandler} type="file" style={{ display: 'none' }} />
				</div>
			);
		}

		let formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}

		const responseGoogle = (response) => {
			console.log(response);
			const user = {
				firstName: response.profileObj.givenName,
				lastName: response.profileObj.familyName,
				photoURL: response.profileObj.imageUrl,
				email: response.profileObj.email,
				type: 'player',
				created: new Date(),
				password: response.googleId,
				phone: this.state.controls.phone.value,
				birthDay: this.state.controls.birthDay.value,
				gender: this.state.gender
			};
			this.props.signUp(user);
		};
		let form = formElementsArray.map((formElement) => (
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
		));

		if (this.props.loading) {
			form = <Spinner />;
		}

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to="/" />;
		}

		const clientId =
			process.env.NODE_ENV === 'development'
				? '203139564983-m3ngreuimvo4gc5etbkaek62cjhgjrk4.apps.googleusercontent.com'
				: '203139564983-2p44bgn0vpf9s8n0ocle9ndln5t1lmrr.apps.googleusercontent.com';

		return (
			<div className={classes.Login}>
				{authRedirect}
				<p>{this.props.authError}</p>
				{imageUploder}
				<form onSubmit={this.signUpHandler}>
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
					{form}
					<div>
						<Button btnType="Success" disabled={!this.state.formIsValid}>
							Sign up
						</Button>
						<p>
							Already PLAYer? <NavLink to="/login">Sign in</NavLink>
						</p>
					</div>
				</form>
				<GoogleLogin
					// clientId="203139564983-9gd9ebikj3pct8ptmkkt6r2atcf838qu.apps.googleusercontent.com"
					clientId={clientId}
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
