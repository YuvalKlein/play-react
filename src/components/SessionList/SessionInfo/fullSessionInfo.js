import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { NavLink } from 'react-router-dom';

import * as mainActions from '../../../actions/mainAction';
import Spinner from '../../UI/Spinner/Spinner';
// import BookButton from '../../UI/Button/bookButton';

// import Map from '../../Map/Map';
import classes from './SessionInfo.css';

const fullSessionInfo = (props) => {
	// handelRemoveSession = (session) => {
	// 	this.props.toggleSessiomInfo();
	// 	this.props.removeSession(session);
	// };

	if (!props.sessionList) {
		return <Spinner />;
	}

	const session = props.sessionList.filter((session) => session.id === props.match.params.id);
	console.log('session', session);

	let curentSession = session[0].createdBy ? session[0] : { createdBy: {}, players: [] };
	console.log('curentSession', curentSession);
	return (
		<div>
			<h1>{curentSession.title}</h1>
			<p>
				Craeted By: {curentSession.createdBy.firstName + '  ' + curentSession.createdBy.lastName}{' '}
				<img alt="" className={classes.FaceImg} src={curentSession.createdBy.photoURL} />
			</p>

			<p>on {curentSession.location}</p>
			<p>
				at {curentSession.time} until {curentSession.endTime}
			</p>
			<p>{curentSession.details}</p>
			<div className={classes.Players}>
				{curentSession.players.map((player, i) => (
					<div key={i}>
						<img alt="" className={classes.FaceImg} src={player.photoURL} />
					</div>
				))}
			</div>
			{/* <Map/> */}
			<NavLink to="register">
				<button>Join</button>
			</NavLink>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	// const sessionList = state.firestoreReducer.data.sessionList;
	// const id = ownProps.match.params.id;
	// why I don't have params like in leacture 20 04:40
	return {
		sessionList: state.firestoreReducer.ordered.sessionList

		// how the session working when it goes to the sessionReducer
	};
};

function mapDispatchToProps(dispatch) {
	return { ...bindActionCreators(mainActions, dispatch) };
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([
		{
			collection: 'sessionList'
		}
	])
)(fullSessionInfo);
