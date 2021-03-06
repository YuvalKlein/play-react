import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import * as mainActions from '../../../actions/mainAction';
import SessionView from '../../SessionList/SessionView/SessionView';
import Spinner from '../../UI/Spinner/Spinner';

const mySessions = (props) => {
	const sessions = props.sessionList;
	console.log('props', props);
	console.log('sessionList', props.sessionList);
	// if (!sessions) {
	return <Spinner />;
	// 	}
	// 	console.log('sessions', sessions);
	// 	sessions.map((session) => {
	// 		console.log('session', session);
	// 		session.players.filter((player) => {
	// 			console.log('player', player);
	// 			if (player.uid === props.auth.uid) {
	// 				return <SessionView session={session} />;
	// 			} else {
	// 				return <p>No Classes</p>;
	// 			}
	// 		});
	// 	});

	// 	return { sessions };
};

const mapStateToProps = (state) => {
	const sessionList = process.env.NODE_ENV === 'development' ? 'sLD' : 'sessionList';
	return {
		auth: state.firebaseReducer.auth,
		user: state.firebaseReducer.profile,
		sessionList: state.firestoreReducer.ordered[sessionList]
	};
};

function mapDispatchToProps(dispatch) {
	return { ...bindActionCreators(mainActions, dispatch) };
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([ { collection: process.env.NODE_ENV === 'development' ? 'sLD' : 'sessionList' } ])
)(mySessions);
