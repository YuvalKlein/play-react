import React from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { NavLink } from 'react-router-dom';

import * as mainActions from '../../../actions/mainAction';
import classes from './SessionView.css';
import BookButton from '../../UI/Button/bookButton';
import SessionInfo from "../SessionInfo/SessionInfo";

class sessionView extends React.Component {
	state={
		toggleInfo:false
	};
	toggle=()=>{
		this.setState({toggleInfo:!this.state.toggleInfo})
	};
	render(){
    let btnBook = false;

    // let players = this.props.session.players;

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
    // 		btnBook = <BookButton clicked={signToSessionHandler} classN={classes.Book} title="BOOK" />;
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
    // console.log('SESSIONV', this.props.session);
    console.log('toggleInfo',this.state.toggleInfo);
    return (
      <div className={classes.SessionView}>
        <div className={classes.Time}>
          {/* <div>{this.props.session.time.seconds}</div>
				<div>{this.props.session.endTime.seconds}</div> */}
        </div>
        <div className={classes.Info} onClick={ this.toggle}>
          <p className={classes.Title}>{this.props.session.title}</p>
          <p>{this.props.session.location}</p>
        </div>
        <div className={classes.Players} onClick={() => this.props.toggleSessiomInfo(this.props.session)}>
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
				<SessionInfo session={this.props.session} btnBook={this.props.btnBook} toggle={this.toggle} openInfo={this.state.toggleInfo}/>
      </div>
    );
	}
	
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
