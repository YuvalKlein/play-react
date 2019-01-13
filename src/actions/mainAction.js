
export const addNewSession = (session) => {
    return (dispatch, getState, {getFirestore}) => {
      // make async call to database
      const firestore = getFirestore();
      firestore.collection('sessionList').add(session)
        .then(() => {
            dispatch({ type: 'ADD_NEW_SESSION' });
        }).catch(err => {
            dispatch({ type: 'ADD_NEW_SESSION_ERROR' }, err);
        });
    }
};
export const removeSession = (session) => {
  return (dispatch, getState, {getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    firestore.collection('sessionList').doc(session.id).delete()
      .then(() => {
          console.log("Document successfully deleted!");
          dispatch({ type: 'DELETE' });
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }
};
export const signToSession = (session) => {
  return (dispatch, getState, {getFirestore}) => {
    // make async call to database
    const firestore = getFirestore();
    firestore.collection('sessionList').doc(session.id).set(session)
      .then(() => {
          console.log("Document successfully deleted!");
          dispatch({ type: 'UPDATE_PLAYERS_IN_SESSION' });
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }
};
export const toggleSessiomInfo = (session) => dispatch => {
    dispatch({
        type: 'TOGGLE_INFO',
        payload:session
    })
};
export const toggleDialogShare = (session) => dispatch => {
    dispatch({
        type: 'DIALOG_OPEN',
        payload:session
    })
};
export const booked = (session) => dispatch => {
  // console.log("session" ,session);
  // toggleDialogShare(session);
  dispatch({
    type: 'BOOKED'
  })
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
            photoURL: newUser.photoURL
        })
    }).then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  
    }
  }

  export const logout = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGN_OUT'})
        })
    };
};


