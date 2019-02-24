import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as mainActions from '../../../actions/mainAction';
import classes from './SessionView.css';
import SessionInfo from '../SessionInfo/SessionInfo';
import EditSession from '../EditSession/EditSession';

class sessionView extends React.Component {
	state = {
		toggleInfo: false,
		toggleEdit: false
	};
	toggle = (name) => {
		console.log('name', name);
		this.setState({ [name]: !this.state[name] });
		if (this.state.toggleInfo) {
			this.setState({ toggleInfo: false });
		}
	};

	editSessionHandle = (editedSession) => {
		this.props.editSession(editedSession);
	};

	render() {
		return (
			<div className={classes.SessionView}>
				<div className={classes.Time}>
					<div>{this.props.session.time}</div>
					<div>{this.props.session.endTime}</div>
				</div>
				<div className={classes.Info} onClick={() => this.toggle('toggleInfo')}>
					<p className={classes.Title}>{this.props.session.title}</p>
					<p>{this.props.session.location}</p>
				</div>
				<div className={classes.Players} onClick={() => this.toggle('toggleInfo')}>
					<p>
						{this.props.session.players.length}\{this.props.session.maxPlayers}
					</p>
					<div className={classes.Avatars}>
						{this.props.session.players.map((player, i) => (
							<div key={i}>
								<img alt="" className={classes.FaceImg} src={player.photoURL} />
							</div>
						))}
					</div>
				</div>
				<div className={classes.Button}>{this.props.btnBook}</div>
				<SessionInfo
					session={this.props.session}
					btnBook={this.props.btnBook}
					toggle={this.toggle}
					openInfo={this.state.toggleInfo}
					userID={this.props.auth.uid}
					toggleDialogShare={this.props.toggleDialogShare}
				/>
				<EditSession
					toggle={this.toggle}
					editOpen={this.state.toggleEdit}
					session={this.props.session}
					editSessionHandle={this.editSessionHandle}
					toggleDialogShare={this.props.toggleDialogShare}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	btnToggle: state.sessionReducer.booked,
	auth: state.firebaseReducer.auth,
	user: state.firebaseReducer.profile,
	toggleEdit: state.sessionReducer.toggleEdit
});

function mapDispatchToProps(dispatch) {
	return { ...bindActionCreators(mainActions, dispatch) };
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([ { collection: process.env.NODE_ENV === 'development' ? 'sLD' : 'sessionList' } ])
)(sessionView);
