import React from 'react';

import classes from './SessionView.css';

const sessionView = (props) => 
      <div  className={classes.SessionView}>
        <div className={classes.Time} >
          <div>{props.session.time}</div>
          <div>{props.session.endTime}</div>
        </div>
        <div className={classes.Info}>
            <p className={classes.Title}>{props.session.title}</p>
            <p>{props.session.location}</p>
          {/* <div className={classes.Players}>{props.session.players.map((player,i) => <div key={i}>{player.avatar}</div>)}</div> */}
        </div>
        <div className={classes.Button}>
          <button >BOOK</button>
        </div>
      </div>

export default sessionView;