import React, { Component } from 'react';
// import './SessionList.css';

import SessionView from './SessionView/SessionView';
let mockData = require('./mockData')

class SessionList extends Component {

  render() {
    console.log(mockData.sessionList)
    const sessions = mockData.sessionList.map((session, index) => {
      return (
        <SessionView key={index} session={session}/>
      );
    });

    return (
      <div >
          <h1>SessionList</h1>
        {sessions}
      </div>
    );
  }
}

export default SessionList;