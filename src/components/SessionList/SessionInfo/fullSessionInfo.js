import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { NavLink } from 'react-router-dom';

import * as mainActions from '../../../actions/mainAction';
import Spinner from '../../UI/Spinner/Spinner';
import BookButton from '../../UI/Button/bookButton';

// import Map from '../../Map/Map';
import classes from './SessionInfo.css';
import { format } from 'date-fns';

import Avatar from '../../UI/Avatar/avatat';

const fullSessionInfo = (props) => {
	// handelRemoveSession = (session) => {
	// 	this.props.toggleSessiomInfo();
	// 	this.props.removeSession(session);
	// };
	if (!props.sessionList) {
		return <Spinner />;
	}

	const session = props.sessionList.filter((session) => session.id === props.match.params.id);

	let curentSession = session[0].createdBy ? session[0] : { createdBy: {}, players: [] };
	return (
		<div className={classes.Modal + ' ' + classes.ModalFull}>
			<h1 className={classes.Title}>{curentSession.title}</h1>
			<h3>
				{format(new Date(curentSession.date), 'iiii')} {format(new Date(curentSession.date), 'dd/MM/yyyy')}
			</h3>
			<h4>
				{curentSession.time} - {curentSession.endTime}
			</h4>
			{/* <div className={classes.Map}>
							<Map />
						</div> */}
			<h5>Details: </h5>
			<p>{curentSession.details}</p>
			<h5>
				{curentSession.players.length}\{curentSession.maxPlayers} Players:
			</h5>
			<div className={classes.Players}>
				{curentSession.players.map((player, i) => (
					<div key={i}>
						<Avatar name={player.firstName} avatar={player.photoURL} />
					</div>
				))}
			</div>
			{/* <div>
				<h6>Craeted By: </h6>
				<Avatar name={curentSession.createdBy.firstName} avatar={curentSession.createdBy.photoURL} />
			</div> */}
			<div className={classes.JoinButton}>
				<NavLink to="register">
					<BookButton clicked={() => {}} classN={classes.Book} title="JOIN" />
				</NavLink>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		sessionList: state.firestoreReducer.ordered.sessionList
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
