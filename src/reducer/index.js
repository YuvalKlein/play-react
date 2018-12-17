import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import sessionReducer from './sessionReducer';
import userReducer from './userReducer';
const store =createStore(combineReducers({sessionReducer,userReducer}), composeWithDevTools(applyMiddleware(thunk)));
export default store;
