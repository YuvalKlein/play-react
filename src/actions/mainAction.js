const sessionList = process.env.NODE_ENV === 'development' ? 'sLD' : 'sessionList';
const users = process.env.NODE_ENV === 'development' ? 'uD' : 'users';

export const addNewSession = (session) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		console.log('addNewSession', session);
		const firestore = getFirestore();
		firestore
			.collection(sessionList)
			.add(session)
			.then((res) => {
				console.log('RESS', res);
				dispatch({ type: 'ADD_NEW_SESSION', payload: { id: res.id, sessionTitle: session.title } });
			})
			.catch((err) => {
				dispatch({ type: 'ADD_NEW_SESSION_ERROR' }, err);
			});
	};
};
export const removeSession = (session) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		firestore
			.collection(sessionList)
			.doc(session.id)
			.delete()
			.then(() => {
				console.log('Document successfully deleted!');
				dispatch({ type: 'DELETE' });
			})
			.catch(function(error) {
				console.error('Error removing document: ', error);
			});
	};
};
export const signToSession = (session, players) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		firestore
			.collection(sessionList)
			.doc(session.id)
			.set({ ...session, players: players })
			.then(() => {
				console.log('Player successfully sign to class!');
				dispatch({ type: 'UPDATE_PLAYERS_IN_SESSION' });
			})
			.catch(function(error) {
				console.error('Error signning to class: ', error);
			});
	};
};
export const removeFromSession = (session, players) => {
	return async (dispatch, getState, { getFirestore }) => {
		// make async call to database
		try {
			const firestore = getFirestore();
			await firestore.collection(sessionList).doc(session.id).update({ players: players });
			console.log('Player successfully removed from class!');
			dispatch({ type: 'REMOVE_PLAYER_FROM_SESSION', session: session });
		} catch (err) {
			console.error('Error removing from class: ', err);
		}
	};
};

export const editSession = (session) => {
	return async (dispatch, getState, { getFirestore }) => {
		// make async call to database
		try {
			const firestore = getFirestore();
			await firestore.collection(sessionList).doc(session.id).update(session);
			console.log('Session successfully edited!');
			dispatch({ type: 'EDIT_SESSION', session: session });
		} catch (err) {
			console.error('Error edit session: ', err);
		}
	};
};

export const toggleDialogShare = (session) => (dispatch) => {
	dispatch({
		type: 'SHARE_DIALOG_OPEN',
		payload: session
	});
};
export const toggleEditSession = (session) => (dispatch) => {
	dispatch({
		type: 'TOGGLE_EDIT',
		payload: session
	});
};
export const toggleSignOutDialog = (session) => {
	return (dispatch) => {
		dispatch({
			type: 'SIGN_OUT_DIALOG_OPEN',
			payload: session
		});
	};
};
export const booked = (session) => (dispatch) => {
	// console.log("session" ,session);
	// toggleDialogShare(session);
	dispatch({
		type: 'BOOKED'
	});
};

export const signIn = (credentials) => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();

		firebase
			.auth()
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({ type: 'LOGIN_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'LOGIN_ERROR', err });
			});
	};
};

export const signUp = (newUser) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		console.log('newUser', newUser);

		firebase
			.auth()
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then((resp) => {
				console.log('resp', resp.user);
				return firestore.collection(users).doc(resp.user.uid).set({
					type: 'player',
					firstName: newUser.firstName,
					lastName: newUser.lastName,
					phone: newUser.phone,
					birthDay: newUser.birthDay,
					photoURL: newUser.photoURL,
					gender: newUser.gender
				});
			})
			.then(() => {
				dispatch({ type: 'SIGNUP_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'SIGNUP_ERROR', err });
			});
	};
};

export const logout = () => {
	return (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGN_OUT' });
		});
	};
};

export const addNewTicket = (ticket) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		console.log('addNewTicket', ticket);
		const firestore = getFirestore();
		firestore
			.collection('tickets')
			.add(ticket)
			.then((res) => {
				console.log('RESS', res);
				dispatch({ type: 'ADD_NEW_TICKET', ticket });
			})
			.catch((err) => {
				dispatch({ type: 'ADD_NEW_TICKET_ERROR' }, err);
			});
	};
};
