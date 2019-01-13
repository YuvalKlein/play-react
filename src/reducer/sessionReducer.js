
const initialState = {
    sessionList:[],
    sessionInfoToggle: false,
    session: {},
    inClass: false,
    shareDialogOpen: false
};
  
const  sessionReducer =(state = initialState, action)=> {
    switch (action.type) {     
        case "ADD_NEW_SESSION":
            return {...state,sessionList:action.payload};
        case "ADD_NEW_SESSION_ERROR":
            return {...state, err: action.err}       
        case "UPDATE_PLAYERS_IN_SESSION":
            return state       
        case "DELETE":
            return state;
        case "TOGGLE_INFO":
            return {...state,sessionInfoToggle: !state.sessionInfoToggle,session:action.payload};
        case "DIALOG_OPEN":
            console.log('shareDialogOpen',state.shareDialogOpen);
            return {...state,shareDialogOpen: !state.shareDialogOpen,session:action.payload};
        case "BOOKED":
            return {...state,inClass: !state.inClass};
        default: return state
    }
};
export default sessionReducer;
