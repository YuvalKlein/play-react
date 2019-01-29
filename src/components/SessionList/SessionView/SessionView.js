import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { NavLink } from 'react-router-dom';

import * as mainActions from '../../../actions/mainAction';
import classes from './SessionView.css';
import BookButton from '../../UI/Button/bookButton';

const sessionView = (props) => {
	let btnBook = false;

	const signToSessionHandler = () => {
		let players = props.session.players;
		let newPlayerArray = players.concat([
			{
				firstName: props.user.firstName,
				lastName: props.user.lastName,
				photoURL: props.user.photoURL,
				uid: props.auth.uid
			}
		]);
		props.signToSession(props.session, newPlayerArray);
		props.toggleDialogShare(props.session, props.user);
	};

	let players = props.session.players;

	players.map((player) => {
		if (props.auth.uid === player.uid) {
			btnBook = (
				<BookButton
					clicked={props.toggleSignOutDialog}
					classN={classes.Cancel}
					title="CANCEL"
					clickedSession={props.session}
				/>
			);
		} else if (players.length >= props.session.maxPlayers) {
			btnBook = <BookButton clicked={() => null} classN={classes.Cancel} title="FULL" disabled />;
		} else {
			btnBook = <BookButton clicked={signToSessionHandler} classN={classes.Book} title="BOOK" />;
		}
		return btnBook;
	});

	if (!props.auth.uid) {
		btnBook = (
			<NavLink to="/login">
				<BookButton classN={classes.Book} clicked={() => null} title="BOOK" />
			</NavLink>
		);
	}

	return (
		<div className={classes.SessionView}>
			<div className={classes.Time}>
				<div>{props.session.time}</div>
				<div>{props.session.endTime}</div>
			</div>
			<div className={classes.Info} onClick={() => props.toggleSessiomInfo(props.session)}>
				<p className={classes.Title}>{props.session.title}</p>
				<p>{props.session.location}</p>
			</div>
			<div className={classes.Players} onClick={() => props.toggleSessiomInfo(props.session)}>
				<p>
					{props.session.players.length}\{props.session.maxPlayers}
				</p>
				<div className={classes.Avatars}>
					{players.map((player, i) => (
						<div key={i}>
							<img alt="" className={classes.FaceImg} src={player.photoURL} />
						</div>
					))}
				</div>
			</div>
			<div className={classes.Button}>{btnBook}</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	toggle: state.sessionReducer.sessionInfoToggle,
	shareDialogOpen: state.sessionReducer.shareDialogOpen,
	btnToggle: state.sessionReducer.booked,
	auth: state.firebaseReducer.auth,
	user: state.firebaseReducer.profile
});

function mapDispatchToProps(dispatch) {
	return { ...bindActionCreators(mainActions, dispatch) };
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([ { collection: 'sessionList' } ])
)(sessionView);
