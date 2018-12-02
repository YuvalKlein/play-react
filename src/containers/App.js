import React, { Component } from 'react';
import './App.css';
import SessionList from '../components/SessionList/SessionList';
import {Switch,Route} from 'react-router-dom'
import Layout from '../hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout> 
          <Switch>
          <Route path="/" exact component={SessionList}/>
          <Route path="/test" exact component={()=> <div>Hello test</div>}/>

          </Switch>
          {/* <AddButton/> */}
        </Layout> 
      </div>
    );
  }
}

export default App;
