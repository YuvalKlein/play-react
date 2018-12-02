import React from 'react';
import {NavLink} from 'react-router-dom';
import{Button}from 'reactstrap';
// import './Toolbar.css'

const toolbar = (props) => 
      <div className="Toolbar">
        <NavLink to="/">  <Button color="info">Home</Button> </NavLink>
        <NavLink to="/test"><Button color="info">Test</Button></NavLink> 
      </div>


export default toolbar;