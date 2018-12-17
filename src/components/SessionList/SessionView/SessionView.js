import React from 'react';

import classes from './SessionView.css';

const sessionView = (props) => 
      <div  className={classes.SessionView}>
        <div className={classes.Time} >{props.session.date}</div>
        <div className={classes.Content}>
          <div className={classes.Info} >
            <p className={classes.SessionName}>{props.session.sessionName}</p>
            <p className={classes.Instructor}>{props.session.instructor}</p>
            <p>{props.session.location}</p>
          </div>
          <div >
            <p className={classes.Players}>Players: {props.session.players.map((player,i) => <p key={i}>{player.fName + " " + player.lName}</p>)}</p>
          </div>
        </div>
        <div className={classes.Button}>
          <button >BOOK</button>
        </div>
      </div>

export default sessionView;