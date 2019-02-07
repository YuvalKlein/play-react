const dateNow = new Date();
const y = dateNow.getFullYear();
const m = dateNow.getMonth();
const d = dateNow.getDate();

export const myFields = {
	title: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Title'
		},
		value: '',
		validation: {
			required: true,
			minLength: 2
		},
		valid: false,
		touched: false
	},
	date: {
		elementType: 'input',

		elementConfig: {
			pattern: 'ddmmyyyy',
			type: 'date',
			placeholder: 'Date'
		},
		value: d + m + y,
		validation: {
			required: true
		},
		valid: false,
		touched: false
	},
	time: {
		elementType: 'input',
		elementConfig: {
			type: 'time',
			placeholder: 'start time'
		},
		value: '',
		validation: {
			required: true
		},
		valid: false,
		touched: false
	},
	endTime: {
		elementType: 'input',
		elementConfig: {
			type: 'time',
			placeholder: 'end time'
		},
		value: '',
		validation: {
			required: true
		},
		valid: false,
		touched: false
	},
	details: {
		elementType: 'textarea',
		elementConfig: {
			type: 'textarea',
			placeholder: 'Details'
		},
		value: '',
		validation: {
			required: true
		},
		valid: false,
		touched: false
	},
	location: {
		elementType: 'input',
		elementConfig: {
			type: 'text',
			placeholder: 'Location'
		},
		value: '',
		validation: {
			required: true,
			minLength: 2
		},
		valid: false,
		touched: false
	},
	minPlayers: {
		elementType: 'input',
		elementConfig: {
			type: 'number',
			placeholder: 'minimun players'
		},
		value: 2,
		validation: {},
		valid: true
	},
	maxPlayers: {
		elementType: 'input',
		elementConfig: {
			type: 'number',
			placeholder: 'maximun players'
		},
		value: 2,
		validation: {},
		valid: true
	}
};
