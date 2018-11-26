import React, { Component } from 'react';
import './App.css';
import Toolbar from '../components/Toolbar/Toolbar';
import SessionList from '../components/SessionList/SessionList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar/> 
        <SessionList/>
      </div>
    );
  }
}

export default App;
