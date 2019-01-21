
const initialState = {
    sessionList:[],
    sessionInfoToggle: false,
    session: {},
    inClass: false,
    shareDialogOpen: false,
    signOutDialogOpen: false
};
  
const  sessionReducer =(state = initialState, action)=> {
    switch (action.type) {     
        case "ADD_NEW_SESSION":
            return {...state, toggleDialogShare: !state.toggleDialogShare, sessionList:action.payload};
        case "ADD_NEW_SESSION_ERROR":
            return {...state, err: action.err}       
        case "UPDATE_PLAYERS_IN_SESSION":
            return state;       
        case "REMOVE_PLAYER_FROM_SESSION":
            return {...state, session:action.session};       
        case "DELETE":
            return state;
        case "TOGGLE_INFO":
            return {...state,sessionInfoToggle: !state.sessionInfoToggle,session:action.payload};
        case "SHARE_DIALOG_OPEN":
            return {...state,shareDialogOpen: !state.shareDialogOpen,session:action.payload};
        case "SIGN_OUT_DIALOG_OPEN":
            return {...state,signOutDialogOpen: !state.signOutDialogOpen,session:action.payload};
        case "BOOKED":
            return {...state,inClass: !state.inClass};
        default: return state
    }
};
export default sessionReducer;
