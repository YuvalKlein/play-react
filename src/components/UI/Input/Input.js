import React from 'react';

import classes from './Input.css';
import TextField from '@material-ui/core/TextField';

const input = (props) => {
	let validationError = null;

	if (props.invalid && props.touched) {
		validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}</p>;
	}

	return (
		<div className={classes.Input2}>
			<TextField
				error={props.touched && props.invalid}
				type={props.type}
				// id="standard-name"
				label={props.placeholder}
				className={classes.textField + ' ' + classes.lableFix}
				value={props.value}
				multiline={props.multiline}
				rows="2"
				onChange={props.changed}
				margin="normal"
				defaultValue={props.defaultValue}
			/>
			{validationError}
		</div>
	);
};

export default input;
