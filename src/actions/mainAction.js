export const addNewSession = (component) => dispatch => {
    dispatch({
        type: 'ADD_NEW_SESSION',
        payload: component
    })
};
export const createSessionList = (sessionList) => dispatch => {
    dispatch({
        type: 'CREATE_LIST',
        payload: sessionList
    })
};
export const toggleInfo = (session) => dispatch => {
    dispatch({
        type: 'TOGGLE_INFO',
        payload:session
    })
};


