import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as mainActions from '../../../actions/mainAction';
import classes from './SessionView.css';
import SessionInfo from '../SessionInfo/SessionInfo';

class sessionView extends React.Component {
	state = {
		toggleInfo: false
	};
	toggle = () => {
		this.setState({ toggleInfo: !this.state.toggleInfo });
	};
	render() {
		return (
			<div className={classes.SessionView}>
				<div className={classes.Time}>
					<div>{this.props.session.time}</div>
					<div>{this.props.session.endTime}</div>
				</div>
				<div className={classes.Info} onClick={this.toggle}>
					<p className={classes.Title}>{this.props.session.title}</p>
					<p>{this.props.session.location}</p>
				</div>
				<div className={classes.Players} onClick={this.toggle}>
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
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
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
