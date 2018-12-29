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
export const booked = () => dispatch => {
    dispatch({
        type: 'BOOKED'
    })
};
export const authStart = () => {
    return {
        type: 'AUTH_START'
    };
};

export const authSuccess = (email,password,token, refreshToken, userId) => {
    return {
        type: 'AUTH_SUCCESS',
        idToken: token, 
        refreshToken: refreshToken,  
        userId: userId,
        email,
        password
    };
};

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        error: error
    };
};

export const auth = (user, alreadyUser) => {
    return dispatch => {
        dispatch(authStart());
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAfxKPiu1Zf876cexkIUr--iLFtMaJFxnc';
        if(alreadyUser) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAfxKPiu1Zf876cexkIUr--iLFtMaJFxnc';
        };
        axios.post(url, user)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(user.email,user.password,response.data.idToken, response.data.refreshToken, response.data.localId));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const logout = () => {
    return {
        type: 'AUTH_LOGOUT',
        token: null,
        refreshToken: null,
        usetId: null 
    };
};


