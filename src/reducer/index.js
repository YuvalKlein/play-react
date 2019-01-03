import {createStore,applyMiddleware,combineReducers,} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reduxFirestore, getFirestore, firestoreReducer} from 'redux-firestore';
import {firebaseReducer, reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import fbConfig from '../config/fbConfig';

import sessionReducer from './sessionReducer';
import userReducer from './userReducer';
const store =createStore(combineReducers({
    sessionReducer, 
    userReducer, 
    firestoreReducer,
    firebaseReducer
    }), 
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile: 'users'})
    )
);
export default store;
