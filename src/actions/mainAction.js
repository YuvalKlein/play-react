import axios from 'axios';
import axiosSessions from '../axios-sessions';


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
export const createFBSessionList = (sessionList) => {
    return (dispatch, getState, {getFirestore}) => {
      // make async call to database
      const firestore = getFirestore();
      firestore.collection('sessionList').add({
        ...sessionList,
        authorFirstName: 'Net',
        authorLastName: 'Ninja',
        authorId: 12345,
        createdAt: new Date()
      }).then(() => {
        dispatch({ type: 'CREATE_FB_LIST' });
      }).catch(err => {
        dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
      });
    }
  };
export const addNewSessionToFB = (session) => {
    return (dispatch, getState, {getFirestore}) => {
      // make async call to database
      const firestore = getFirestore();
      console.log('session', session.players);
      firestore.collection('sessionList').add({
        date: session.date,
        time: session.time,
        endTime: session.endTime,
        title: session.title,
        details: session.details,
        location: session.location,
        players: [{
          fName: 'Mike',
          lName: 'Tomi',
          photoURL: 'https://randomuser.me/api/portraits/men/8.jpg'
        }],
        created: new Date(),
        createdBy: {
          fName: 'Mike',
          lName: 'Tomi',
          photoURL: 'https://randomuser.me/api/portraits/men/8.jpg'
    },
        minPlayers: session.minPlayers,
        maxPlayers: session.maxPlayers
      })
        .then(() => {
            dispatch({ type: 'CREATE_FB_LIST' });
        }).catch(err => {
            dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
        });
    }
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

export const authSuccess = (user, authDetails) => {
    axiosSessions.post('/users.json', user)
    return {
        type: 'AUTH_SUCCESS',
        idToken: authDetails.idToken, 
        refreshToken: authDetails.refreshToken,  
        userId: authDetails.localId,
        email: user.email,
        password: user.password,
        user: user
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
                user.userId = response.data.localId
                dispatch(authSuccess(user, response.data));
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
        userId: null 
    };
};

export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      
      firebase.auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      ).then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  
    }
  }

  export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
      
      firebase.auth().createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
      ).then((resp) => {
        return firestore.collection('users').doc(resp.user.uid).set({
            type: 'player',
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone,
            birthDay: newUser.birthDay,
        })
    }).then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  
    }
  }

  export const logoutFB = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGN_OUT'})
        })
    };
};


