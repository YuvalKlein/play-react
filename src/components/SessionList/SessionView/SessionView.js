import React from 'react';

import classes from './SessionView.css';

const sessionView = (props) => 
      <div  className={classes.SessionView}>
        <div className={classes.Time} >{props.session.time}</div>
        <div className={classes.Content}>
          <div className={classes.Info} >
            <p className={classes.SessionName}>{props.session.sessionName}</p>
            <p>{props.session.location}</p>
          </div>
          <div className={classes.Players}>{props.session.players.map((player,i) => <div key={i}>{player.avatar}</div>)}</div>
        </div>
        <div className={classes.Button}>
          <button >BOOK</button>
        </div>
      </div>

export default sessionView;