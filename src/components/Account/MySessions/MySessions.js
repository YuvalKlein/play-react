import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

import * as mainActions from "../../../actions/mainAction";
import SessionView from '../../SessionList/SessionView/SessionView';
import Spinner from '../../UI/Spinner/Spinner';


const mySessions = (props) => {
    // let AllList =props.sessionList
    // console.log('props', props);
    // console.log('sessionList', props.sessionList);
    // if(AllList){
    //     console.log('AllList', AllList);
    //     const sessions = AllList.map(session => {
    //         console.log('sessions', sessions);
    //         console.log('session', session);
    //         session.players.filter(player => {
    //             console.log('player', player);
    //             if (player.fName === props.user.firstName) { 
    //                 return (
    //                     <SessionView key={session.id} session={session} />
    //                 )
    //             } else {
    //                 return <p>No Classes</p>
    //             }
    //         })
    //     });
        
    //     return(
    //         {sessions}
    //     );
    // } else {
        return  <Spinner/> 
    };
// };

const mapStateToProps = state => ({
    auth: state.firebaseReducer.auth,
    user: state.firebaseReducer.profile,
    sessionList: state.firestoreReducer.ordered.sessionList,
  });
  
  function mapDispatchToProps(dispatch) {
    return {...bindActionCreators(mainActions, dispatch)}
  };
  
  export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
      { collection: 'sessionList'}
    ])
  )(mySessions);