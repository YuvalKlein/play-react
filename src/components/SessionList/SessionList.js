import React, { Component } from 'react';
// import './SessionList.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { bindActionCreators } from 'redux';
import axios from '../../axios-sessions';

import * as mainActions from '../../actions/mainAction';
import SessionView from './SessionView/SessionView';
import NewSession from './NewSession/NewSession';
import NewSessions from './NewSession/NewSessions';
import SessionInfo from '../SessionList/SessionInfo/SessionInfo';
import Spinner from '../UI/Spinner/Spinner';
import SignOutDialog from '../Dialogs/signOutDialog/signOutDialog';
import ShareButton from '../Dialogs/ShareDialog/ShareDialog';
import BookButton from '../UI/Button/bookButton';
import { NavLink } from 'react-router-dom';

class SessionList extends Component {
	state = {
		session: {}
	};
	handleAdd = (session) => {
		this.props.addNewSession(session);
	};
	signToSessionHandler = (session) => {
		let players = session.players;
		let newPlayerArray = players.concat([
			{
				firstName: this.props.user.firstName,
				lastName: this.props.user.lastName,
				photoURL: this.props.user.photoURL,
				uid: this.props.auth.uid
			}
		]);
		this.props.signToSession(session, newPlayerArray);
		this.props.toggleDialogShare(session, this.props.user);
	};
	render() {
		const sessionLFB = this.props.sessionList;

		if (sessionLFB) {
			sessionLFB.sort((a, b) => {
				return new Date(a.date) - new Date(b.date);
			});

			const sessions = sessionLFB.map((session) => {
				// console.log('session', session.date);
				let players = session.players;
				let btnBook = false;

				players.map((player) => {
					if (this.props.auth.uid === player.uid) {
						btnBook = (
							<BookButton
								clicked={this.props.toggleSignOutDialog}
								classN="Cancel"
								title="CANCEL"
								clickedSession={session}
							/>
						);
					} else if (players.length >= session.maxPlayers) {
						btnBook = <BookButton clicked={() => null} classN="Cancel" title="FULL" disabled />;
					} else {
						btnBook = (
							<BookButton clicked={() => this.signToSessionHandler(session)} classN="Book" title="BOOK" />
						);
					}
					return btnBook;
				});

				if (!this.props.auth.uid) {
					btnBook = (
						<NavLink to="/login">
							<BookButton classN="Book" clicked={() => null} title="BOOK" />
						</NavLink>
					);
				}
				console.log('SESSIONV', session);
				return (
					<div key={session.id}>
						<SessionView session={session} btnBook={btnBook} />
						<SessionInfo btnBook={btnBook} />
					</div>
				);
			});

			return (
				<div>
					<h1>Today</h1>
					{sessions}
					<ShareButton />
					<NewSession handleNewSession={this.handleAdd} user={this.props.user} auth={this.props.auth} />
					{/* <NewSessions handleNewSession={this.handleAdd} user={this.props.user} auth={this.props.auth} /> */}
					<SignOutDialog />
				</div>
			);
		} else {
			return <Spinner />;
		}
	}
}
const mapStateToProps = (state) => {
	for (const s of state.firestoreReducer.ordered.sessionList || []) {
		if (s.id !== 'LHdfvYSGKNoIIhzt8Gk7') continue;
	}
	return {
		sessionList: state.firestoreReducer.ordered.sessionList,
		user: state.firebaseReducer.profile,
		auth: state.firebaseReducer.auth
	};
};
function mapDispatchToProps(dispatch) {
	return { ...bindActionCreators(mainActions, dispatch) };
}
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([ { collection: 'sessionList' } ])
)(SessionList, axios);
