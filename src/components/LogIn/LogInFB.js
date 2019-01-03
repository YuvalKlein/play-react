import React from 'react';
import {connect} from 'react-redux';
import {Redirect, NavLink} from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import {signIn} from '../../actions/mainAction';
import classes from './LogIn.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';

class LogIn extends React.Component {
    state = {
        alreadyUser: true,
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'First Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Last Name'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Phone'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            avatar: {
                elementType: 'input',
                elementConfig: {
                    type: 'file',
                    placeholder: 'Upload File'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            gender: [{
                elementType: 'input',
                elementConfig: {
                    type: 'radio',
                    name: "gender",
                    value: "male",
                    placeholder: 'gender'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            {
                elementType: 'input',
                elementConfig: {
                    type: 'radio',
                    name: "gender",
                    value: "female",
                    placeholder: 'gender'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }],
            birthDay: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'BirthDay'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        
        if(rules.maxLengh) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    };

    submitHandler = (event) => {
        event.preventDefault();
        let creds = {
            email:this.state.controls.email.value,
            password: this.state.controls.password.value,
            returnSecureToken: true
        }
        this.props.signIn(creds);

    };

    signUpHandler = (event) => {
        event.preventDefault();
        let user = {
            email:this.state.controls.email.value,
            password: this.state.controls.password.value,
            returnSecureToken: true,
            type: 'player',
            firstName: this.state.controls.firstName.value,
            lastName: this.state.controls.lastName.value,
            userId: null,
            // avatar: this.state.controls.avatar.value,
            phone: this.state.controls.phone.value,
            birthDay: this.state.controls.birthDay.value,
            // gender: this.state.controls.gender.value,
            created: Date.now()
        }
        this.props.onAuth(user, this.state.alreadyUser);

    };

    alreadyUserHandler = () => {
        this.setState({alreadyUser: !this.state.alreadyUser});
    };


    render () {
        let formElementsArray = [];
        if (this.state.alreadyUser) {
            formElementsArray = [
                {
                    id: "email",
                    config: this.state.controls.email
                },
                {
                    id: "password",
                    config: this.state.controls.password
                } ];
        } else {
            for(let key in this.state.controls){
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            };
        }

        const responseGoogle = (response) => {
            console.log(response);
        };

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
        ));

        if (this.props.loading) {
            form = <Spinner />
        };

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='/'/>
        }

        return (
            <div className={classes.LogIn}>
                {authRedirect}
                <p>{this.props.authError}</p>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <div>
                        <Button btnType="Success">Sign in</Button>
                        <p>New PLAYer? <NavLink to='/register'>Join Us</NavLink></p> 
                    </div>
                </form>
                <GoogleLogin
                    clientId="203139564983-9gd9ebikj3pct8ptmkkt6r2atcf838qu.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
            </div>
        );
    };
};

const mapStateToProps = state =>{
    return {
        loading: state.userReducer.loading,
        error: state.userReducer.error,
        isAuthenticated: state.userReducer.token !== null,
        alreadyUser: state.userReducer.alreadyUser,
        authError: state.userReducer.authError
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        signIn: (creds) => dispatch(signIn(creds)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);