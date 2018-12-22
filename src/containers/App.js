import React, { Component } from 'react';
import './App.css';
import SessionList from '../components/SessionList/SessionList';
import {Switch,Route} from 'react-router-dom'
import Layout from '../hoc/Layout/Layout';
import ContactUs from '../components/ContactUs/ContactUs';
import LogIn from '../components/LogIn/LogIn';
import MyClasses from '../components/Account/MySessions/MySessions';
import ClassInfo from '../components/SessionList/SessionInfo/SessionInfo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout> 
          <Switch>
            <Route path="/login" exact component={LogIn}/>
            <Route path="/" exact component={SessionList}/>
            <Route path="/myclasses" exact component={MyClasses}/>
            <Route path="/contact" exact component={ContactUs}/>
            <Route path="/classinfo" exact component={ClassInfo}/>
          </Switch>
          {/* <AddButton/> */}
        </Layout> 
      </div>
    );
  }
}

export default App;
