import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component  {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });   
    }

    render () {
        return(
            <>
                <Toolbar 
                    isAuth={this.props.isAuth}
                    name={this.props.name}
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer 
                    isAuth={this.props.isAuth}
                    name={this.props.name}
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </>
        )
    }
};

const mapStateTProps = state => {
    return {
        isAuth: state.userReducer.token !== null,
        name: state.userReducer.firstName
    };
};

export default connect(mapStateTProps)(Layout);