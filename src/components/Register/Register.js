import React from 'react';
import {connect} from 'react-redux';
import {Redirect, NavLink} from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import {storage} from '../../config/fbConfig';
import {signUp} from '../../actions/mainAction';
import classes from './Register.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';

class Register extends React.Component {
    state = {
        alreadyUser: true,
        selectedFile: null,
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
            gender: [{
                elementType: 'input',
                elementConfig: {
                    type: 'checkbox',
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
                    type: 'checkbox',
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

    fileSelecteHandler = event => {
        console.log(event.target.files[0]);
        const image = event.target.files[0];
        console.log(image);
        const upload = storage.ref(`profile/${image.name}`).put(image);
        upload.on('state_changed', 
        (snapshot) => {
            
        }, 
        (error) => {
            console.log(error)
        }, 
        () => {
            storage.ref('profile').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                this.setState({selectedFile: url})
                console.log(this.state.selectedFile);
            });
        });
    };

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

    signUpHandler = (event) => {
        event.preventDefault();

        let user = {
            email:this.state.controls.email.value,
            password: this.state.controls.password.value,
            returnSecureToken: true,
            type: 'player',
            firstName: this.state.controls.firstName.value,
            lastName: this.state.controls.lastName.value,
            photoURL: this.state.selectedFile ? this.state.selectedFile : 'https://firebasestorage.googleapis.com/v0/b/play-e37a6.appspot.com/o/profile%20pictures%2FNerd_with_Glasses_Emoji.png?alt=media&token=788fc5d7-e587-4f1d-8eea-a3d2b0c4605a',
            phone: this.state.controls.phone.value,
            birthDay: this.state.controls.birthDay.value,
            gender: this.state.controls.gender.value,
            created: new Date(),
        }
        this.props.signUp(user);


    };

    alreadyUserHandler = () => {
        this.setState({alreadyUser: !this.state.alreadyUser});
    };


    render () {
        let formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };


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
                <input type="file" onChange={this.fileSelecteHandler} />
                <form onSubmit={this.signUpHandler}>
                    {form}
                         <div>
                            <Button btnType="Success">Sign up</Button>
                            <p>Already PLAYer? <NavLink to='/login'>Sign in</NavLink></p>
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
        signUp: (newUser) => dispatch(signUp(newUser)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);