
const initialState = {
    sessionList:[]
};
  
const  sessionReducer =(state = initialState, action)=> {
    switch (action.type) {
        case"CREATE_LIST":
            return {...state,sessionList:action.payload}       
        case "ADD_NEW_SESSION":
            let newSesionList = state.sessionList;
            newSesionList.push(action.payload)
            return {...state,sessionList: newSesionList};
        case "DELETE":
            return state;
        default: return state
    }
};
export default sessionReducer;
