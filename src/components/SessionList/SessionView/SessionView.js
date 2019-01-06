import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Redirect} from 'react-router-dom';

import * as mainActions from "../../../actions/mainAction";
import classes from './SessionView.css';

const sessionView = (props) => {
  let btnBook = false;
  const book = (session) => {
    if(props.isAuth){
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
        <button onClick={()=>book(props.session)} className={btnBook?classes.Cancel : classes.Book} >{btnBook?"CANCEL":"BOOK"}</button>
      </div> 
    </div>
  );
};
   

      
const mapStateToProps = state => ({
  toggle: state.sessionReducer.sessionInfoToggle,
  btnToggle: state.sessionReducer.booked,
  isAuth: state.userReducer.token !== null
});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(sessionView);