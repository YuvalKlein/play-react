import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import * as mainActions from '../../actions/mainAction';
import classes from './Account.css';
import TabContainer from '../UI/TabContainer/TabContainer';

const account = (props) => (
	<div className={classes.Account}>
		<div className={classes.Img}>
			<img alt="" className={classes.FaceImg} src={props.user.photoURL} />
		</div>
		<p className={classes.Name}>
			{props.user.firstName} {props.user.lastName}
		</p>
		<p>Phone: {props.user.phone}</p>
		<p>Email: {props.auth.email}</p>
		<p>Birthday: {props.user.birthDay}</p>

		<TabContainer />
	</div>
);

const mapStateToProps = (state) => ({
	auth: state.firebaseReducer.auth,
	user: state.firebaseReducer.profile
});

function mapDispatchToProps(dispatch) {
	return { ...bindActionCreators(mainActions, dispatch) };
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([ { collection: 'sessionList' } ])
)(account);
