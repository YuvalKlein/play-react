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
        <div className={classes.Info} onClick={()=>{console.log(props)}}>
          {/* <NavLink to="/classinfo"> */}
            <a className={classes.Title} onClick={()=>props.toggleInfo(props.session)}>{props.session.title}</a>
          {/* </NavLink> */}
          <p>{props.session.location}</p>
        </div>
        <div className={classes.Players}>
              {/* <div className={classes.Players}>{props.session.players.map((player,i) => <div key={i}>{player.avatar}</div>)}</div> */}
              <p>{props.session.minPlayers}\{props.session.maxPlayers}</p>
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