export const controls = {
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
			required: true
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
			required: true
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
			required: true
		},
		valid: false,
		touched: false
	},
	// male: {
	// 	elementType: 'input',
	// 	elementConfig: {
	// 		type: 'radio',
	// 		name: 'gender',
	// 		value: 'male',
	// 		label: 'Male'
	// 	},
	// 	value: '',
	// 	validation: {
	// 		required: true
	// 	},
	// 	valid: true,
	// 	touched: false
	// },
	// female: {
	// 	elementType: 'input',
	// 	elementConfig: {
	// 		type: 'radio',
	// 		name: 'gender',
	// 		value: 'female',
	// 		label: 'Female'
	// 	},
	// 	value: '',
	// 	validation: {
	// 		required: true
	// 	},
	// 	valid: false,
	// 	touched: false
	// },
	birthDay: {
		elementType: 'input',
		elementConfig: {
			type: 'date',
			placeholder: 'BirthDay'
		},
		value: '',
		validation: {
			required: true
		},
		valid: false,
		touched: false
	}
};
