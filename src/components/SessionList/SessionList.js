import React, { Component } from 'react';
// import './SessionList.css';

import Session from './Session/Session';

class SessionList extends Component {
  render() {
    return (
      <div >
          <h1>SessionList</h1>
        <Session/>
      </div>
    );
  }
}

export default SessionList;