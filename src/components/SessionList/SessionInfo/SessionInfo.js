import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { NavLink } from 'react-router-dom';

import * as mainActions from '../../../actions/mainAction';

import Map from '../../Map/Map';
import classes from './SessionInfo.css';
import Avatar from '../../UI/Avatar/avatat';
import BookButton from '../../UI/Button/bookButton';

class SessionInfo extends React.Component {
	handelRemoveSession = (session) => {
		this.props.toggleSessiomInfo();
		this.props.removeSession(session);
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
		this.props.toggleSessiomInfo();
	};

	render() {
		// let players = this.props.session.players;
		// let btnBook = null;

		// players.map((player) => {
		// 	if (this.props.auth.uid === player.uid) {
		// 		btnBook = (
		// 			<BookButton
		// 				clicked={this.props.toggleSignOutDialog}
		// 				classN={classes.Cancel}
		// 				title="CANCEL"
		// 				clickedSession={this.props.session}
		// 			/>
		// 		);
		// 	} else if (players.length >= this.props.session.maxPlayers) {
		// 		btnBook = <BookButton clicked={() => null} classN={classes.Cancel} title="FULL" disabled />;
		// 	} else {
		// 		btnBook = <BookButton clicked={this.signToSessionHandler} classN={classes.Book} title="BOOK" />;
		// 	}
		// 	return btnBook;
		// });

		// if (!this.props.auth.uid) {
		// 	btnBook = (
		// 		<NavLink to="/login">
		// 			<BookButton classN={classes.Book} clicked={() => null} title="BOOK" />
		// 		</NavLink>
		// 	);
		// }

		let curentSession = this.props.session.createdBy ? this.props.session : { createdBy: {}, players: [] };
		return (
			<div>
				<Modal isOpen={this.props.toggle}>
					<ModalHeader toggle={() => this.props.toggleSessiomInfo({})}>{curentSession.title}</ModalHeader>
					<ModalBody className={classes.SessionInfo}>
						<p>
							{curentSession.date} from {curentSession.time} until {curentSession.endTime} at{' '}
							{curentSession.location}
						</p>
						{/* <div className={classes.Map}>
							<Map />
						</div> */}
						<p>Details: {curentSession.details}</p>
						<p>Players:</p>
						<div className={classes.Players}>
							{curentSession.players.map((player, i) => (
								<div key={i}>
									<Avatar name={player.firstName} avatar={player.photoURL} />
								</div>
							))}
						</div>
						<div>
							Craeted By:{' '}
							<Avatar
								name={curentSession.createdBy.firstName}
								avatar={curentSession.createdBy.photoURL}
							/>
						</div>
					</ModalBody>
					<ModalFooter>
						{/* <Button color="secondary" onClick={() => this.signToSessionHandler(this.props.session)}>
							BOOK
						</Button> */}
						{this.props.btnBook}
						{/* {btnBook} */}
						{/* {!this.props.auth && this.props.session ? null : this.props.auth.uid ===
						this.props.session.createdBy.uid ? (
							<Button color="secondary" onClick={() => this.props.toggleSessiomInfo(this.props.session)}>
								EDIT
							</Button>
						) : null}
						<Button color="secondary" onClick={() => this.handelRemoveSession(this.props.session)}>
							DELETE
						</Button> */}
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	// const sessionList = state.firestoreReducer.data.sessionList;
	// const id = ownProps.match.params.id;
	// why I don't have params like in leacture 20 04:40
	return {
		toggle: state.sessionReducer.sessionInfoToggle,
		session: state.sessionReducer.session,
		auth: state.firebaseReducer.auth,
		user: state.firebaseReducer.profile

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
)(SessionInfo);
