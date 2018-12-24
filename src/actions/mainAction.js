import axios from 'axios';

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

export const authStart = () => {
    return {
        type: 'AUTH_START'
    };
};

export const authSuccess = (token, refreshToken, userId) => {
    return {
        type: 'AUTH_SUCCESS',
        idToken: token, 
        refreshToken: refreshToken,  
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAfxKPiu1Zf876cexkIUr--iLFtMaJFxnc', authData)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.refreshToken, response.data.localId));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

