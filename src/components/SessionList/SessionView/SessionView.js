import React from 'react';
import {NavLink} from "react-router-dom";

import classes from './SessionView.css';

const sessionView = (props) => 
      <div  className={classes.SessionView}>
        <div className={classes.Time} >
          <div>{props.session.time}</div>
          <div>{props.session.endTime}</div>
        </div>
        <div className={classes.Info}>
          <NavLink to="/classinfo">
            <p className={classes.Title}>{props.session.title}</p>
          </NavLink>
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

export default sessionView;