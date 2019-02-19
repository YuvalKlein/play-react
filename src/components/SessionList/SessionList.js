import React, { Component } from 'react';
// import './SessionList.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { bindActionCreators } from 'redux';
import axios from '../../axios-sessions';
import { format, formatDistance, formatRelative, subDays } from 'date-fns';

import * as mainActions from '../../actions/mainAction';
import Classes from './SessionList.css';
import SessionView from './SessionView/SessionView';
import NewSession from './NewSession/NewSession';
import SessionInfo from '../SessionList/SessionInfo/SessionInfo';
import Spinner from '../UI/Spinner/Spinner';
import SignOutDialog from '../Dialogs/signOutDialog/signOutDialog';
import ShareDialog from '../Dialogs/ShareDialog/ShareDialog';
import BookButton from '../UI/Button/bookButton';
import { NavLink } from 'react-router-dom';

class SessionList extends Component {
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
		this.props.toggleDialogShare(session);
	};
	render() {
		const sessionLFB = this.props.sessionList;

		if (sessionLFB) {
			let sessionFiltred = sessionLFB.filter((session) => new Date(session.date) > new Date() - 86400000);
			sessionFiltred.sort((a, b) => {
				return new Date(a.date) - new Date(b.date);
			});

			const sessions = sessionFiltred.map((session, i) => {
				let devider = null;
				let nextDay = new Date(session.date).getDate();
				if (i) {
					let prevStep = sessionFiltred[i - 1];

					if (new Date(prevStep.date).getDate() < nextDay) {
						devider = (
							<h4 style={{ paddingLeft: '20px' }}>
								{format(session.date, 'iiii')} {format(session.date, 'dd/MM/yyyy')}
							</h4>
						);
					}
				}

				let players = session.players;
				let btnBook = false;

				for (let player in players) {
					if (this.props.auth.uid === players[player].uid) {
						btnBook = (
							<BookButton
								clicked={this.props.toggleSignOutDialog}
								classN={Classes.Cancel}
								title="CANCEL"
								clickedSession={session}
							/>
						);
						break;
					} else if (players.length >= session.maxPlayers) {
						btnBook = <BookButton clicked={() => null} classN={Classes.Cancel} title="FULL" disabled />;
					} else {
						btnBook = (
							<BookButton
								clicked={() => this.signToSessionHandler(session)}
								classN={Classes.Book}
								title="BOOK"
							/>
						);
					}
				}

				if (!this.props.auth.uid) {
					btnBook = (
						<NavLink to="/login">
							<BookButton classN={Classes.Book} clicked={() => null} title="BOOK" />
						</NavLink>
					);
				}
				return (
					<div key={session.id}>
						{devider}
						<SessionView session={session} btnBook={btnBook} />
						<SessionInfo btnBook={btnBook} />
					</div>
				);
			});

			return (
				<div>
					<h4 style={{ paddingLeft: '20px' }}>
						{format(sessionFiltred[0].date, 'iiii')} {format(sessionFiltred[0].date, 'dd/MM/yyyy')}
					</h4>

					{sessions}
					<ShareDialog />
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
		auth: state.firebaseReducer.auth,
		toggleEdit: state.sessionReducer.toggleEdit
	};
};
function mapDispatchToProps(dispatch) {
	return { ...bindActionCreators(mainActions, dispatch) };
}
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([ { collection: 'sessionList' } ])
)(SessionList, axios);
