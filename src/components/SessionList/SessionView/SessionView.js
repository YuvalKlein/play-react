import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from "redux";
import {NavLink} from 'react-router-dom';
import {firestoreConnect} from "react-redux-firebase";

import * as mainActions from "../../../actions/mainAction";
import classes from './SessionView.css';
import BookButton from '../../UI/Button/bookButton';

const sessionView = (props) => {
  let btnBook = false;

  const bookHandler = (props) => {
    // authChecker();
    // handleShareDialog();
    
  };
  const signToSessionHandler=()=>{
    let newPlayers= props.session.players;
    console.log('players',props.session.players)
    let countPlaers =newPlayers.length;
    console.log(countPlaers)
    newPlayers.push({
      countPlaers:{
        firstName: props.userName.firstName,
        lastName: props.userName.lastName,
        photoURL: props.userName.photoURL,
        uid: props.auth.uid
      }}
      );
      console.log('newPlayers',newPlayers)
    let updateSession = props.session;
    updateSession.players=newPlayers
    props.signToSession(updateSession)
  };

  let players = props.session.players;

  players.map(player => {
    if(props.auth.uid === player.uid){
  
      btnBook= <BookButton clicked={bookHandler} classN={classes.Cancel} title="CANCEL"/>
    }else btnBook=<BookButton clicked={signToSessionHandler} classN={classes.Book} title="BOOK"/>
    });
    if(!props.auth.uid){
      btnBook=<NavLink to='/login' ><BookButton classN={classes.Book} title="BOOK"/></NavLink>
    }

  const handleShareDialog = (session) => {
    props.toggleDialogShare(session);
  };

  // const book = (session) => {
  //   if(props.isAuth.uid){
  //     btnBook = !btnBook;
  //   } else {
  //     return <Redirect to='/login'/>
  //   }

  // };



  return ( 
      <div  className={classes.SessionView}>
      <div className={classes.Time} >
        <div>{props.session.time}</div>
        <div>{props.session.endTime}</div>
      </div>
      <div className={classes.Info} onClick={()=>props.toggleSessiomInfo(props.session)}>
          <p className={classes.Title} >{props.session.title}</p>
        <p>{props.session.location}</p>
      </div>
      <div className={classes.Players} onClick={()=>props.toggleSessiomInfo(props.session)}>
            <p>{props.session.minPlayers}\{props.session.maxPlayers}</p>
            <div className={classes.Avatars}>{players.map((player,i) => <div key={i}><img alt="" className={classes.FaceImg} src={player.photoURL}/></div>)}</div>
      </div>
      <div className={classes.Button}>
        {/* <button onClick={()=>props.booked(props.session)} className={btnBook?classes.Cancel : classes.Book} >{btnBook?"CANCEL":"BOOK"}</button> */}
        {/* <BookButton clicked={() => bookHandler()} /> */}
        {btnBook}
      </div> 
    </div>
  );
};
   

      
const mapStateToProps = state => ({
  toggle: state.sessionReducer.sessionInfoToggle,
  shareDialogOpen: state.sessionReducer.shareDialogOpen,
  btnToggle: state.sessionReducer.booked,
  auth: state.firebaseReducer.auth,
  userName: state.firebaseReducer.profile
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