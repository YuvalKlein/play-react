import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from "redux";
import {Redirect} from 'react-router-dom';
import {firestoreConnect} from "react-redux-firebase";

import * as mainActions from "../../../actions/mainAction";
import classes from './SessionView.css';

const sessionView = (props) => {
  let btnBook = false;
  console.log('userName',props.userName)
  props.session.players.map(player => {
    if(props.userName===player.fName){
      btnBook= true
    }else btnBook= false
  });

  const handleShareDialog = (session) => {
    props.toggleDialogShare(session);
  };


  const book = (session) => {
    if(props.isAuth.uid){
      btnBook = !btnBook;
    } else {
      return <Redirect to='/login'/>
    }

  };

  return ( 
      <div  className={classes.SessionView}>
      <div className={classes.Time} >
        <div>{props.session.time}</div>
        <div>{props.session.endTime}</div>
      </div>
      <div className={classes.Info} onClick={()=>props.toggleInfo(props.session)}>
          <p className={classes.Title} >{props.session.title}</p>
        <p>{props.session.location}</p>
      </div>
      <div className={classes.Players} onClick={()=>props.toggleInfo(props.session)}>
            <p>{props.session.minPlayers}\{props.session.maxPlayers}</p>
            <div className={classes.Avatars}>{props.session.players.map((player,i) => <div key={i}><img alt="" className={classes.FaceImg} src={player.photoURL}/></div>)}</div>
      </div>
      <div className={classes.Button}>
        <button onClick={()=>props.booked(props.session)} className={btnBook?classes.Cancel : classes.Book} >{btnBook?"CANCEL":"BOOK"}</button>
      </div> 
    </div>
  );
};
   

      
const mapStateToProps = state => ({
  toggle: state.sessionReducer.sessionInfoToggle,
  shareDialogOpen: state.sessionReducer.shareDialogOpen,
  btnToggle: state.sessionReducer.booked,
  isAuth: state.firebaseReducer.auth,
  userName: state.firebaseReducer.profile.firstName
});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect([
    { collection: 'sessionList'}
  ])
)(sessionView);