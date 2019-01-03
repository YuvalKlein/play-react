import React from 'react';

const form = () => {
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
};

export default form;
