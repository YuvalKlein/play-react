
export const addNewSession = (session) => {
    return (dispatch, getState, {getFirestore}) => {
      // make async call to database
      const firestore = getFirestore();
      firestore.collection('sessionList').add({
        date: session.date,
        time: session.time,
        endTime: session.endTime,
        title: session.title,
        details: session.details,
        location: session.location,
        players:[{
            fName: session.players.firstName,
            uid:session.players.uid,
            lName: 'Tomi',
            photoURL: 'https://randomuser.me/api/portraits/men/8.jpg'
      }],
        created: new Date(),
        createdBy: {
          fName: 'Mike',
          uid:session.players.uid,
          lName: 'Tomi',
          photoURL: 'https://randomuser.me/api/portraits/men/8.jpg'
    },
        minPlayers: session.minPlayers,
        maxPlayers: session.maxPlayers
      })
        .then(() => {
            dispatch({ type: 'ADD_NEW_SESSION' });
        }).catch(err => {
            dispatch({ type: 'ADD_NEW_SESSION_ERROR' }, err);
        });
    }
  };
export const toggleInfo = (session) => dispatch => {
    dispatch({
        type: 'TOGGLE_INFO',
        payload:session
    })
};
export const booked = (session) => dispatch => {
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


