
export const addNewSession = (session) => {
    return (dispatch, getState, {getFirestore}) => {
      // make async call to database
      const firestore = getFirestore();
      let newSession = {
        date: session.date,
        time: session.time,
        endTime: session.endTime,
        title: session.title,
        details: session.details,
        location: session.location,
        players:JSON.stringify([{
          fName: session.players.firstName,
          uid:session.players.uid,
          lName: 'Tomi',
          photoURL: 'https://randomuser.me/api/portraits/men/8.jpg'
        }]),
        created: "Thu Jan 10 2019 09:42:19 GMT+0200",
        createdBy: JSON.stringify({
          fName: 'Mike',
          uid:session.players.uid,
          lName: 'Tomi',
          photoURL: 'https://randomuser.me/api/portraits/men/8.jpg'
        }),
        minPlayers: 1, //TODO    minPlayers: session.minPlayers,
        maxPlayers: 2  //TODO    maxPlayers: session.maxPlayers
      };
      console.log('newSession',newSession);
      firestore.collection('sessionList').add(newSession)
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
export const toggleInfo = (session) => dispatch => {
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
  toggleDialogShare(session);
  console.log('session',session)
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


