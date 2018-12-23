import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import * as mainActions from "../../../actions/mainAction";
import classes from './SessionView.css';

const sessionView = (props) => 
      <div  className={classes.SessionView}>
        <div className={classes.Time} >
          <div>{props.session.time}</div>
          <div>{props.session.endTime}</div>
        </div>
        <div className={classes.Info} onClick={()=>props.toggleInfo(props.session)}>
          {/* <NavLink to="/classinfo"> */}
            <p className={classes.Title} >{props.session.title}</p>
          {/* </NavLink> */}
          <p>{props.session.location}</p>
        </div>
        <div className={classes.Players} onClick={()=>props.toggleInfo(props.session)}>
              <p>{props.session.minPlayers}\{props.session.maxPlayers}</p>
              <div className={classes.Avatars}>{props.session.players.map((player,i) => <div key={i}><img className={classes.FaceImg} src={player.avatar}/></div>)}</div>
        </div>
        <div className={classes.Button}>
          <button >BOOK</button>
        </div>
      </div>

      
const mapStateToProps = state => ({
  toggle: state.sessionReducer.sessionInfoToggle,
});

function mapDispatchToProps(dispatch) {
  return {...bindActionCreators(mainActions, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(sessionView);