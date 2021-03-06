import React, { Component } from 'react';
import './App.css';
import SessionList from '../components/SessionList/SessionList';
import {Switch,Route} from 'react-router-dom'
import Layout from '../hoc/Layout/Layout';
import ContactUs from '../components/ContactUs/ContactUs';
import LogIn from '../components/LogIn/LogIn';
import Register from '../components/Register/Register';
import ClassInfo from '../components/SessionList/SessionInfo/SessionInfo';
import fullClassInfo from '../components/SessionList/SessionInfo/fullSessionInfo';
import Account from '../components/Account/Account';
import Logout from '../components/LogIn/Logout';
import "react-datepicker/src/stylesheets/datepicker.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout> 
          <Switch>
            <Route path="/login" exact component={LogIn}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/logout" exact component={Logout}/>
            <Route path="/account" exact component={Account}/>
            <Route path="/" exact component={SessionList}/>
            {/* <Route path="/myclasses" exact component={MyClasses}/> */}
            <Route path="/contact" exact component={ContactUs}/>
            <Route path="/classinfo" exact component={ClassInfo}/>
            <Route path="/:id" exact component={fullClassInfo}/>
          </Switch>
          {/* <AddButton/> */}
        </Layout> 
      </div>
    );
  }
}

export default App;
