
const initialState = {
    sessionList:[],
    sessionInfoToggle: false,
    session: {},
    booked: false
};
  
const  sessionReducer =(state = initialState, action)=> {
    switch (action.type) {
        case"CREATE_LIST":
            return {...state,sessionList:action.payload}       
        case"CREATE_FB_LIST":
            return {...state,sessionList:action.payload}       
        case "ADD_NEW_SESSION":
            let newSesionList = state.sessionList;
            console.log('ADD_NEW_SESSION',action.payload)
            newSesionList.push(action.payload)
            return {...state,sessionList: newSesionList};
        case "XADD_NEW_SESSION":
            console.log('ADD_NEW_SESSION',action.session)
            return state;
        case "CREATE_SESSION_ERROR":
            console.log('CREATE_SESSION_ERROR', action.err);
            return state;
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
