import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


import classes from './LogIn.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../actions/mainAction';

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
        let user = {
            email:this.state.controls.email.value,
            password: this.state.controls.password.value,
            returnSecureToken: true
        }
        this.props.onAuth(user, this.state.alreadyUser);

    };

    alreadyUserHandler = () => {
        this.setState({alreadyUser: !this.state.alreadyUser});
    };


    render () {
        const formElementsArray = [];
        if (this.props.alreadyUser) {
            for(let key = 0; key < 2; key++){
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            };
        } else {
            for(let key in this.state.controls){
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            };
        }

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

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        };

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='/'/>
        }

        return (
            <div className={classes.LogIn}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    {this.state.alreadyUser ? 
                        <div>
                            <Button btnType="Success">Sign in</Button>
                            <p>New PLAYer? <a onClick={this.alreadyUserHandler}>Join Us</a></p> 
                        </div>
                        : <div>
                            <Button btnType="Success">Sign up</Button>
                            <p>Already PLAYer? <a onClick={this.alreadyUserHandler}>Sign in</a></p>
                          </div>}
                    
                </form>
            </div>
        );
    };
};

const mapStateToProps = state =>{
    return {
        loading: state.userReducer.loading,
        error: state.userReducer.error,
        isAuthenticated: state.userReducer.token !== null,
        alreadyUser: state.userReducer.alreadyUser
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onAuth: (user, alreadyUser) => dispatch(actions.auth(user, alreadyUser)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);