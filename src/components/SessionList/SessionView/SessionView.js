import React from 'react';

// import './Session.css';

const sessionView = (props) => 
      < >
        <div >{props.session.date}</div>
        <div >
          <p>Session name: {props.session.sessionName}</p>
          <p>Instructor: {props.session.instructor}</p>
          <p>Location: {props.session.location}</p>
          <div>Players: {props.session.players.map((player,i) => <p key={i}>{player.fName + " " + player.lName}</p>)}</div>
        </div>
        <div>
          <button>BOOK</button>
        </div>
      </>

export default sessionView;