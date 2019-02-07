import React from 'react';
import classes from './avatar.css';

const avatar = (props) => {
	return (
		<div className={classes.Container}>
			<img alt="" className={classes.FaceImg} src={props.avatar} />
			<p className={classes.Text}>{props.name}</p>
		</div>
	);
};

export default avatar;
