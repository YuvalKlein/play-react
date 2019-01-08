
const initialState = {
    sessionList:[],
    sessionInfoToggle: false,
    session: {},
    booked: false
};
  
const  sessionReducer =(state = initialState, action)=> {
    switch (action.type) {     
        case "ADD_NEW_SESSION":
            return {...state,sessionList:action.payload};
        case "ADD_NEW_SESSION_ERROR":
            return {...state, err: action.err}       
        case "DELETE":
            return state;
        case "TOGGLE_INFO":
            return {...state,sessionInfoToggle: !state.sessionInfoToggle,session:action.payload};
        case "BOOKED":
            return {...state,booked: !state.booked};
        default: return state
    }
};
export default sessionReducer;
